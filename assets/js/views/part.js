/* A Part screen, laid out as a learning sequence:
   Warm Up → Vocabulary → Grammar → Reading → Writing → Review.

   Only categories that actually hold activities are drawn. Nothing the student
   cannot open appears at all. */

import { S, isDone, colorVar } from '../state.js';
import { partProgress } from '../progress.js';
import { getSection, getPart, visibleActivities } from '../content/model.js';
import { bi } from './bilingual.js';
import { hashFor } from '../router.js';
import { activityTitle, titleHeLine, levelBadge, sourceRef } from './labels.js';
import { groupByCategory, categoryHeading, categoryOf } from './categories.js';
import { renderHero } from './hero.js';

/* Where the exercise came from, said plainly. */
function originBadge(a){
  if(a.generated || a.origin === 'extra')
    return `<span class="originTag extra">${bi('Extra Practice', 'תרגול נוסף')}</span>`;
  if(a.origin === 'adapted')
    return `<span class="originTag adapted">${bi('Adapted', 'מותאם')}</span>`;
  return '';
}

function activityCard(sectionId, part, a, n){
  const done = isDone(sectionId, part.id, a.id);
  const cat = categoryOf(a);
  return `<a class="actItem cat-${cat}${done ? ' done' : ''}"
     href="${hashFor({ view:'activity', sectionId, partId:part.id, activityId:a.id })}">
    <div class="actTop">
      <span class="actStep">${n}</span>
      ${levelBadge(a.level)}
      <span class="actTick">${done ? '<span class="fxTick">✓</span>' : ''}</span>
    </div>
    <div class="actTitle">
      <h4>${activityTitle(a)}</h4>
      ${titleHeLine(a)}
    </div>
    ${sourceRef(a)}
    ${originBadge(a)}
  </a>`;
}

/* The rules from the book, shown at the head of the Grammar block so the
   explanation comes before any practice. */
function grammarRules(part){
  if(!(part.grammar || []).length) return '';
  return `<div class="ruleStack">${part.grammar.map(g => `
    <div class="teachBox">
      <h4>${g.topic}</h4>
      ${(g.points || []).map(p => `<div class="ruleRow"><span>${p}</span></div>`).join('')}
      ${sourceRef(g)}
    </div>`).join('')}</div>`;
}

function categorySection(sectionId, part, group){
  const rules = group.key === 'grammar' ? grammarRules(part) : '';
  return `
  <section class="catBlock cat-${group.key}">
    ${categoryHeading(group)}
    ${rules}
    <div class="catGrid">${group.items.map((a, i) => activityCard(sectionId, part, a, i + 1)).join('')}</div>
  </section>`;
}

/* A printable vocabulary worksheet: the word list with a blank column.
   Never shown on screen and no longer offered by a button — the student
   interface does not carry a print action. It is the print layout of the page,
   so a teacher who prints a Part from the browser gets the word sheet rather
   than a screenshot of the cards. */
function worksheet(section, part){
  const words = part.vocabulary || [];
  if(!words.length) return '';
  const sb = ((part.sources || {}).studentsBook || []).join(', ');
  const wb = ((part.sources || {}).workbook || []).join(', ');
  /* Getting Started is workbook-only, so a book line would print "Book p." */
  const pages = [sb && 'Book p.' + sb, wb && 'Workbook p.' + wb]
    .filter(Boolean).map(s => ' &middot; ' + s).join('');
  return `
  <section class="printOnly" aria-hidden="true">
    <div class="printHead">
      <h1>${part.title}</h1>
      <div class="printMeta">THINK ABOUT IT! &middot; Grade 6 &middot; ${section.label}${part.number ? ' &middot; Part ' + part.number : ''}${pages}</div>
      <div class="printName">Name: ______________________________　　Class: ____________　　Date: ____________</div>
    </div>
    <table class="wsTable">
      <thead><tr><th class="wsNum">#</th><th>English</th><th class="wsHe" dir="rtl">עברית</th><th class="wsBlank">Write it</th></tr></thead>
      <tbody>${words.map((w, i) => `
        <tr>
          <td class="wsNum">${i + 1}</td>
          <td>${w.en}</td>
          <td class="wsHe" dir="rtl">${w.he || ''}</td>
          <td class="wsBlank"></td>
        </tr>`).join('')}</tbody>
    </table>
    <div class="printFoot">${words.length} words</div>
  </section>`;
}

/* Shared by the Part screen and by part-less sections such as Getting Started. */
function renderLanes(sectionId, part){
  const groups = groupByCategory(visibleActivities(part));
  const pr = partProgress(sectionId, part);
  return `
  <div class="partProgress">
    <div class="pbarOuter"><div class="pbarInner" style="width:${pr.pct}%;background:${colorVar('teal')}"></div></div>
    <div class="pctLabel">${bi(`${pr.done} of ${pr.total} done`, `${pr.done} מתוך ${pr.total} הושלמו`)}</div>
  </div>
  ${groups.map(g => categorySection(sectionId, part, g)).join('')}`;
}

function renderPart(){
  const section = getSection(S.sectionId);
  const part = getPart(S.sectionId, S.partId);
  if(!section || !part) return '';
  const sb = ((part.sources || {}).studentsBook || []).join(', ');
  const wb = ((part.sources || {}).workbook || []).join(', ');
  const words = (part.vocabulary || []).length;
  return `
  ${renderHero({
    key: part.hero || part.id,
    eyebrow: part.number ? `${section.label} · Part ${part.number}` : section.label,
    title: part.title,
    subtitle: part.subtitle || '',
    meta: `📘 Book p.${sb} &nbsp;·&nbsp; 📝 Workbook p.${wb}${words ? ' &nbsp;·&nbsp; ' + words + ' words' : ''}`
  })}
  ${part.notes ? `<p class="sectionNote">${part.notes}</p>` : ''}
  ${renderLanes(section.id, part)}
  ${worksheet(section, part)}`;
}

export { renderPart, renderLanes, worksheet };
