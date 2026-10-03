/* A section screen.
   Unit 1 shows its stages. Getting Started has no stages, so it shows its own
   learning sequence directly — one level shallower, by design. */
import { getSection, getPart, hasParts } from '../content/model.js';
import { partProgress } from '../progress.js';
import { S } from '../state.js';
import { hashFor } from '../router.js';
import { renderLanes, worksheet } from './part.js';
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
    `<span class="stageCat cat-${g.key}" title="${g.def.en}"><i aria-hidden="true">${g.def.icon}</i>${g.def.en}</span>`
  ).join('')}</p>`;
}

/* The progress line reads as a sentence, not a score: a count while there is
   something left, a single word once there is not. */
function stageProgress(pr){
  if(pr.total && pr.done === pr.total) return '<span class="stageState done">Complete</span>';
  if(pr.done) return `<span class="stageState">${pr.done} of ${pr.total} done</span>`;
  return `<span class="stageState muted">${pr.total} activities</span>`;
}

function stageCard(sectionId, part){
  const pr = partProgress(sectionId, part);
  const done = pr.total && pr.done === pr.total;
  return `
  <a class="stageCard${done ? ' done' : ''}" href="${hashFor({ view:'part', sectionId, partId:part.id })}">
    <div class="stageHead">
      <span class="stageNum">${part.number ? 'Part ' + part.number : 'Review'}</span>
      <span class="stageIcon" aria-hidden="true">${part.icon}</span>
    </div>
    <h3 class="serif">${part.title}</h3>
    ${categoryStrip(part)}
    <div class="stageFoot">
      <div class="pbarOuter thin"><div class="pbarInner" style="width:${pr.pct}%"></div></div>
      ${stageProgress(pr)}
    </div>
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
    const note = section.titleNote
      ? `<p class="sectionNote"><span class="noteMark" aria-hidden="true"></span>${section.titleNote}</p>`
      : '';
    return `<div class="unitView">${hero}${note}<div class="stageGrid">${
      section.parts.map(p => stageCard(section.id, p)).join('')
    }</div></div>`;
  }
  /* A section without parts still offers the printable word worksheet, which
     only the Part screen used to draw. */
  const only = getPart(section.id, null);
  return hero + renderLanes(section.id, only) + worksheet(section, only);
}

export { renderSection };
