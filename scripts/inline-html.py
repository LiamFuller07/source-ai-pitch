#!/usr/bin/env python3
"""
Inline all external assets (JS, CSS, fonts, images) into a single self-contained HTML file.
"""

import re
import base64
import mimetypes
from pathlib import Path
from typing import Optional

OUT_DIR = Path(__file__).parent.parent / "out"
INDEX = OUT_DIR / "index.html"
OUTPUT = Path(__file__).parent.parent / "Source-AI-Pitch-Deck.html"


def read_text(path):
    return path.read_text(encoding="utf-8")


def read_b64(path):
    return base64.b64encode(path.read_bytes()).decode("ascii")


def resolve_asset(src):
    # type: (str) -> Optional[Path]
    """Resolve a URL reference to a local file path."""
    if src.startswith("http://") or src.startswith("https://") or src.startswith("data:"):
        return None
    clean = src.lstrip("/")
    candidate = OUT_DIR / clean
    if candidate.exists() and candidate.is_file():
        return candidate
    return None


def mime_for(path):
    suffixes = {
        ".woff2": "font/woff2",
        ".woff": "font/woff",
        ".ttf": "font/ttf",
        ".svg": "image/svg+xml",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".ico": "image/x-icon",
        ".webp": "image/webp",
    }
    return suffixes.get(path.suffix.lower(), mimetypes.guess_type(str(path))[0] or "application/octet-stream")


def inline_url_ref(url):
    """Given a URL string, return data URI if local asset exists, else return original."""
    url = url.strip("'\"")
    if url.startswith("data:"):
        return url
    asset = resolve_asset(url)
    if asset and asset.exists():
        mime = mime_for(asset)
        b64 = read_b64(asset)
        return "data:%s;base64,%s" % (mime, b64)
    return url


def main():
    html = read_text(INDEX)

    # 1. Inline <link rel="stylesheet"> tags
    def inline_stylesheet(m):
        href_match = re.search(r'href="([^"]+)"', m.group(0))
        if not href_match:
            return m.group(0)
        href = href_match.group(1)
        asset = resolve_asset(href)
        if asset:
            css = read_text(asset)
            return "<style>%s</style>" % css
        return m.group(0)

    html = re.sub(r'<link[^>]+rel="stylesheet"[^>]*/?>',  inline_stylesheet, html)
    html = re.sub(r'<link[^>]+href="[^"]+\.css"[^>]*/?>',  inline_stylesheet, html)

    # 2. Inline <script src="..."> tags
    def inline_script(m):
        full_tag = m.group(0)
        src_match = re.search(r'src="([^"]+)"', full_tag)
        if not src_match:
            return full_tag
        src = src_match.group(1)
        asset = resolve_asset(src)
        if asset:
            js = read_text(asset)
            attrs = re.sub(r'\s*src="[^"]*"', '', full_tag)
            attrs = attrs.replace("<script", "").replace("</script>", "").rstrip(">").strip()
            if attrs:
                return "<script %s>%s</script>" % (attrs, js)
            return "<script>%s</script>" % js
        return full_tag

    html = re.sub(r'<script[^>]+src="[^"]+"[^>]*></script>', inline_script, html)

    # 3. Inline <img src="..."> (for local images)
    def inline_img(m):
        full_tag = m.group(0)
        src_match = re.search(r'src="([^"]+)"', full_tag)
        if not src_match:
            return full_tag
        src = src_match.group(1)
        new_src = inline_url_ref(src)
        if new_src != src:
            return full_tag.replace('src="%s"' % src, 'src="%s"' % new_src)
        return full_tag

    html = re.sub(r'<img[^>]+>', inline_img, html)

    # 4. Inline ALL url(...) references (fonts, images in CSS)
    def inline_css_url(m):
        url = m.group(1).strip("'\"")
        new_url = inline_url_ref(url)
        return "url(%s)" % new_url

    html = re.sub(r'url\(([^)]+)\)', inline_css_url, html)

    # 5. Inline remaining /_next/ JS chunk references in string literals
    # These appear as "/_next/static/chunks/xxx.js" in inline JS
    def inline_chunk_ref(m):
        url = m.group(1)
        asset = resolve_asset(url)
        if asset:
            # For dynamic chunk loading, we can't easily inline the JS content
            # into a data URI that the loader understands. Instead, we'll create
            # a blob URL approach. But simpler: the page is SSR'd so the HTML
            # already has the rendered content. These chunks add interactivity.
            # Let's just leave them - the static HTML will still show correctly.
            pass
        return m.group(0)

    # Actually, let's take a different approach for remaining chunk refs:
    # Build a map and inject them as inline scripts at the end
    remaining_chunks = set(re.findall(r'"(/_next/static/chunks/[^"]+\.js)"', html))
    chunk_scripts = []
    for chunk_url in remaining_chunks:
        asset = resolve_asset(chunk_url)
        if asset:
            js = read_text(asset)
            chunk_scripts.append("<script>%s</script>" % js)

    if chunk_scripts:
        # Inject before </body>
        html = html.replace("</body>", "%s</body>" % "\n".join(chunk_scripts))

    # 6. Final pass: replace ALL remaining /_next/ file paths with data URIs
    # This catches references inside JS string literals, etc.
    def inline_any_next_ref(m):
        url = m.group(0)
        asset = resolve_asset(url)
        if asset:
            mime = mime_for(asset)
            b64 = read_b64(asset)
            return "data:%s;base64,%s" % (mime, b64)
        return url

    html = re.sub(r'/_next/static/[^\s"\'\\]+\.(woff2?|ttf|css|js|png|jpg|svg|gif|webp)', inline_any_next_ref, html)

    # Write output
    OUTPUT.write_text(html, encoding="utf-8")
    size_kb = OUTPUT.stat().st_size / 1024
    print("Created %s (%.0f KB)" % (OUTPUT.name, size_kb))

    # Count remaining external refs
    remaining = len(re.findall(r'/_next/', html))
    if remaining:
        print("Note: %d remaining /_next/ references (dynamic chunk loaders)" % remaining)
    else:
        print("All assets fully inlined!")


if __name__ == "__main__":
    main()
