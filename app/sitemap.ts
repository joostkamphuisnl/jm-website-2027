import type { MetadataRoute } from "next";
import releases from "./releases.json";
import { siteOrigin } from "./site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteOrigin}/` },
    ...releases.map(release => ({ url: `${siteOrigin}/releases/${release.slug}` })),
  ];
}
