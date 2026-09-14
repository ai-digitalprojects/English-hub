import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';

/* Sort the words back into the groups the book prints them in — Word Power 1
   and 2, or New Words 1 and 2. The groups come from the model, not from us. */
const GROUP_NAMES = {
  'word-power-1': 'Word Power 1',
  'word-power-2': 'Word Power 2',
  'new-words': 'New Words',
  'new-words-1': 'New Words 1',
  'new-words-2': 'New Words 2'
};

function groupsOf(words){
  const seen = [];
  words.forEach(w => { if(w.group && seen.indexOf(w.group) < 0) seen.push(w.group); });
  return seen;
}

export default {
  id: 'sort-groups',
  title: 'Sort the Words',
  level: 2,
  skill: 'vocabulary',
  needs: words => groupsOf(words).length >= 2,
  why: 'This part has only one word group, so there is nothing to sort.',

  render(words){
    const groups = groupsOf(words);
    if(A.gPool === undefined){
      A.gGroups = groups;
      A.gPool = shuffle(words.map(w => ({ en: w.en, group: w.group })));
      A.gBins = {};
      groups.forEach(g => { A.gBins[g] = []; });
      A.gSel = null; A.gWrong = null;
    }
    const left = A.gPool.length;
    if(left === 0){
      return `<div class="matchDone">🎉 Every word is in the right group.</div>
        <div class="navRowR">
          <button class="pill outline" data-action="ex" data-do="gRestart">Try again</button>
          <button class="pill" style="background:var(--blue)" data-action="finishActivity">Mark Complete</button>
        </div>`;
    }
    return `
      <p class="exHint">Tap a word, then tap the group it belongs to.</p>
      <div class="poolRow">${A.gPool.map((w, i) => `
        <button class="chip pool${A.gSel === i ? ' selected' : ''}${A.gWrong === i ? ' wrong' : ''}"
          data-action="ex" data-do="gPick" data-idx="${i}">${w.en}</button>`).join('')}</div>
      <div class="binRow">${A.gGroups.map(g => `
        <div class="bin" data-action="ex" data-do="gDrop" data-group="${escapeAttr(g)}">
          <div class="binHead">${GROUP_NAMES[g] || g}</div>
          <div class="binItems">${A.gBins[g].map(en => `<span class="chip done">${en}</span>`).join('')
            || '<span class="stripHint">empty</span>'}</div>
        </div>`).join('')}</div>
      <div class="pctLabel">${left} word${left === 1 ? '' : 's'} left</div>`;
  },

  handle(doWhat, t, words, rerender){
    if(doWhat === 'gRestart'){ delete A.gPool; return true; }
    if(doWhat === 'gPick'){
      const i = Number(t.dataset.idx);
      A.gSel = (A.gSel === i ? null : i);
      A.gWrong = null;
      return true;
    }
    if(doWhat === 'gDrop'){
      if(A.gSel === null) return true;
      const w = A.gPool[A.gSel], g = t.dataset.group;
      if(w.group === g){
        A.gBins[g].push(w.en);
        A.gPool.splice(A.gSel, 1);
        A.gSel = null; A.gWrong = null;
      } else {
        A.gWrong = A.gSel;
        setTimeout(() => { A.gWrong = null; rerender(); }, 500);
      }
      return true;
    }
    return false;
  }
};
