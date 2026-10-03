/* Hero band.

   Each screen names an image slot under assets/img/. The band paints that image
   over a palette gradient, so a slot with no file yet simply shows the gradient
   — no broken image, no placeholder artwork to remove later. Dropping the real
   file in is the whole change. */

const SLOTS = {
  'home':            'hero-home.webp',
  'getting-started': 'hero-getting-started.webp',
  'unit-1':          'hero-unit-1.webp',
  'part-1':          'hero-part-1.webp',
  'part-2':          'hero-part-2.webp',
  'part-3':          'hero-part-3.webp',
  'part-4':          'hero-part-4.webp',
  'part-5':          'hero-part-5.webp',
  'unit-check':      'hero-unit-check.webp'
};

/* Slots whose file is actually in assets/img/. The others keep the gradient
   until their artwork arrives, so nothing requests a file that is not there. */
const HAVE = new Set([
  'getting-started', 'part-1', 'part-2', 'part-3', 'part-4', 'part-5', 'unit-check'
]);

/* Each slot gets its own gradient. It is what the slots without artwork show,
   and it is also the colour the image is painted over. */
const TONES = {
  'home':            'navy',
  'getting-started': 'indigo',
  'unit-1':          'navy',
  'part-1':          'gold',
  'part-2':          'teal',
  'part-3':          'indigo',
  'part-4':          'blush',
  'part-5':          'sage',
  'unit-check':      'gold'
};

/* The band is far wider than the 1600x500 artwork on a desktop and narrower
   than it on a phone, so every image is cropped one way or the other. These
   are the points each one should keep in frame: the vertical figure holds the
   horizon on a wide screen, the horizontal one holds the subject on a narrow
   one. */
const FOCUS = {
  'getting-started': '50% 38%',   // the window light and the shelf
  'part-1':          '50% 46%',   // Mount Fuji and the bay
  'part-2':          '38% 52%',   // the snow monkeys in the hot pool
  'part-3':          '62% 56%',   // the shinkansen pulling in
  'part-4':          '55% 44%',   // Fuji, Tokyo Tower and the bonsai
  'part-5':          '55% 50%',   // the fountain and the sunset
  'unit-check':      '50% 44%'    // the sky, the torii and the checklist
};

function slotFor(key){ return HAVE.has(key) ? SLOTS[key] : null; }

function renderHero({ key, eyebrow, title, subtitle, meta }){
  const file = slotFor(key);
  const tone = TONES[key] || 'navy';
  /* The url() is written straight into background-image rather than into a
     custom property: a relative url in a custom property is resolved against
     the stylesheet that reads it, not the page, which sent these looking for
     assets/css/assets/img/. Here it resolves against the page, so the site
     still works under the /English-hub/ path on Pages. */
  const style = file
    ? `background-image:url('assets/img/${file}'), var(--heroTone);`
      + `background-position:${FOCUS[key] || '50% 50%'}, center;`
    : '';
  return `
  <section class="hero tone-${tone}${file ? ' hasImg' : ''}" style="${style}">
    <div class="heroInner">
      ${eyebrow ? `<p class="heroEyebrow">${eyebrow}</p>` : ''}
      <h1 class="heroTitle serif">${title}</h1>
      ${subtitle ? `<p class="heroSub">${subtitle}</p>` : ''}
      ${meta ? `<p class="heroMeta">${meta}</p>` : ''}
    </div>
  </section>`;
}

export { renderHero, slotFor, SLOTS, HAVE };
