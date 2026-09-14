import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';

/* Complete the sentence. Every sentence is the book's own example sentence for
   that word, with the word itself blanked out. */
/* Blank out the target word by walking the tokens, so no pattern has to be
   built from the word itself. Returns null when the word does not appear —
   those words are simply left out of the exercise. */
function blankOut(example, word){
  const target = word.toLowerCase();
  let hit = false;
  const out = example.split(/(\W+)/).map(tok => {
    if(!hit && tok.toLowerCase() === target){ hit = true; return '______'; }
    return tok;
  }).join('');
  return hit ? out : null;
}

export default {
  id: 'complete-sentence',
  title: 'Complete the Sentences',
  level: 2,
  skill: 'vocabulary',
  needs: words => words.filter(w => w.example && blankOut(w.example, w.en)).length >= 3,
  why: 'Needs example sentences, which are recorded for only some words.',

  render(words){
    if(A.sQs === undefined){
      const usable = words.filter(w => w.example && blankOut(w.example, w.en));
      A.sQs = shuffle(usable).map(w => {
        const others = shuffle(usable.filter(o => o.en !== w.en)).slice(0, 2).map(o => o.en);
        return { text: blankOut(w.example, w.en), a: w.en, o: shuffle([w.en].concat(others)), page: w.source.page };
      });
      A.sIdx = 0; A.sPicked = null; A.sScore = 0;
    }
    if(A.sIdx >= A.sQs.length){
      return `<div class="matchDone">🎉 ${A.sScore} of ${A.sQs.length} correct.</div>
        <div class="navRowR">
          <button class="pill outline" data-action="ex" data-do="sRestart">Try again</button>
          <button class="pill" style="background:var(--blue)" data-action="finishActivity">Mark Complete</button>
        </div>`;
    }
    const q = A.sQs[A.sIdx];
    const answered = A.sPicked !== null;
    return `
      <div class="qWrap">
        <div class="qCounter">Sentence ${A.sIdx + 1} of ${A.sQs.length}</div>
        <div class="prompt">${q.text}</div>
        <div class="opts">${q.o.map(o => {
          let cls = 'opt';
          if(answered){
            if(o === q.a) cls += ' correct';
            else if(o === A.sPicked) cls += ' incorrect';
            else cls += ' dim';
          }
          return `<button class="${cls}" data-action="ex" data-do="sPick"
            data-val="${escapeAttr(o)}" ${answered ? 'data-locked="1"' : ''}>${o}</button>`;
        }).join('')}</div>
        ${answered ? (A.sPicked === q.a
          ? '<div class="feedbackMsg good">✓ Correct!</div>'
          : `<div class="feedbackMsg bad">The word is: ${q.a}</div>`) : ''}
      </div>
      <div class="navRowR">
        <button class="pill" style="background:var(--ink)" data-action="ex" data-do="sNext"
          ${answered ? '' : 'disabled'}>${A.sIdx === A.sQs.length - 1 ? 'Finish' : 'Next →'}</button>
      </div>`;
  },

  handle(doWhat, t){
    if(doWhat === 'sRestart'){ delete A.sQs; return true; }
    if(doWhat === 'sPick'){
      if(t.hasAttribute('data-locked')) return true;
      A.sPicked = t.dataset.val;
      if(A.sPicked === A.sQs[A.sIdx].a) A.sScore++;
      return true;
    }
    if(doWhat === 'sNext'){ A.sIdx++; A.sPicked = null; return true; }
    return false;
  }
};
