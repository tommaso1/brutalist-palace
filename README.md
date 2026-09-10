# BRUTALIST_PALACE

A single-page band website built with Svelte 5, Vite, and Three.js. All site copy is in English.

## Run locally

```sh
npm ci
npm run dev
```

`npm run check` checks Svelte and accessibility diagnostics. `npm run build` produces a portable static site in `dist/`. `npm run preview` serves that output locally.

## Content and design

- `src/App.svelte`: biography, release information, track links, and social links.
- `src/style.css`: responsive layout, Space Grotesk typography, graphite and violet palette.
- `src/tower.js`: original procedural 3D brutalist tower with a photographed concrete base and an upper structure drawn in neon outlines. Includes bloom, ground grid, and animated shader fog. No Blender file or external model is needed.
- `src/Tower.svelte`: deferred scene loading, motion controls, and WebGL fallback.
- `public/images/`: artist-supplied portrait, published EP cover, and painting fallback.
- `public/textures/concrete/`: local 1K color, OpenGL normal, and packed ambient-occlusion/roughness maps. UVs are scaled by the physical size of each concrete face.

The animation respects reduced-motion preferences, includes a pause button, and stops rendering when the scene or browser tab is hidden. The page does not autoplay audio. Track and album links open Bandcamp; Instagram links open the artist’s profile.

## Sources

- [The Deluge on Bandcamp](https://brutalistpalace.bandcamp.com/album/the-deluge): published cover, release date, four track names, durations, and production notes, checked September 10, 2026.
- [Artist Instagram](https://www.instagram.com/brutalist_palace/): supplied by the artist.
- [Francis Danby, The Deluge — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg): original painting reference and fallback image. The source describes the work as public domain and includes jurisdiction-specific reproduction information.
- [Barbican architecture](https://www.barbican.org.uk/s/barbicanfacts): architectural inspiration for exposed concrete, repetitive slabs, and structural rhythm. The 3D model is an original composition.
- [Concrete Slab Wall 02 — Poly Haven](https://polyhaven.com/a/concrete_slab_wall_02): photographed concrete material, released under CC0. Texture maps are included locally; the page makes no request to Poly Haven.

The artist biography and portrait were supplied directly by the artist. No analytics, forms, or third-party embeds are included. Space Grotesk is self-hosted through the Fontsource package.

## Hosting

Deployment is manual. Run `npm run build`, then upload the contents of `dist/` to your chosen static web host. There are no publish hooks in the local scripts. The earlier Sites configuration in `.openai/hosting.json` is optional for serving this static export elsewhere. Connecting `brutalistpalace.com` requires configuring the domain with your hosting provider and updating DNS.

Local browser screenshots and temporary test output are saved under `output/playwright/` and excluded from Git.
