import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Source AI — The Migration Engine for Consultants",
  description:
    "From transcript to live system. Source AI handles discovery, scanning, strategy, BRD generation, and migration execution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
