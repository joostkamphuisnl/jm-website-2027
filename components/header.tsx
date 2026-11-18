"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow, Instagram, TikTok, YouTube } from "./icon";

export function Header({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const navigation = useRef<HTMLElement>(null);
  const prefix = home ? "" : "/";
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="Juized Music home"><Image src="/media/jm-logo.svg" alt="" width={45} height={35} priority /></Link>
      <button id="nav-toggle" className="menu-toggle" popoverTarget="main-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}><span className={open ? "menu-bars is-open" : "menu-bars"}><i /><i /></span></button>
      <nav ref={navigation} id="main-navigation" popover="auto" onToggle={event => setOpen(event.currentTarget.matches(":popover-open"))} className="main-nav" aria-label="Main navigation">
        <Link href="/" onClick={() => navigation.current?.hidePopover()}>Home<Arrow diagonal /></Link>
        {[["Releases", "releases"], ["Artists", "artists"], ["About", "label"]].map(([label, id]) => <a key={id} href={`${prefix}#${id}`} onClick={() => navigation.current?.hidePopover()}>{label}<Arrow diagonal /></a>)}
      </nav>
      <div className="rail-socials"><a href="https://www.instagram.com/juizedmusic" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a><a href="https://www.tiktok.com/@juizedmusic" aria-label="TikTok" target="_blank" rel="noreferrer"><TikTok /></a><a href="https://www.youtube.com/@juizedmusic" aria-label="YouTube" target="_blank" rel="noreferrer"><YouTube /></a></div>
    </div>
  </header>;
}
