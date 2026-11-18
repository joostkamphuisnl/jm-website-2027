import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const releases = JSON.parse(readFileSync(new URL("../app/releases.json", import.meta.url), "utf8"));
test("all unique release routes have local art, valid metadata, and official streaming destinations", () => {
  assert.equal(releases.length, 3);
  assert.equal(new Set(releases.map(release => release.slug)).size, releases.length);
  for (const release of releases) {
    assert.match(release.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(existsSync(new URL(`../public${release.image}`, import.meta.url)));
    assert.ok(Number.isFinite(Date.parse(release.date)));
    assert.match(release.catalog, /^JZDM\d{3}$/);
    for (const platform of ["spotify", "apple", "beatport", "soundcloud", "youtube"]) assert.equal(new URL(release[platform]).protocol, "https:");
    assert.equal(new URL(release.spotify).hostname, "open.spotify.com");
  }
});
test("the JM vector is exactly the original site's monogram", () => {
  const logo = readFileSync(new URL("../public/media/jm-logo.svg", import.meta.url), "utf8");
  assert.ok(logo.includes('viewBox="0 0 512 395.68"'));
  assert.ok(logo.includes('d="M132.32 395.68L18.66 321'));
});

test("the hero uses the unchanged original background video", () => {
  const video = readFileSync(new URL("../public/media/bg-video.mp4", import.meta.url));
  assert.equal(createHash("sha256").update(video).digest("hex"), "45a6731ebef0b0b9fd1cfc392168c28a795e744dec3c8d059b278d3171fe6884");
});
