"use client";

import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll("[data-reveal]")]
      .filter(element => element.getBoundingClientRect().top >= window.innerHeight);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      }
    }, { threshold: 0.12 });
    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return null;
}
