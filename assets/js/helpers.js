/* Small shared helpers. */

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function escapeAttr(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function heLine(text){ return `<div class="he" dir="rtl" style="font-size:0.82rem;color:var(--ink-soft);margin-top:3px;">${text}</div>`; }

export { shuffle, escapeAttr, heLine };
