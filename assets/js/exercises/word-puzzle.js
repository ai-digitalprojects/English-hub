import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';
import { bi, ui } from '../views/bilingual.js';

/* Word puzzle: the Hebrew is the clue, the letters are scrambled, and the
   student writes the English word. Both come from the book's word list. */
function scramble(word){
  const letters = word.replace(/[^A-Za-z]/g, '').split('');
  if(letters.length < 3) return null;
  const straight = letters.join('');
  let out = shuffle(letters).join('');
  for(let i = 0; i < 6 && out.toLowerCase() === straight.toLowerCase(); i++){
    out = shuffle(letters).join('');
  }
  return out;
}

export default {
  id: 'word-puzzle',
  title: 'Word Puzzle',
  level: 2,
  skill: 'vocabulary',
  needs: words => words.filter(w => w.he && scramble(w.en)).length >= 4,
  why: 'Needs Hebrew for at least four of these words.',

  render(words){
    if(A.pItems === undefined){
      A.pItems = shuffle(words.filter(w => w.he && scramble(w.en)))
        .map(w => ({ en: w.en, he: w.he, mix: scramble(w.en), page: w.source.page }));
      A.pIdx = 0; A.pValue = ''; A.pChecked = false; A.pScore = 0;
    }
    if(A.pIdx >= A.pItems.length){
      return `<div class="matchDone">🎉 ${bi('Well done!', 'כל הכבוד!')} <b>${A.pScore} / ${A.pItems.length}</b></div>
        <div class="navRowR">
          <button class="pill outline biBtn" data-action="ex" data-do="pRestart">${ui('again')}</button>
          <button class="pill biBtn" style="background:var(--blue)" data-action="finishActivity">${ui('complete')}</button>
        </div>`;
    }
    const it = A.pItems[A.pIdx];
    const right = A.pChecked && A.pValue.trim().toLowerCase() === it.en.toLowerCase();
    return `
      <p class="exHint">${bi('Unscramble the word.', 'סדרו את האותיות למילה.')}</p>
      <div class="qWrap">
        <div class="qCounter">Puzzle ${A.pIdx + 1} of ${A.pItems.length}</div>
        <div class="scrambled">${it.mix.split('').map(c => `<span class="letter">${c}</span>`).join('')}</div>
        <div class="hePrompt" dir="rtl">${it.he}</div>
        <input type="text" class="freeText wordInput" data-action="pInput" dir="ltr"
               value="${escapeAttr(A.pValue)}" placeholder="Unscramble the word..." />
        ${A.pChecked ? (right
          ? `<div class="feedbackMsg good">✓ ${bi('Correct!', 'נכון!')}</div>`
          : `<div class="feedbackMsg bad">${bi('The word is:', 'המילה היא:')} <b>${it.en}</b></div>`) : ''}
      </div>
      <div class="navRowR">
        ${A.pChecked
          ? `<button class="pill biBtn" style="background:var(--ink)" data-action="ex" data-do="pNext">${ui(A.pIdx === A.pItems.length - 1 ? 'finish' : 'next')}</button>`
          : `<button class="pill biBtn" style="background:var(--blue)" data-action="ex" data-do="pCheck">${ui('check')}</button>`}
      </div>`;
  },

  handle(doWhat){
    if(doWhat === 'pRestart'){ delete A.pItems; return true; }
    if(doWhat === 'pCheck'){
      A.pChecked = true;
      if(A.pValue.trim().toLowerCase() === A.pItems[A.pIdx].en.toLowerCase()) A.pScore++;
      return true;
    }
    if(doWhat === 'pNext'){ A.pIdx++; A.pValue = ''; A.pChecked = false; return true; }
    return false;
  },

  input(act, t){
    if(act !== 'pInput') return false;
    A.pValue = t.value;
    return true;
  }
};
