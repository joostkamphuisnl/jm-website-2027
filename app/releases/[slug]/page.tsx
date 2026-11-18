import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PreviewButton } from "@/components/audio-player";
import { Arrow } from "@/components/icon";
import { ITunesLink } from "@/components/itunes-link";
import releases from "../../releases.json";
import { siteName, siteOrigin } from "../../site";

type ReleaseProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return releases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ReleaseProps): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find(item => item.slug === slug);
  if (!release) return {};

  const title = `${release.title} by ${release.artist}`;
  const description = release.description;
  const url = `/releases/${slug}`;
  const image = { url: release.image, alt: `${release.title} cover artwork` };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName, images: [image], type: "music.song" },
    twitter: { card: "summary", title, description, images: [image] },
  };
}

const releaseDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function ReleasePage({ params }: ReleaseProps) {
  const { slug } = await params;
  const release = releases.find(item => item.slug === slug);
  if (!release) notFound();

  const recording = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: release.title,
    url: `${siteOrigin}/releases/${slug}`,
    description: release.description,
    image: `${siteOrigin}${release.image}`,
    datePublished: release.date,
    genre: "Hardstyle",
    byArtist: { "@type": "Person", name: release.artist, url: "https://www.juized.nl" },
    publisher: { "@id": `${siteOrigin}/#label`, name: siteName },
    sameAs: [release.apple, release.spotify, release.beatport, release.soundcloud, release.youtube],
  };
  const platforms = [
    ["Spotify", release.spotify], ["Apple Music", release.apple], ["Beatport", release.beatport],
    ["SoundCloud", release.soundcloud], ["YouTube", release.youtube],
  ];

  return (
    <main id="main" tabIndex={-1} className="release-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recording).replace(/</g, "\\u003c") }} />
      <div className="wrap">
        <Link href="/#releases" className="back-link"><Arrow /> Back to releases</Link>
        <article className="release-detail" aria-labelledby="release-title">
          <div className="detail-heading">
            <h1 id="release-title">{release.title}</h1>
            <p className="detail-artist">{release.artist}</p>
          </div>
          <div className="detail-art">
            <Image src={release.image} alt={`${release.title} cover artwork`} width={800} height={800} sizes="(max-width: 800px) 85vw, 50vw" preload />
          </div>
          <div className="detail-copy">
            <ul className="detail-meta" aria-label="Release information">
              <li>{release.catalog}</li><li>Hardstyle</li><li><time dateTime={release.date}>{releaseDate.format(new Date(release.date))}</time></li>
            </ul>
            <p className="detail-description">{release.description}</p>
            <div className="detail-preview">
              <PreviewButton track={release} />
              <div className="detail-store"><small>Provided courtesy of iTunes</small><ITunesLink href={release.apple} /></div>
            </div>
            <section aria-labelledby="platforms-heading">
              <h2 id="platforms-heading" className="detail-subheading">Stream or buy</h2>
              <div className="stream-links">{platforms.map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noreferrer">{platform}<Arrow diagonal /></a>
              ))}</div>
            </section>
          </div>
        </article>
        <section className="other-releases" aria-labelledby="other-releases-heading">
          <h2 id="other-releases-heading" className="detail-subheading">More releases</h2>
          {releases.filter(item => item.slug !== slug).map(item => (
            <Link key={item.slug} href={`/releases/${item.slug}`}>
              <Image src={item.image} alt="" width={60} height={60} />
              <span>{item.title}<small>{item.artist} / {item.catalog}</small></span>
              <Arrow diagonal />
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
