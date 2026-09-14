import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';

/* Choose the correct meaning. The wrong options are other words from this same
   part, so every option on screen is a real word from the book. */
export default {
  id: 'choose-meaning',
  title: 'Choose the Correct Meaning',
  level: 1,
  skill: 'vocabulary',
  needs: words => words.filter(w => w.he).length >= 4,
  why: 'Needs Hebrew for at least four of these words.',

  render(words){
    const pool = words.filter(w => w.he);
    if(A.cQs === undefined){
      A.cQs = shuffle(pool).map(w => {
        const others = shuffle(pool.filter(o => o.he !== w.he)).slice(0, 2).map(o => o.he);
        return { en: w.en, a: w.he, o: shuffle([w.he].concat(others)), page: w.source.page };
      });
      A.cIdx = 0; A.cPicked = null; A.cScore = 0;
    }
    if(A.cIdx >= A.cQs.length){
      return `<div class="matchDone">🎉 ${A.cScore} of ${A.cQs.length} correct.</div>
        <div class="navRowR">
          <button class="pill outline" data-action="ex" data-do="cRestart">Try again</button>
          <button class="pill" style="background:var(--blue)" data-action="finishActivity">Mark Complete</button>
        </div>`;
    }
    const q = A.cQs[A.cIdx];
    const answered = A.cPicked !== null;
    return `
      <div class="qWrap">
        <div class="qCounter">Word ${A.cIdx + 1} of ${A.cQs.length}</div>
        <div class="prompt bigWord">${q.en}</div>
        <div class="opts">${q.o.map(o => {
          let cls = 'opt he';
          if(answered){
            if(o === q.a) cls += ' correct';
            else if(o === A.cPicked) cls += ' incorrect';
            else cls += ' dim';
          }
          return `<button class="${cls}" dir="rtl" data-action="ex" data-do="cPick"
            data-val="${escapeAttr(o)}" ${answered ? 'data-locked="1"' : ''}>${o}</button>`;
        }).join('')}</div>
        ${answered ? (A.cPicked === q.a
          ? '<div class="feedbackMsg good">✓ Correct!</div>'
          : `<div class="feedbackMsg bad">The meaning is: ${q.a}</div>`) : ''}
      </div>
      <div class="navRowR">
        <button class="pill" style="background:var(--ink)" data-action="ex" data-do="cNext"
          ${answered ? '' : 'disabled'}>${A.cIdx === A.cQs.length - 1 ? 'Finish' : 'Next →'}</button>
      </div>`;
  },

  handle(doWhat, t){
    if(doWhat === 'cRestart'){ delete A.cQs; return true; }
    if(doWhat === 'cPick'){
      if(t.hasAttribute('data-locked')) return true;
      A.cPicked = t.dataset.val;
      if(A.cPicked === A.cQs[A.cIdx].a) A.cScore++;
      return true;
    }
    if(doWhat === 'cNext'){ A.cIdx++; A.cPicked = null; return true; }
    return false;
  }
};
