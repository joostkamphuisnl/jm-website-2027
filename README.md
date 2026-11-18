# Juized Music

Next.js App Router website for the Juized Music label. Uses the original JM vector logo, catalogue, artwork and artist portrait from juizedmusic.com. Typography comes from juized.nl.

## Development

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:3000. `pnpm build` generates a static site in `out/`. The static host should resolve clean release URLs to their `.html` files and serve the exported `.txt` navigation files as `text/plain` so playback can persist across pages.

## Checks

```sh
pnpm test
pnpm typecheck
pnpm build
```

Edit `app/releases.json` to update the catalogue. Release pages and the sitemap are generated at build time. Preview URLs and current Apple track links come from the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/), and previews stream directly from Apple after a visitor presses play. Playback continues during navigation within the site. Artwork and fonts are self-hosted.

The original motion study in `public/media/hero-loop.mp4` plays muted. Visitors who prefer reduced motion see its poster. Regenerate both assets with `uv run --no-project --with numpy --with imageio-ffmpeg python scripts/render-hero.py`.

If this build replaces the live site on juizedmusic.com, set permanent redirects on the hosting server for the old URLs:

| Old URL | Destination |
| --- | --- |
| `/releases` | `/#releases` |
| `/about` | `/#label` |
| `/artists`, `/artists/juized` | `/#artists` |
| `/releases/juized-enter-the-mainframe` | `/releases/enter-the-mainframe` |
| `/releases/juized-darkness` | `/releases/darkness` |
| `/releases/juized-black-hole` | `/releases/black-hole` |

The favicon uses the original sidebar logo enlarged to 70% width inside the accent square. SVG, multi-resolution ICO, and an Apple touch icon are included. This project is maintained locally and has no ChatGPT Sites hosting configuration.

