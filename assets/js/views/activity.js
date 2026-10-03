/* Activity screens.
   Only the types listed in content/model.js PLAYABLE reach here; every other
   activity is listed on the Part screen but never opened. */
import { S, A, isDone } from '../state.js';
import { getSection, getPart, getActivity, wordsForActivity } from '../content/model.js';
import { escapeAttr } from '../helpers.js';
import { hashFor } from '../router.js';
import { activityTitle, titleHeLine, levelBadge, sourceRef } from './labels.js';
import { exerciseFor } from '../exercises/index.js';
import { RENDERERS } from '../exercises/engine.js';
import { ins, ui, bi } from './bilingual.js';

/* ---------- Learn the Words ---------- */
function renderFlashcards(part, act){
  const words = wordsForActivity(part, act);
  if(A.fIdx === undefined) A.fIdx = 0;
  const w = words[A.fIdx];
  return `
  <p class="exHint">${ins('flashcards')}</p>
  <div class="flash">
    <div class="word">${w.en} <button class="speaker" data-action="speak" data-text="${escapeAttr(w.en)}">🔊</button></div>
    ${w.he ? `<div class="he">${w.he}</div>` : '<div class="he missingHe">— Hebrew not recorded yet —</div>'}
    ${w.definition ? `<div class="explain">${w.definition}</div>` : ''}
    ${w.example ? `<div class="example">"${w.example}"</div>` : ''}
    <div class="wordSrc">📘 Book p.${w.source.page}</div>
  </div>
  <div class="flashNav">
    <button class="pill outline" data-action="flashPrev" ${A.fIdx === 0 ? 'disabled' : ''}>← Previous</button>
    <div class="count">Word ${A.fIdx + 1} of ${words.length}</div>
    <button class="pill outline" data-action="flashNext" ${A.fIdx === words.length - 1 ? 'disabled' : ''}>Next →</button>
  </div>
  <div class="navRowR">
    <button class="pill biBtn" style="background:var(--blue)" data-action="finishActivity">${ui('complete')}</button>
  </div>`;
}

/* ---------- Write the Words ---------- */
function renderWriteTheWords(part, act){
  const words = wordsForActivity(part, act).filter(w => w.he);
  if(A.wIdx === undefined){ A.wIdx = 0; A.wChecked = false; A.wValue = ''; }
  if(A.wIdx >= words.length){
    return `<div class="matchDone">🎉 ${bi('Well done!', 'כל הכבוד!')}</div>
      <div class="navRowR">
        <button class="pill outline biBtn" data-action="wRestart">${ui('again')}</button>
        <button class="pill biBtn" style="background:var(--blue)" data-action="finishActivity">${ui('complete')}</button>
      </div>`;
  }
  const w = words[A.wIdx];
  const correct = A.wChecked && A.wValue.trim().toLowerCase() === w.en.toLowerCase();
  return `
  <p class="exHint">${ins('writeWords')}</p>
  <div class="qWrap">
    <div class="qCounter">Word ${A.wIdx + 1} of ${words.length}</div>
    <div class="hePrompt" dir="rtl">${w.he}</div>
    <input type="text" class="freeText wordInput" data-action="wInput" dir="ltr"
           value="${escapeAttr(A.wValue)}" placeholder="Write the word in English..." />
    ${A.wChecked ? (correct
      ? `<div class="feedbackMsg good">✓ ${bi('Correct!', 'נכון!')}</div>`
      : `<div class="feedbackMsg bad">${bi('The word is:', 'המילה היא:')} <b>${w.en}</b></div>`) : ''}
  </div>
  <div class="navRowR">
    ${A.wChecked
      ? `<button class="pill biBtn" style="background:var(--ink)" data-action="wNext">${ui(A.wIdx === words.length - 1 ? 'finish' : 'next')}</button>`
      : `<button class="pill biBtn" style="background:var(--blue)" data-action="wCheck">${ui('check')}</button>`}
  </div>`;
}

const LOCAL = {
  'flashcards': renderFlashcards,
  'write-the-words': renderWriteTheWords
};

/* The book's own instruction for this exercise, when the content model carries
   one. It sits above the renderer's mechanical hint, which says how to work the
   controls rather than what the task is. */
function taskLine(act){
  const t = act.instruction;
  return t ? `<p class="exHint actTask">${bi(t[0], t[1])}</p>` : '';
}

/* Some printed exercises depend on a picture we do not have. Where the task
   still works from a description, the description says so plainly rather than
   pretending the picture is there. */
function scene(act){
  const s = act.scene;
  return s ? `<p class="exHint sub scene">🖼️ ${bi(s[0], s[1])}</p>` : '';
}

/* An exercise that has a picture of its own shows it before the instruction,
   because the instruction is about the picture. The alt text carries the same
   description a scene paragraph would have, for anyone not seeing it. */
function sceneImage(act){
  const img = act.image;
  if(!img || !img.file) return '';
  return `
  <figure class="sceneFig">
    <img src="assets/img/${img.file}" alt="${escapeAttr(img.alt || '')}" loading="lazy">
  </figure>`;
}

/* A text the student reads before writing — the book's model paragraph. */
function passage(act){
  const p = act.passage;
  if(!p || !p.length) return '';
  return `<div class="passage">${p.map(line => `<p>${line}</p>`).join('')}</div>`;
}

function renderActivity(){
  const section = getSection(S.sectionId);
  const part = getPart(S.sectionId, S.partId);
  const act = getActivity(S.sectionId, S.partId, S.activityId);
  if(!section || !part || !act) return '';
  const ex = exerciseFor(act);
  const engine = act.render ? RENDERERS[act.render] : null;
  const fn = LOCAL[act.type];
  let body;
  if(engine && (act.items || []).length) body = engine.render(act.items, part, act);
  else if(ex) body = ex.render(wordsForActivity(part, act), part);
  else if(fn) body = fn(part, act);
  else body = '';
  const done = isDone(section.id, part.id, act.id);
  const upHref = part.id
    ? hashFor({ view:'part', sectionId:section.id, partId:part.id })
    : hashFor({ view:'section', sectionId:section.id });
  return `
  <div class="card">
    <div class="actHeadRow">
      <div class="actHeadText">
        <h2>${activityTitle(act)}</h2>
        ${titleHeLine(act)}
      </div>
      ${levelBadge(act.level)}${done ? '<span class="doneFlag">✓ Done</span>' : ''}
    </div>
    ${sourceRef(act)}
    ${sceneImage(act)}${taskLine(act)}${scene(act)}${passage(act)}
    ${body}
  </div>
  <div class="stepNav"><a class="stepLink prev" href="${upHref}">← Back to ${part.title}</a></div>`;
}

export { renderActivity };
