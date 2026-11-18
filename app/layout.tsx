import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AudioPlayer } from "@/components/audio-player";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteName, siteOrigin } from "./site";
import "./globals.css";

const display = localFont({ src: "../public/fonts/barlow-condensed-black.woff2", variable: "--font-display", weight: "900", display: "swap" });
const body = localFont({ src: "../public/fonts/space-grotesk.woff2", variable: "--font-body", weight: "300 700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: `${siteName} | Independent Hardstyle Label`, template: `%s | ${siteName}` },
};

export const viewport: Viewport = { themeColor: "#0e0d12", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <AudioPlayer>{children}</AudioPlayer>
        <Footer />
      </body>
    </html>
  );
}

