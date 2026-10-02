/* Reading, writing and recall renderers.

   The reading one walks a text in small steps rather than dropping a worksheet
   on the page: meet the words, guess, read a little, check, and only then
   answer. Each step is its own screen, so a short text stays short. */

import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';
import { bi, ui } from '../views/bilingual.js';
import { correctRow, retryRow, hintRow, revealRow, finishBlock, HINT_AT, REVEAL_AT } from './feedback.js';

const KIND_LABEL = {
  words:    ['Before you read', 'לפני הקריאה'],
  predict:  ['What do you think?', 'מה אתם חושבים?'],
  text:     ['Read', 'קראו'],
  check:    ['Did you understand?', 'הבנתם?'],
  truefalse:['True or false?', 'נכון או לא נכון?'],
  wh:       ['Answer the question', 'ענו על השאלה'],
  evidence: ['Find it in the text', 'מצאו בטקסט'],
  write:    ['Now you write', 'עכשיו אתם כותבים']
};

function dots(i, total){
  return `<div class="stepDots" aria-label="Step ${i + 1} of ${total}">${
    Array.from({ length: total }, (_, k) =>
      `<span class="stepDot${k < i ? ' past' : k === i ? ' now' : ''}"></span>`).join('')
  }</div>`;
}

/* The passage, kept visible from the moment it is first read. */
function passage(chunks, upto){
  return `<div class="passage">${chunks.slice(0, upto + 1)
    .map(c => `<p>${c}</p>`).join('')}</div>`;
}

const reading = {
  render(items, part, act){
    const steps = act.steps || [];
    if(A.rIdx === undefined){
      A.rIdx = 0; A.picked = null; A.tries = 0;
      A.solved = false; A.revealed = false; A.wrong = false;
      A.answers = {};
      A.readUpto = 0;
    }
    if(A.rIdx >= steps.length){
      return finishBlock(steps.length, steps.length, bi('You finished the text!', 'סיימתם את הטקסט!')) +
        `<div class="navRowR">
          <button class="pill outline biBtn" data-action="ex" data-do="rRestart">${ui('again')}</button>
          <button class="pill biBtn" style="background:var(--indigo)" data-action="finishActivity">${ui('complete')}</button>
        </div>`;
    }
    const st = steps[A.rIdx];
    const label = KIND_LABEL[st.kind] || ['', ''];
    const head = `
      ${dots(A.rIdx, steps.length)}
      <p class="readKind">${bi(label[0], label[1])}</p>`;

    /* ---- meet the words ---- */
    if(st.kind === 'words'){
      return head + `
        <div class="preteach">${st.words.map(w => `
          <div class="preteachRow">
            <span class="ptEn">${w.en}</span>
            <button class="speaker" data-action="speak" data-text="${escapeAttr(w.en)}">🔊</button>
            <span class="ptHe" dir="rtl">${w.he}</span>
          </div>`).join('')}</div>
        ${nextBtn(steps)}`;
    }

    /* ---- the text itself ---- */
    if(st.kind === 'text'){
      /* Remember how far the student has read, so the questions that follow
         never show a paragraph they have not reached yet. */
      A.readUpto = st.upto;
      return head + passage(act.chunks || [], st.upto) + nextBtn(steps);
    }

    /* ---- write your own ---- */
    if(st.kind === 'write'){
      if(A.answers[A.rIdx] === undefined) A.answers[A.rIdx] = '';
      return head + (act.keepText ? passage(act.chunks || [], 99) : '') + `
        <p class="prompt">${st.p}</p>
        <textarea class="freeText" style="min-height:110px" data-action="rWrite"
          placeholder="Write here...">${escapeAttr(A.answers[A.rIdx])}</textarea>
        ${nextBtn(steps)}`;
    }

    /* ---- every asking step: predict, check, true/false, wh, evidence ---- */
    const opts = st.o.map(o => {
      let cls = 'opt';
      if(A.solved){ cls += (o === st.a) ? ' correct' : ' dim'; }
      else if(A.revealed){
        if(o === st.a) cls += ' correct';
        else if(A.picked === o) cls += ' incorrect';
        else cls += ' dim';
      } else if(A.missed && A.missed.includes(o)) cls += ' incorrect';
      else if(A.picked === o) cls += ' selected';
      if(A.hinted && A.hinted.includes(o)) cls += ' dim';
      return `<button class="${cls}" data-action="ex" data-do="rPick"
        data-val="${escapeAttr(o)}" ${(A.solved || A.revealed) ? 'data-locked="1"' : ''}>${o}</button>`;
    }).join('');

    /* A question shows the text as far as it has been read — never further.
       A prediction step shows none of it. */
    const showText = st.kind !== 'predict' && st.showText !== false;
    const upto = st.upto !== undefined ? st.upto
      : (A.readUpto !== undefined ? A.readUpto : 99);
    return head +
      (showText ? passage(act.chunks || [], upto) : '') + `
      <div class="qWrap">
        <div class="prompt">${st.p}</div>
        <div class="opts">${opts}</div>
        ${A.solved ? correctRow(st.praise ? bi(st.praise[0], st.praise[1]) : null)
          : A.revealed ? revealRow(st.a)
          : A.wrong ? retryRow() : ''}
        ${(!A.solved && !A.revealed && A.tries >= HINT_AT && st.hint)
          ? hintRow(bi(st.hint[0], st.hint[1])) : ''}
      </div>
      <div class="navRowR">
        ${(A.solved || A.revealed)
          ? `<button class="pill biBtn" style="background:var(--navy)" data-action="ex" data-do="rNext">${ui(A.rIdx === steps.length - 1 ? 'finish' : 'next')}</button>`
          : `<button class="pill biBtn" style="background:var(--indigo)" data-action="ex" data-do="rCheck" ${A.picked ? '' : 'disabled'}>${ui('check')}</button>`}
      </div>`;
  },

  handle(doWhat, t, items, rerender){
    if(doWhat === 'rRestart'){ delete A.rIdx; return true; }
    if(doWhat === 'rPick'){
      if(A.solved || A.revealed) return true;
      A.picked = t.dataset.val; A.wrong = false; return true;
    }
    if(doWhat === 'rCheck'){
      const st = (A.steps = A.steps) || null;
      A.tries++;
      const step = currentStep();
      if(!step) return true;
      if(A.picked === step.a){ A.solved = true; A.wrong = false; }
      else {
        A.missed = (A.missed || []).concat(A.picked);
        A.picked = null; A.wrong = true;
        if(A.tries >= REVEAL_AT) A.revealed = true;
      }
      return true;
    }
    if(doWhat === 'rNext'){
      A.rIdx++; A.picked = null; A.tries = 0;
      A.solved = false; A.revealed = false; A.wrong = false;
      A.missed = []; A.hinted = null;
      return true;
    }
    return false;
  },

  input(act, t){
    if(act !== 'rWrite') return false;
    if(A.answers === undefined) A.answers = {};
    A.answers[A.rIdx] = t.value;
    return true;
  }
};

