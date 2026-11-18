"use client";

import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      }
    }, { threshold: 0.12 });
    for (const element of elements) { element.classList.add("reveal-ready"); observer.observe(element); }
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("reveal-ready")); };
  }, []);
  return null;
}
