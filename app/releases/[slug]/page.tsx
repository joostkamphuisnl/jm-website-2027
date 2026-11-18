import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, Play } from "@/components/icon";
import releases from "../../releases.json";

export function generateStaticParams() { return releases.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find(release => release.slug === slug);
  return release ? { title: `${release.artist} - ${release.title}`, description: release.description, openGraph: { images: [release.image] } } : {};
}

export default async function ReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = releases.find(release => release.slug === slug);
  if (!release) notFound();
  return <><Header /><main id="main" className="release-page wrap"><Link href="/#releases" className="back-link"><Arrow /> Back to releases</Link><div className="release-detail"><div className="detail-art"><Image src={release.image} alt={`${release.title} cover artwork`} width={800} height={800} sizes="(max-width: 800px) 90vw, 45vw" priority /></div><div className="detail-copy"><p className="eyebrow"><span className="status-dot" /> {release.catalog} <span>/</span> JUIZED MUSIC</p><p className="detail-artist">JUIZED</p><h1>{release.title}</h1><p className="detail-description">{release.description}</p><div className="detail-meta"><span>HARDSTYLE</span><time dateTime={release.date}>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(release.date))}</time></div><a className="button button-accent" href={release.spotify} target="_blank" rel="noreferrer"><Play />Listen on Spotify<Arrow diagonal /></a><div className="stream-links">{[["Apple Music", release.apple], ["Beatport", release.beatport], ["SoundCloud", release.soundcloud], ["YouTube", release.youtube]].map(([platform, url]) => <a key={platform} href={url} target="_blank" rel="noreferrer">{platform}<Arrow diagonal /></a>)}</div></div></div><div className="other-releases"><p className="eyebrow">MORE RELEASES</p>{releases.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/releases/${item.slug}`}><Image src={item.image} alt="" width={60} height={60} /><span>{item.title}<small>{item.artist} / {item.catalog}</small></span><Arrow diagonal /></Link>)}</div></main><Footer /></>;
}