/* The reading renderer needs the step it is on while handling a click, and the
   activity is not passed to handle(); stash it when rendering. */
let CURRENT_STEPS = [];
function currentStep(){ return CURRENT_STEPS[A.rIdx] || null; }
const _origRender = reading.render;
reading.render = function(items, part, act){
  CURRENT_STEPS = act.steps || [];
  return _origRender.call(this, items, part, act);
};

function nextBtn(steps){
  return `<div class="navRowR">
    <button class="pill biBtn" style="background:var(--indigo)" data-action="ex" data-do="rNext">${
      ui(A.rIdx === steps.length - 1 ? 'finish' : 'next')}</button>
  </div>`;
}

/* ---------------------------------------------------------------- recall
   A word flashes up in Hebrew; the student says or types the English. Short,
   quick, and it comes round again at the end if it was missed. */
const recall = {
  render(items){
    if(A.rcQueue === undefined){
      A.rcQueue = shuffle(items.filter(w => w.he).map(w => ({ en: w.en, he: w.he })));
      A.rcDone = 0; A.rcTotal = A.rcQueue.length; A.rcFirst = 0;
      A.val = ''; A.tries = 0; A.solved = false; A.wrong = false; A.shown = false;
    }
    if(!A.rcQueue.length){
      return finishBlock(A.rcFirst, A.rcTotal) +
        `<div class="navRowR">
          <button class="pill outline biBtn" data-action="ex" data-do="rcRestart">${ui('again')}</button>
          <button class="pill biBtn" style="background:var(--indigo)" data-action="finishActivity">${ui('complete')}</button>
        </div>`;
    }
    const it = A.rcQueue[0];
    return `
      <p class="exHint">${bi('Say the word in English, then write it.', 'אמרו את המילה באנגלית, ואז כתבו אותה.')}</p>
      <div class="qWrap">
        <div class="qCounter">${A.rcDone} / ${A.rcTotal}</div>
        <div class="hePrompt" dir="rtl">${it.he}</div>
        <input type="text" class="freeText wordInput" data-action="exInput" dir="ltr"
               value="${escapeAttr(A.val)}" placeholder="..." />
        ${A.solved ? correctRow()
          : A.shown ? revealRow(it.en)
          : A.wrong ? retryRow() : ''}
        ${(!A.solved && !A.shown && A.tries >= HINT_AT)
          ? hintRow(bi('It starts with <b>' + it.en[0].toUpperCase() + '</b>.',
                       'מתחילה ב-<b>' + it.en[0].toUpperCase() + '</b>.')) : ''}
      </div>
      <div class="navRowR">
        ${(A.solved || A.shown)
          ? `<button class="pill biBtn" style="background:var(--navy)" data-action="ex" data-do="rcNext">${ui('next')}</button>`
          : `<button class="pill biBtn" style="background:var(--indigo)" data-action="ex" data-do="rcCheck">${ui('check')}</button>`}
      </div>`;
  },
  handle(doWhat){
    if(doWhat === 'rcRestart'){ delete A.rcQueue; return true; }
    if(doWhat === 'rcCheck'){
      A.tries++;
      const it = A.rcQueue[0];
      if(A.val.trim().toLowerCase() === it.en.toLowerCase()){
        A.solved = true; A.wrong = false;
        if(A.tries === 1) A.rcFirst++;
      } else {
        A.wrong = true;
        if(A.tries >= REVEAL_AT) A.shown = true;
      }
      return true;
    }
    if(doWhat === 'rcNext'){
      const it = A.rcQueue.shift();
      /* A word that needed the answer comes round again at the end. */
      if(A.shown) A.rcQueue.push(it); else A.rcDone++;
      A.val = ''; A.tries = 0; A.solved = false; A.wrong = false; A.shown = false;
      return true;
    }
    return false;
  },
  input(act, t){
    if(act !== 'exInput') return false;
    A.val = t.value; A.wrong = false; return true;
  }
};

export { reading, recall };
