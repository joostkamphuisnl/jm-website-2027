import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({ src: "../public/fonts/barlow-condensed-black.woff2", variable: "--font-display", weight: "900", display: "swap" });
const body = localFont({ src: "../public/fonts/space-grotesk.woff2", variable: "--font-body", weight: "300 700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://juized-music-2027.aglow-reed-9765.chatgpt.site"),
  title: { default: "Juized Music - Independent Hardstyle Label", template: "%s | Juized Music" },
  description: "Brand new independent label bringing you fresh Hardstyle music. Discover our releases and artists.",
  openGraph: { title: "Juized Music", description: "Brand new independent label bringing you fresh Hardstyle music.", images: ["/media/enter-the-mainframe.webp"], type: "website" },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}

