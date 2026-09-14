import { A } from '../state.js';
import { escapeAttr } from '../helpers.js';

/* Open-ended writing. The word chips are this part's real vocabulary; the text
   is kept as a draft, and writing something never marks the activity complete. */
export default {
  id: 'free-writing',
  title: 'Write It Yourself',
  level: 3,
  skill: 'writing',
  needs: words => words.length >= 3,
  why: 'Needs at least three words in this part.',

  render(words, part){
    if(A.wrText === undefined) A.wrText = '';
    const wc = A.wrText.trim() ? A.wrText.trim().split(/\s+/).length : 0;
    const target = (part && part.title) ? part.title : 'this part';
    return `
      <p class="exHint">Write four or five sentences using words from <b>${target}</b>. Tap a word to add it.</p>
      <div class="poolRow">${words.slice(0, 14).map((w, i) =>
        `<button class="chip pool" data-action="ex" data-do="frWord" data-idx="${i}">${w.en}</button>`).join('')}</div>
      <textarea class="freeText" style="min-height:150px" data-action="frInput"
        placeholder="Start writing here...">${escapeAttr(A.wrText)}</textarea>
      <div class="wordCounter">${wc} words</div>
      <div class="navRowR">
        <button class="pill" style="background:var(--blue)" data-action="finishActivity">Mark Complete</button>
      </div>`;
  },

  handle(doWhat, t, words){
    if(doWhat !== 'frWord') return false;
    const w = words[Number(t.dataset.idx)];
    A.wrText = (A.wrText ? A.wrText.replace(/\s*$/, '') + ' ' : '') + w.en;
    return true;
  },

  input(act, t){
    if(act !== 'frInput') return false;
    A.wrText = t.value;
    return true;
  }
};
