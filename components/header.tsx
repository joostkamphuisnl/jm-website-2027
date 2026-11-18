"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow, Instagram, TikTok, YouTube } from "./icon";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigation = useRef<HTMLElement>(null);
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="Juized Music home"><Image src="/media/jm-logo.svg" alt="" width={45} height={35} priority /></Link>
      <button id="nav-toggle" className="menu-toggle" popoverTarget="main-navigation" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}><span className={open ? "menu-bars is-open" : "menu-bars"} aria-hidden="true"><i /><i /></span></button>
      <nav ref={navigation} id="main-navigation" popover="auto" onToggle={event => setOpen(event.currentTarget.matches(":popover-open"))} className="main-nav" aria-label="Main navigation">
        <Link href="/" onClick={() => navigation.current?.hidePopover()}>Home<Arrow diagonal /></Link>
        {[["Releases", "releases"], ["Artists", "artists"], ["About", "label"]].map(([label, id]) => <Link key={id} href={`/#${id}`} onClick={() => navigation.current?.hidePopover()}>{label}<Arrow diagonal /></Link>)}
      </nav>
      <div className="rail-socials"><a href="https://www.instagram.com/juizedmusic" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a><a href="https://www.tiktok.com/@juizedmusic" aria-label="TikTok" target="_blank" rel="noreferrer"><TikTok /></a><a href="https://www.youtube.com/@juizedmusic" aria-label="YouTube" target="_blank" rel="noreferrer"><YouTube /></a></div>
    </div>
  </header>;
}
