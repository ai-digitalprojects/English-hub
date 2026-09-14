import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';

/* ---- Flashcards ---- */
function renderFlashcards(unit){
  if(A.fIdx===undefined) A.fIdx = 0;
  const item = unit.vocab[A.fIdx];
  const [en, he, explain, example] = item;
  return `
  <div class="flash">
    <div class="word">${en} <button class="speaker" data-action="speak" data-text="${en}">🔊</button></div>
    <div class="he">${he}</div>
    <div class="explain">${explain}</div>
    <div class="example">"${example}"</div>
  </div>
  <div class="flashNav">
    <button class="pill outline" data-action="flashPrev" ${A.fIdx===0?'disabled':''}>← Previous Word</button>
    <div class="count">Word ${A.fIdx+1} of ${unit.vocab.length}</div>
    <button class="pill outline" data-action="flashNext" ${A.fIdx===unit.vocab.length-1?'disabled':''}>Next Word →</button>
  </div>
  <div class="navRowR">
    <button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="learnWords" data-goto="vocabPractice">Practice the Words →</button>
  </div>`;
}

/* ---- Generic MC list (used by practiceQ, classroom situational, grammar practice) ---- */
function renderMCSequence(list, opts){
  opts = opts || {};
  if(A.mcIdx===undefined){ A.mcIdx=0; A.mcScore=0; A.mcSelected=null; A.mcAttempts=0; A.mcDone=false; }
  if(A.mcDone){
    return `<div class="matchDone">🎉 Nice work! You completed all ${list.length} questions.</div>
      <div class="navRowR"><button class="pill outline" data-action="mcRestart">Do it again</button>
      <button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="${opts.completeKey}" data-goto="${opts.goto||''}">${opts.finishLabel||'Done'}</button></div>`;
  }
  const q = list[A.mcIdx];
  const answered = A.mcSelected!==null;
  let fb = '';
  if(answered){
    if(A.mcSelected===q.a) fb = `<div class="feedbackMsg good">✓ Great job!</div>`;
    else if(A.mcAttempts>=2) fb = `<div class="feedbackMsg bad">The correct answer is: ${q.a}</div>`;
    else fb = `<div class="feedbackMsg bad">Try again.</div>`;
  }
  const revealAnswer = answered && (A.mcSelected===q.a || A.mcAttempts>=2);
  return `
  <div class="qWrap">
    <div class="qCounter">Question ${A.mcIdx+1} of ${list.length}</div>
    <div class="prompt">${q.p}</div>
    <div class="opts">
      ${q.o.map(o=>{
        let cls='opt';
        if(revealAnswer){
          if(o===q.a) cls+=' correct';
          else if(o===A.mcSelected) cls+=' incorrect';
          else cls+=' dim';
        } else if(answered && o===A.mcSelected && o!==q.a){
          cls+=' incorrect';
        }
        const locked = revealAnswer ? 'data-locked="1"' : '';
        return `<button class="${cls}" ${locked} data-action="mcSelect" data-opt="${escapeAttr(o)}">${o}</button>`;
      }).join('')}
    </div>
    ${fb}
  </div>
  <div class="navRowR">
    <button class="pill" style="background:var(--ink)" data-action="mcNext" ${revealAnswer?'':'disabled'}>${A.mcIdx===list.length-1?'Finish':'Next →'}</button>
  </div>`;
}

/* ---- Vocabulary Practice (Match + Practice tabs) ---- */
function renderVocabPractice(unit){
  if(A.vpTab===undefined) A.vpTab='match';
  const tabs = `<div class="tabRow">
    <button class="subtab ${A.vpTab==='match'?'active':''}" data-action="setVpTab" data-tab="match">Match</button>
    <button class="subtab ${A.vpTab==='practice'?'active':''}" data-action="setVpTab" data-tab="practice">Choose &amp; Complete</button>
  </div>`;
  let body='';
  if(A.vpTab==='match'){
    body = renderMatch(unit.matchWords.map(w=>unit.vocab.find(v=>v[0]===w)).map(v=>[v[0],v[1]]), {onComplete:'vocabPractice'});
  } else {
    body = renderMCSequence(unit.practiceQ, {completeKey:'vocabPractice', finishLabel:'Mark Vocabulary Practice Complete'});
  }
  return tabs + body;
}

/* ---- Generic Match ---- */
function renderMatch(pairs, opts){
  if(A.mLeft===undefined){
    A.mLeft = shuffle(pairs.map(p=>p[0]));
    A.mRight = shuffle(pairs.map(p=>p[1]));
    A.mMatched = []; A.mSelLeft=null; A.mSelRight=null; A.mWrong=null;
    A.mPairs = pairs;
  }
  if(A.mMatched.length===pairs.length){
    return `<div class="matchDone">🎉 Great work! You matched all the words correctly.</div>
      <div class="navRowR"><button class="pill outline" data-action="matchRestart">Shuffle again</button>
      <button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="${opts.onComplete}" data-goto="">Mark Complete</button></div>`;
  }
  return `
  <div class="matchGrid">
    <div class="matchCol">
      ${A.mLeft.map(w=>{
        const matched = A.mMatched.includes(w);
        const sel = A.mSelLeft===w;
        let cls='matchItem'+(matched?' matched':'')+(sel?' selected':'')+(A.mWrong==='L:'+w?' wrong':'');
        return `<button class="${cls}" data-action="matchPick" data-side="L" data-val="${escapeAttr(w)}" ${matched?'disabled':''}>${w}</button>`;
      }).join('')}
    </div>
    <div class="matchCol">
      ${A.mRight.map(w=>{
        const matched = A.mMatched.some(l=>A.mPairs.find(p=>p[0]===l)[1]===w);
        const sel = A.mSelRight===w;
        let cls='matchItem'+(matched?' matched':'')+(sel?' selected':'')+(A.mWrong==='R:'+w?' wrong':'');
        return `<button class="${cls}" data-action="matchPick" data-side="R" data-val="${escapeAttr(w)}" ${matched?'disabled':''}>${w}</button>`;
      }).join('')}
    </div>
  </div>`;
}

/* ---- Classroom English (match + situational MC) ---- */
function renderClassroomEnglish(unit){
  if(A.ceTab===undefined) A.ceTab='match';
  const tabs = `<div class="tabRow">
    <button class="subtab ${A.ceTab==='match'?'active':''}" data-action="setCeTab" data-tab="match">Match</button>
    <button class="subtab ${A.ceTab==='situations'?'active':''}" data-action="setCeTab" data-tab="situations">What Should They Say?</button>
  </div>`;
  let body='';
  if(A.ceTab==='match') body = renderMatch(unit.classroom.pairs, {onComplete:'classroomEnglish'});
  else body = renderMCSequence(unit.classroom.situational, {completeKey:'classroomEnglish', finishLabel:'Mark Classroom English Complete'});
  return tabs+body;
}

export { renderFlashcards, renderMCSequence, renderVocabPractice, renderMatch, renderClassroomEnglish };
