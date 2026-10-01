/* A section screen.
   Unit 1 shows its stages. Getting Started has no stages, so it shows its own
   learning sequence directly — one level shallower, by design. */
import { getSection, getPart, hasParts } from '../content/model.js';
import { partProgress } from '../progress.js';
import { S } from '../state.js';
import { hashFor } from '../router.js';
import { renderLanes } from './part.js';
import { renderHero } from './hero.js';
import { bi } from './bilingual.js';
import { CATEGORIES, groupByCategory } from './categories.js';
import { visibleActivities } from '../content/model.js';

/* The strip of category icons tells a student what a stage holds before they
   open it — words, grammar, a text, writing. */
function categoryStrip(part){
  const groups = groupByCategory(visibleActivities(part));
  if(!groups.length) return '';
  return `<p class="stageCats">${groups.map(g =>
    `<span class="stageCat cat-${g.key}" title="${g.def.en}">${g.def.icon} ${g.def.en}</span>`).join('')}</p>`;
}

function stageCard(sectionId, part){
  const pr = partProgress(sectionId, part);
  const done = pr.total && pr.done === pr.total;
  return `
  <a class="stageCard${done ? ' done' : ''}" href="${hashFor({ view:'part', sectionId, partId:part.id })}">
    <div class="stageTop">
      <span class="stageNum">${part.number ? 'Part ' + part.number : 'Review'}</span>
      <span class="stageTick">${done ? '<span class="fxTick">✓</span>' : pr.done ? pr.done + '/' + pr.total : ''}</span>
    </div>
    <span class="stageIcon" aria-hidden="true">${part.icon}</span>
    <h3>${part.title}</h3>
    ${categoryStrip(part)}
    <div class="pbarOuter thin"><div class="pbarInner" style="width:${pr.pct}%"></div></div>
  </a>`;
}

function renderSection(){
  const section = getSection(S.sectionId);
  if(!section) return '';
  const words = ((section.parts && section.parts.length) ? section.parts : [section])
    .reduce((n, p) => n + ((p.vocabulary || []).length), 0);

  const hero = renderHero({
    key: section.hero || section.id,
    eyebrow: 'THINK ABOUT IT! · Grade 6',
    title: section.title,
    subtitle: section.subtitle || '',
    meta: `${(section.parts || []).length ? (section.parts.length + ' stages · ') : ''}${words} words`
  });

  if(hasParts(section)){
    const note = section.titleNote ? `<p class="sectionNote">${section.titleNote}</p>` : '';
    return hero + note + `<div class="stageGrid">${
      section.parts.map(p => stageCard(section.id, p)).join('')
    }</div>`;
  }
  return hero + renderLanes(section.id, getPart(section.id, null));
}

export { renderSection };
