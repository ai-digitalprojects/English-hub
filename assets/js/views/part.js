/* A Part screen: the Learn lane (Student's Book) above the Practice lane
   (Workbook), then whatever skills the model has but cannot yet activate. */
import { S, isDone, partProgress, colorVar } from '../state.js';
import { getSection, getPart, isPlayable, whyNotPlayable } from '../content/model.js';
import { hashFor } from '../router.js';
import { activityTitle, skillLabel, skillIcon, levelBadge, sourceRef } from './labels.js';

function activityCard(sectionId, part, a){
  const playable = isPlayable(part, a);
  const done = isDone(sectionId, part.id, a.id);
  const inner = `
    <div class="actTop">
      <span class="actSkill">${skillIcon(a.skill)} ${skillLabel(a.skill)}</span>
      ${levelBadge(a.level)}
      <span class="actTick">${done ? '✓' : ''}</span>
    </div>
    <h4>${activityTitle(a)}</h4>
    ${sourceRef(a)}
    ${playable ? '' : `<p class="soon">${whyNotPlayable(part, a)}</p>`}`;
  return playable
    ? `<a class="actItem${done ? ' done' : ''}" href="${hashFor({ view:'activity', sectionId, partId:part.id, activityId:a.id })}">${inner}</a>`
    : `<div class="actItem locked" aria-disabled="true">${inner}</div>`;
}

function lane(sectionId, part, name, title, subtitle, items){
  if(!items.length) return '';
  return `
  <section class="lane lane-${name}">
    <header class="laneHead">
      <h3>${title}</h3><span class="laneSub">${subtitle}</span>
    </header>
    <div class="laneGrid">${items.map(a => activityCard(sectionId, part, a)).join('')}</div>
  </section>`;
}

function grammarBox(part){
  if(!(part.grammar || []).length) return '';
  return `
  <section class="lane">
    <header class="laneHead"><h3>🔧 Grammar in this part</h3><span class="laneSub">from the book</span></header>
    ${part.grammar.map(g => `
      <div class="teachBox">
        <h4>${g.topic}</h4>
        ${(g.points || []).map(p => `<div class="ruleRow"><span>${p}</span></div>`).join('')}
        ${sourceRef(g)}
      </div>`).join('')}
  </section>`;
}

function inactiveSkills(part){
  const rows = [];
  ['reading','listening','speaking'].forEach(k => {
    const s = part.skills && part.skills[k];
    if(s && !s.active) rows.push({ key:k, reason:s.reason });
  });
  if(part.phonics && part.phonics.active === false)
    rows.push({ key:'phonics', reason: part.phonics.reason, topic: part.phonics.topic });
  if(!rows.length) return '';
  return `
  <section class="lane">
    <header class="laneHead"><h3>Not available yet</h3><span class="laneSub">waiting for source material</span></header>
    <div class="missingGrid">${rows.map(r => `
      <div class="missingItem">
        <div class="missingHead">${skillIcon(r.key)} ${r.topic || skillLabel(r.key)}</div>
        <p>${r.reason}</p>
      </div>`).join('')}</div>
  </section>`;
}

/* Shared by the Part screen and by part-less sections such as Getting Started. */
function renderLanes(sectionId, part){
  const acts = part.activities || [];
  const learn = acts.filter(a => a.lane === 'learn');
  const practice = acts.filter(a => a.lane === 'practice');
  const pr = partProgress(sectionId, part);
  return `
  <div class="partProgress">
    <div class="pbarOuter"><div class="pbarInner" style="width:${pr.pct}%;background:${colorVar(part.color || 'blue')}"></div></div>
    <div class="pctLabel">${pr.done} of ${pr.total} available activities done</div>
  </div>
  ${lane(sectionId, part, 'learn', '📘 Learn', "Student's Book", learn)}
  ${grammarBox(part)}
  ${lane(sectionId, part, 'practice', '📝 Practice', 'Workbook', practice)}
  ${inactiveSkills(part)}`;
}

function renderPart(){
  const section = getSection(S.sectionId);
  const part = getPart(S.sectionId, S.partId);
  if(!section || !part) return '';
  const sb = (part.sources && part.sources.studentsBook || []).join(', ');
  const wb = (part.sources && part.sources.workbook || []).join(', ');
  return `
  <div class="unitHead">
    <div class="icon">${part.icon}</div>
    <div>
      <h2>${part.title}</h2>
      <p>${part.number ? 'Part ' + part.number : 'Review'} &middot; ${section.label}</p>
      <p class="bookRef">📘 Student's Book p.${sb} &nbsp; 📝 Workbook p.${wb}</p>
    </div>
  </div>
  ${part.notes ? `<p class="sectionNote">${part.notes}</p>` : ''}
  ${renderLanes(section.id, part)}`;
}

export { renderPart, renderLanes };
