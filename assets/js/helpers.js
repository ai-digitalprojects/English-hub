/* Small shared helpers. */

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
/* The two columns of a matching exercise, each shuffled, and then checked.

   Shuffling both sides independently is not enough on its own: whatever the
   number of pairs, a plain shuffle leaves at least one row sitting level with
   its own answer about 63% of the time, and a student who notices one free
   answer stops looking for the rest. This reshuffles until no row lines up.

   Pairs are [left, right]. Scoring never reads these orders — it looks the
   partner up in the pair list — so the display can be arranged freely. */
function deal(pairs){
  const left = shuffle(pairs.map(p => p[0]));
  const partner = new Map(pairs);
  const lined = right => left.some((l, i) => partner.get(l) === right[i]);
  if(pairs.length < 2) return { left, right: pairs.map(p => p[1]) };
  for(let tries = 0; tries < 60; tries++){
    const right = shuffle(pairs.map(p => p[1]));
    if(!lined(right)) return { left, right };
  }
  /* Sixty shuffles all lined up, which in practice means the pairs repeat a
     partner. Rotating the answers by one is the fallback: with distinct
     partners it can never line up, and with repeats it is still no worse. */
  const right = left.map(l => partner.get(l));
  right.push(right.shift());
  return { left, right };
}

function escapeAttr(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function heLine(text){ return `<div class="he" dir="rtl" style="font-size:0.82rem;color:var(--ink-soft);margin-top:3px;">${text}</div>`; }

export { shuffle, deal, escapeAttr, heLine };
