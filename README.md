# Deesses Bakery — Concept Demo

A single-page, static **design concept** for a warm, golden-toned bakery brand.
Built as a self-contained front-end demo — no build step, no dependencies, no backend.

> **This is a demo concept only.** It is not an official site and is not affiliated with,
> endorsed by, or representing the real business. No real prices, hours, phone numbers, or
> addresses are stated anywhere in this project.

## What it is

An Apple-inspired, editorial landing page styled around the idea of warm, golden,
handcrafted breads and pastries. It leans on large typography, generous whitespace,
a sticky glass navigation bar, and subtle scroll-driven motion.

## Source references

The content is anchored to a few public signals and used for illustration only:

- **Lead:** the *Deesses Bakery* Facebook presence.
- **Related result:** *Artemis by Deesses Bakery*, listed at **AIRSIDE, Kai Tak** —
  featured as a sibling concept section.
- **Post mention:** **Hong Kong Wetland Park** — used as the mood/setting of the "Visit" section.

Nothing beyond these references is asserted as fact. Hours, contact details, menus, and
pricing are intentionally left unstated.

## Files

| File         | Purpose                                                        |
|--------------|----------------------------------------------------------------|
| `index.html` | Page structure and content.                                    |
| `styles.css` | Warm bakery palette, layout, responsive rules, theme tokens.   |
| `script.js`  | Sticky-nav behavior, scroll-driven theme shifts, reveal-on-scroll. |
| `README.md`  | This file.                                                     |

## Features

- **Warm golden palette** — crust, amber, honey, butter, and cream tones.
- **Sticky glass navigation** — condenses with a frosted backdrop blur after scrolling.
- **Scroll-driven theme** — the page shifts through four warm "times of day"
  (dawn → midday → golden → dusk) as you scroll.
- **Responsive** — fluid type and grids that collapse gracefully on mobile.
- **Reveal-on-scroll** — sections fade in via `IntersectionObserver`.
- **Accessible & reduced-motion aware** — honors `prefers-reduced-motion`; smooth
  anchor focus for keyboard users.

## Running it

No tooling required — just open the file:

```powershell
start index.html
```

Or serve the folder with any static server, for example:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## Notes & customization

- Palette and theme tokens live at the top of `styles.css` (`:root` and the
  `body[data-theme="…"]` blocks). Adjust those to retune the warmth.
- The scroll themes are defined by the `themes` array in `script.js`.
- Product images are represented as CSS gradient swatches so the demo stays
  dependency-free; swap in real photography by replacing the `.bake__swatch` elements.

## Disclaimer

All brand and place names appear for illustrative, non-commercial demonstration purposes.
For anything official, refer to the business's own Facebook page.
