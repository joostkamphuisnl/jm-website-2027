# Juized Music

Next.js App Router website for the Juized Music label. Uses the original JM vector logo, original background video, verified catalogue, artwork, and streaming destinations from juizedmusic.com. Typography comes from juized.nl. The artist portrait comes from the Juized Music artist profile.

## Development

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:3000. `pnpm build` generates a static site in `out/`. Serve that directory with your static host; `next start` does not support static exports.

## Checks

```sh
pnpm test
pnpm typecheck
pnpm build
```

Edit `app/releases.json` to update the catalogue. All release pages are generated at build time. All media and fonts are self-hosted. No CMS or demo submission service is configured. The original site says demos are closed; that policy is preserved.

The background video is recolored in CSS. Its small pause button and reduced-motion support allow visitors to stop playback. Scroll reveals run once. The right navigation uses the browser's native Popover API for Escape and click-away dismissal.

