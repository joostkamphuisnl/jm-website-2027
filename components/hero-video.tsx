"use client";

import { useSyncExternalStore } from "react";

const motionPreference = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const preference = window.matchMedia(motionPreference);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

export function HeroVideo() {
  const reduceMotion = useSyncExternalStore(subscribe, () => window.matchMedia(motionPreference).matches, () => true);
  if (reduceMotion) return null;

  return <video className="hero-video" src="/media/hero-loop.mp4" poster="/media/hero-poster.webp" autoPlay muted loop playsInline aria-hidden="true" />;
}
