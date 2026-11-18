"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updatePlayback() {
      if (preference.matches) video.current?.pause();
      else video.current?.play().catch(() => {});
    }
    updatePlayback();
    preference.addEventListener("change", updatePlayback);
    return () => preference.removeEventListener("change", updatePlayback);
  }, []);

  async function toggleVideo() {
    if (!video.current) return;
    if (video.current.paused) await video.current.play().catch(() => {});
    else video.current.pause();
  }

  return <>
    <svg className="video-color-filter" width="0" height="0" aria-hidden="true"><defs><filter id="video-duotone" colorInterpolationFilters="sRGB"><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncR type="table" tableValues="0.0549 0.851" /><feFuncG type="table" tableValues="0.051 1" /><feFuncB type="table" tableValues="0.0706 0.2745" /></feComponentTransfer></filter></defs></svg>
    <video ref={video} className="hero-video" src="/media/bg-video.mp4" muted loop playsInline preload="auto" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <button className="video-toggle" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 2h2v8H3zm4 0h2v8H7z" /></svg> : <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="m3 2 7 4-7 4z" /></svg>}</button>
  </>;
}
