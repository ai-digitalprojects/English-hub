import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';

/* Match each English word to its Hebrew. Pairs come straight from the book's
   own word list — nothing is generated but the order. */
export default {
  id: 'match-words',
  title: 'Match the Words',
  level: 1,
  skill: 'vocabulary',
  needs: words => words.filter(w => w.he).length >= 4,
  why: 'Needs Hebrew for at least four of these words.',

  render(words){
    const pairs = words.filter(w => w.he).map(w => [w.en, w.he]);
    if(A.mPairs === undefined){
      A.mPairs = pairs;
      A.mLeft = shuffle(pairs.map(p => p[0]));
      A.mRight = shuffle(pairs.map(p => p[1]));
      A.mMatched = []; A.mSelLeft = null; A.mSelRight = null; A.mWrong = null;
    }
    if(A.mMatched.length === A.mPairs.length){
      return `<div class="matchDone">🎉 You matched all ${A.mPairs.length} words.</div>
        <div class="navRowR">
          <button class="pill outline" data-action="ex" data-do="matchRestart">Shuffle again</button>
          <button class="pill" style="background:var(--blue)" data-action="finishActivity">Mark Complete</button>
        </div>`;
    }
    const col = (list, side) => list.map(v => {
      const matched = side === 'L'
        ? A.mMatched.includes(v)
        : A.mMatched.some(l => A.mPairs.find(p => p[0] === l)[1] === v);
      const sel = (side === 'L' ? A.mSelLeft : A.mSelRight) === v;
      const cls = 'matchItem' + (matched ? ' matched' : '') + (sel ? ' selected' : '')
                + (A.mWrong === side + ':' + v ? ' wrong' : '');
      return `<button class="${cls}" data-action="ex" data-do="matchPick" data-side="${side}"
        data-val="${escapeAttr(v)}" ${matched ? 'disabled' : ''}>${v}</button>`;
    }).join('');
    return `<p class="exHint">Tap an English word, then its meaning.</p>
      <div class="matchGrid">
        <div class="matchCol">${col(A.mLeft, 'L')}</div>
        <div class="matchCol">${col(A.mRight, 'R')}</div>
      </div>
      <div class="pctLabel">${A.mMatched.length} of ${A.mPairs.length} matched</div>`;
  },

  handle(doWhat, t, words, rerender){
    if(doWhat === 'matchRestart'){ delete A.mPairs; return true; }
    if(doWhat !== 'matchPick') return false;
    const side = t.dataset.side, val = t.dataset.val;
    if(side === 'L') A.mSelLeft = (A.mSelLeft === val ? null : val);
    else A.mSelRight = (A.mSelRight === val ? null : val);
    if(A.mSelLeft && A.mSelRight){
      const pair = A.mPairs.find(p => p[0] === A.mSelLeft);
      if(pair && pair[1] === A.mSelRight){ A.mMatched.push(A.mSelLeft); A.mWrong = null; }
      else {
        A.mWrong = 'L:' + A.mSelLeft;
        setTimeout(() => { A.mWrong = null; rerender(); }, 500);
      }
      A.mSelLeft = null; A.mSelRight = null;
    }
    return true;
  }
};
