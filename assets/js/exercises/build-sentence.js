import { A } from '../state.js';
import { shuffle } from '../helpers.js';
import { bi, ui } from '../views/bilingual.js';

/* Put the words in order. Each sentence is the book's own example sentence for
   one of this part's words, scrambled. */
const clean = s => s.replace(/[".]/g, '').trim();

export default {
  id: 'build-sentence',
  title: 'Build a Sentence',
  level: 3,
  skill: 'writing',
  needs: words => words.filter(w => w.example && clean(w.example).split(/\s+/).length >= 4).length >= 2,
  why: 'Needs example sentences, which are recorded for only some words.',

  render(words){
    if(A.bItems === undefined){
      A.bItems = shuffle(words.filter(w => w.example && clean(w.example).split(/\s+/).length >= 4))
        .slice(0, 6)
        .map(w => ({ words: clean(w.example).split(/\s+/), page: w.source.page }));
      A.bIdx = 0; A.bChosen = []; A.bPool = shuffle(A.bItems[0].words.slice()); A.bResult = null;
    }
    if(A.bIdx >= A.bItems.length){
      return `<div class="matchDone">🎉 ${bi('Well done!', 'כל הכבוד!')}</div>
        <div class="navRowR">
          <button class="pill outline biBtn" data-action="ex" data-do="bRestart">${ui('again')}</button>
          <button class="pill biBtn" style="background:var(--blue)" data-action="finishActivity">${ui('complete')}</button>
        </div>`;
    }
    return `
      <p class="exHint">${bi('Build the sentence.', 'בנו את המשפט.')}</p>
      <div class="qCounter">Sentence ${A.bIdx + 1} of ${A.bItems.length}</div>
      <div class="answerStrip">
        ${A.bChosen.length === 0 ? '<span class="stripHint">Tap the words below in the right order</span>' : ''}
        ${A.bChosen.map((w, i) => `<button class="chip" data-action="ex" data-do="bRemove" data-idx="${i}">${w}</button>`).join('')}
      </div>
      <div class="poolRow">
        ${A.bPool.map((w, i) => `<button class="chip pool" data-action="ex" data-do="bAdd" data-idx="${i}">${w}</button>`).join('')}
      </div>
      ${A.bResult === 'correct' ? `<div class="feedbackMsg good">✓ ${bi('That is the sentence!', 'זה המשפט!')}</div>` : ''}
      ${A.bResult === 'incorrect' ? `<div class="feedbackMsg bad">${bi('Check the word order and try again.', 'בדקו את סדר המילים ונסו שוב.')}</div>` : ''}
      <div class="navRowR">
        <button class="pill outline biBtn" data-action="ex" data-do="bClear">${ui('clear')}</button>
        <button class="pill biBtn" style="background:var(--purple)" data-action="ex" data-do="bCheck"
          ${A.bPool.length ? 'disabled' : ''}>${ui('check')}</button>
        ${A.bResult === 'correct'
          ? `<button class="pill biBtn" style="background:var(--ink)" data-action="ex" data-do="bNext">${ui(A.bIdx === A.bItems.length - 1 ? 'finish' : 'next')}</button>`
          : ''}
      </div>`;
  },

  handle(doWhat, t){
    const start = i => { A.bChosen = []; A.bPool = shuffle(A.bItems[i].words.slice()); A.bResult = null; };
    if(doWhat === 'bRestart'){ delete A.bItems; return true; }
    if(doWhat === 'bAdd'){ const i = +t.dataset.idx; A.bChosen.push(A.bPool[i]); A.bPool.splice(i,1); A.bResult = null; return true; }
    if(doWhat === 'bRemove'){ const i = +t.dataset.idx; A.bPool.push(A.bChosen[i]); A.bChosen.splice(i,1); A.bResult = null; return true; }
    if(doWhat === 'bClear'){ A.bPool = A.bPool.concat(A.bChosen); A.bChosen = []; A.bResult = null; return true; }
    if(doWhat === 'bCheck'){
      const built = A.bChosen.join(' ').toLowerCase();
      A.bResult = built === A.bItems[A.bIdx].words.join(' ').toLowerCase() ? 'correct' : 'incorrect';
      return true;
    }
    if(doWhat === 'bNext'){ A.bIdx++; if(A.bIdx < A.bItems.length) start(A.bIdx); return true; }
    return false;
  }
};
