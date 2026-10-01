/* Home: a hero band and exactly two cards. Nothing else lives at this level. */
import { sections } from '../content/model.js';
import { sectionProgress } from '../progress.js';
import { hashFor } from '../router.js';
import { renderHero } from './hero.js';
import { bi } from './bilingual.js';

function wordCount(section){
  const parts = (section.parts && section.parts.length) ? section.parts : [section];
  return parts.reduce((n, p) => n + ((p.vocabulary || []).length), 0);
}

function card(section){
  const pr = sectionProgress(section);
  const parts = (section.parts || []).length;
  const meta = [parts ? parts + ' stages' : null, wordCount(section) + ' words']
    .filter(Boolean).join(' · ');
  return `
  <a class="homeCard" href="${hashFor({ view:'section', sectionId:section.id })}">
    <span class="homeIcon" aria-hidden="true">${section.icon}</span>
    <h2>${section.label}</h2>
    <p class="homeDesc">${section.subtitle || ''}</p>
    <p class="homeMeta">${meta}</p>
    <div class="pbarOuter"><div class="pbarInner" style="width:${pr.pct}%"></div></div>
    <p class="homePct">${pr.done} / ${pr.total}</p>
    <span class="homeGo">${pr.done ? bi('Continue &rarr;', 'המשיכו') : bi('Start &rarr;', 'התחילו')}</span>
  </a>`;
}

function renderHome(){
  return `
  ${renderHero({
    key: 'home',
    eyebrow: 'English Learning Hub',
    title: 'THINK ABOUT IT!',
    subtitle: 'Grade 6 · Gevim School',
    meta: 'Learn • Practice • Read • Write'
  })}
  <div class="homeGrid">${sections().map(card).join('')}</div>`;
}

export { renderHome };
