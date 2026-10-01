/* Hero band.

   Each screen names an image slot under assets/img/. The band paints that image
   first and a palette gradient underneath, so a slot with no file yet simply
   shows the gradient — no broken image, no placeholder artwork to remove later.
   Dropping the real file in is the whole change. */

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

/* Each slot gets its own gradient so the screens stay distinguishable until
   the photographs arrive. */
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

function slotFor(key){ return SLOTS[key] || null; }

function renderHero({ key, eyebrow, title, subtitle, meta }){
  const file = slotFor(key);
  const tone = TONES[key] || 'navy';
  const img = file ? `--heroImg:url('assets/img/${file}');` : '';
  return `
  <section class="hero tone-${tone}" style="${img}" role="img" aria-label="${title}">
    <div class="heroInner">
      ${eyebrow ? `<p class="heroEyebrow">${eyebrow}</p>` : ''}
      <h1 class="heroTitle serif">${title}</h1>
      ${subtitle ? `<p class="heroSub">${subtitle}</p>` : ''}
      ${meta ? `<p class="heroMeta">${meta}</p>` : ''}
    </div>
  </section>`;
}

export { renderHero, slotFor, SLOTS };
