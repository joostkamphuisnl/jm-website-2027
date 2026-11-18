import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/icon";
import { Reveals } from "@/components/reveals";
import { HeroVideo } from "@/components/hero-video";
import releases from "./releases.json";
import { siteName, siteOrigin } from "./site";

const title = `${siteName} | Independent Hardstyle Label`;
const description = "Juized Music is an independent hardstyle label founded by Juized. Explore the catalogue, play track previews and find each release on your preferred music service.";
const [latest] = releases;
const image = { url: latest.image, alt: `${latest.title} by ${latest.artist}` };

export const metadata: Metadata = {
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName, images: [image], type: "website" },
  twitter: { card: "summary", title, description, images: [image] },
};

export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteOrigin}/#label`,
    name: siteName,
    url: siteOrigin,
    logo: `${siteOrigin}/icon.svg`,
    description,
    sameAs: ["https://www.instagram.com/juizedmusic", "https://www.tiktok.com/@juizedmusic", "https://www.youtube.com/@juizedmusic"],
  };
  return <main id="main" tabIndex={-1}><Reveals />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
    <section className="hero" aria-labelledby="hero-heading">
      <HeroVideo />
      <div className="hero-shade" />
      <div className="hero-content wrap">
        <div className="hero-copy">
          <p className="hero-intro">Juized Music</p>
          <h1 id="hero-heading"><span className="headline-mask"><span>Bringing you fresh</span></span>{" "}<span className="headline-mask accent"><span>hardstyle music</span></span></h1>
          <a className="button button-accent" href="#releases">Check out our releases<Arrow /></a>
        </div>
      </div>
      <div className="hero-bottom wrap"><Link href={`/releases/${latest.slug}`} className="featured-release"><Image src={latest.image} alt="" width={56} height={56} /><div><span className="eyebrow">Latest release</span><strong>{latest.title}</strong><span className="featured-artist">{latest.artist}</span></div><Arrow diagonal /></Link></div>
    </section>

    <section className="releases-section wrap section-space" id="releases" aria-labelledby="releases-heading">
      <div className="section-heading" data-reveal><h2 id="releases-heading">RELEASES</h2></div>
      <div className="release-grid">
        {releases.map(release => (
          <Link className="release-card" href={`/releases/${release.slug}`} key={release.slug} data-reveal>
            <div className="release-art">
              <Image src={release.image} alt="" width={650} height={650} sizes="(max-width: 600px) 85vw, (max-width: 800px) 45vw, 30vw" />
              <time className="release-year" dateTime={release.date}>{release.date.slice(0, 4)}</time>
            </div>
            <div className="release-info">
              <div><h3>{release.title}</h3><p>{release.artist}</p></div>
              <span className="release-arrow"><Arrow diagonal /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="label-section" id="label" aria-labelledby="label-heading"><div className="wrap label-layout"><div className="label-title" data-reveal><h2 id="label-heading">JUIZED<br /><span className="accent">MUSIC</span></h2></div><div className="label-copy" data-reveal><p className="statement">An independent label<br />dedicated to hardstyle.</p><p>Juized Music was founded by Juized, a producer and DJ who has been part of the hardstyle scene since 2011.</p><p>We work with a small group of artists, taking the time to make each release the best it can be. Quality over quantity.</p></div></div></section>

    <section className="artist-section wrap section-space" id="artists" aria-labelledby="artist-heading"><div className="section-heading" data-reveal><h2 id="artist-heading">ARTISTS</h2></div><a className="artist-feature" href="https://www.juized.nl" target="_blank" rel="noreferrer" data-reveal><div className="artist-image"><Image src="/media/juized-portrait.webp" alt="Juized, producer and founder of Juized Music" fill sizes="(max-width: 700px) 85vw, 45vw" /></div><div className="artist-content"><span className="eyebrow">PRODUCER, DJ & LABEL FOUNDER</span><h3>JUIZED</h3><p>Hardstyle since 2011.</p><p className="artist-bio">From his first releases on The Magic Show Records to sets at Defqon.1 and Rebirth Festival, Juized brings euphoric melodies and raw kicks together.</p><span className="artist-link">Visit juized.nl <span className="round-arrow"><Arrow diagonal /></span></span></div></a></section>

    <section className="demo-note wrap" data-reveal><div><h2>DEMOS</h2><p>We’re not accepting demos at the moment. We’ll share any updates on our social channels.</p></div></section>
  </main>;
}

