import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const coolvetica = localFont({
  src: "./fonts/coolvetica-rg.woff",
  display: "swap",
  variable: "--font-coolvetica",
});

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="en" className={`${coolvetica.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
