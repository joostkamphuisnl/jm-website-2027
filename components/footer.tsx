import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icon";

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top wrap">
      <div><h2>FOLLOW US</h2></div>
      <div className="social-links">{[["Instagram", "https://www.instagram.com/juizedmusic"], ["YouTube", "https://www.youtube.com/@juizedmusic"], ["TikTok", "https://www.tiktok.com/@juizedmusic"]].map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer">{name}<Arrow diagonal /></a>)}</div>
    </div>
    <div className="footer-bottom wrap"><Link className="footer-brand" href="/" aria-label="Juized Music home"><Image src="/media/jm-logo.svg" alt="" width={33} height={26} /></Link><span>© {new Date().getFullYear()} JUIZED MUSIC</span><a href="#main">BACK TO TOP <Arrow /></a></div>
  </footer>;
}

