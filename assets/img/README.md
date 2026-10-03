# Hero images

Drop the hero images here using exactly these names, then add the slot key to
`HAVE` in `assets/js/views/hero.js` so the page asks for the file. A slot that
is not in `HAVE` shows a palette gradient instead and requests nothing, so the
console stays clean while artwork is still missing.

**In place:** Getting Started, Parts 1–5, Unit Check.
**Still a gradient:** Home, Unit 1 overview.

| File | Screen |
|---|---|
| `hero-home.webp` | Home |
| `hero-getting-started.webp` | Getting Started |
| `hero-unit-1.webp` | Unit 1 overview |
| `hero-part-1.webp` | Part 1 · A Trip to Japan |
| `hero-part-2.webp` | Part 2 · Snow Monkeys |
| `hero-part-3.webp` | Part 3 · Let's Go |
| `hero-part-4.webp` | Part 4 · Made in Japan |
| `hero-part-5.webp` | Part 5 · Story |
| `hero-unit-check.webp` | Unit Check |

**Size** 1600 × 500 · **Format** WebP (JPG works too, rename the extension in
`assets/js/views/hero.js`) · **Weight** under 200 KB each.

**Framing.** The band is much wider than the artwork on a desktop and narrower
than it on a phone, so every image is cropped one way or the other. `FOCUS` in
`hero.js` says which point each one keeps in frame — the vertical figure holds
the horizon on a wide screen, the horizontal one holds the subject on a narrow
one. The text sits on the left third, under a reading scrim, so put the part of
the picture that matters towards the middle or the right.

The title sits over the left third of the band, so keep that area calm — sky,
water, a wall, anything without detail. A dark scrim is laid over the whole
image so white text stays readable on any photograph.
