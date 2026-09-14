/* Home: exactly two cards. Nothing else lives at this level. */
import { sections } from '../content/model.js';
import { sectionProgress, colorVar } from '../state.js';
import { hashFor } from '../router.js';

function wordCount(section){
  const parts = (section.parts && section.parts.length) ? section.parts : [section];
  return parts.reduce((n, p) => n + ((p.vocabulary || []).length), 0);
}

function card(section){
  const pr = sectionProgress(section);
  const parts = (section.parts || []).length;
  const meta = [
    parts ? parts + ' parts' : null,
    wordCount(section) + ' words'
  ].filter(Boolean).join(' · ');
  return `
  <a class="uCard" href="${hashFor({ view:'section', sectionId:section.id })}">
    <div class="icon">${section.icon}</div>
    <h3>${section.label}</h3>
    <p class="desc">${section.subtitle || ''}</p>
    <div class="cardMeta">${meta}</div>
    <div class="pbarOuter"><div class="pbarInner" style="width:${pr.pct}%;background:${colorVar(section.color)}"></div></div>
    <div class="pctLabel">${pr.pct}% &middot; ${pr.done}/${pr.total} done</div>
    <span class="startBtn" style="background:${colorVar(section.color)}">${pr.done ? 'Continue →' : 'Start →'}</span>
  </a>`;
}

function renderHome(){
  return `
  <div class="hero">
    <div class="eyebrow">English Learning Hub</div>
    <h1 class="serif">BOOK: "THINK ABOUT IT!"</h1>
    <div class="sub">Grade 6 &middot; Gevim School</div>
    <div class="tagline">Learn &bull; Practice &bull; Speak &bull; Create</div>
  </div>
  <div class="homeGrid">${sections().map(card).join('')}</div>`;
}

export { renderHome };
