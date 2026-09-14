/* A section screen.
   Unit 1 shows its Parts. Getting Started has no parts, so it shows its own
   Learn / Practice lanes directly — one level shallower, by design. */
import { getSection, getPart, hasParts } from '../content/model.js';
import { partProgress, colorBg, colorVar } from '../state.js';
import { S } from '../state.js';
import { hashFor } from '../router.js';
import { renderLanes } from './part.js';

function partCard(sectionId, part){
  const pr = partProgress(sectionId, part);
  const grammar = (part.grammar || []).map(g => g.topic).join(' · ');
  const words = (part.vocabulary || []).length;
  const meta = [words ? words + ' words' : null, grammar || null].filter(Boolean).join(' — ');
  return `
  <a class="partCard" style="background:${colorBg(part.color)}"
     href="${hashFor({ view:'part', sectionId, partId:part.id })}">
    <div class="partTop">
      <span class="partNum">${part.number ? 'Part ' + part.number : 'Review'}</span>
      <span class="partStatus">${pr.total && pr.done === pr.total ? '✓' : pr.done ? pr.done + '/' + pr.total : '○'}</span>
    </div>
    <div class="icon">${part.icon}</div>
    <h4>${part.title}</h4>
    <p class="partMeta">${meta || '&nbsp;'}</p>
    <div class="pbarOuter thin"><div class="pbarInner" style="width:${pr.pct}%;background:${colorVar(part.color)}"></div></div>
  </a>`;
}

function renderSection(){
  const section = getSection(S.sectionId);
  if(!section) return '';

  const head = `
  <div class="unitHead">
    <div class="icon">${section.icon}</div>
    <div><h2>${section.title}</h2><p>${section.subtitle || ''}</p></div>
  </div>`;

  if(hasParts(section)){
    const note = section.titleNote ? `<p class="sectionNote">${section.titleNote}</p>` : '';
    return head + note + `<div class="partGrid">${
      section.parts.map(p => partCard(section.id, p)).join('')
    }</div>`;
  }

  /* No parts: show this section's own lanes. */
  const part = getPart(section.id, null);
  return head + renderLanes(section.id, part);
}

export { renderSection };
