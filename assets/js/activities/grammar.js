import { A } from '../state.js';
import { shuffle, escapeAttr } from '../helpers.js';
import { renderMCSequence } from './vocabulary.js';

/* ---- Sentence Builder ---- */
function renderSentenceBuilder(unit){
  if(A.sbIdx===undefined){ A.sbIdx=0; A.sbChosen=[]; A.sbPool=shuffle(unit.sentenceBuilder.items[0].words.slice()); A.sbResult=null; A.sbFreeText=''; }
  if(A.sbIdx < unit.sentenceBuilder.items.length){
    const item = unit.sentenceBuilder.items[A.sbIdx];
    return `
    <div class="qCounter">Sentence ${A.sbIdx+1} of ${unit.sentenceBuilder.items.length}</div>
    <div class="answerStrip">
      ${A.sbChosen.length===0?'<span style="color:var(--ink-soft);font-size:0.85rem;">Click the words below in the right order</span>':''}
      ${A.sbChosen.map((w,i)=>`<button class="chip" data-action="sbRemove" data-idx="${i}">${w}</button>`).join('')}
    </div>
    <div class="poolRow">
      ${A.sbPool.map((w,i)=>`<button class="chip pool" data-action="sbAdd" data-idx="${i}">${w}</button>`).join('')}
    </div>
    ${A.sbResult==='correct'?'<div class="feedbackMsg good">✓ Excellent sentence!</div>':''}
    ${A.sbResult==='incorrect'?'<div class="feedbackMsg bad">Check the word order and try again.</div>':''}
    <div class="navRowR">
      <button class="pill outline" data-action="sbClear">Clear</button>
      <button class="pill" style="background:var(--purple)" data-action="sbCheck" ${A.sbPool.length>0?'disabled':''}>Check</button>
      ${A.sbResult==='correct' ? `<button class="pill" style="background:var(--ink)" data-action="sbNext">${A.sbIdx===unit.sentenceBuilder.items.length-1?'Continue →':'Next Sentence →'}</button>` : ''}
    </div>`;
  } else {
    return `
    <h4 style="margin-top:0;">Make Your Own Sentence</h4>
    <p style="color:var(--ink-soft);font-size:0.9rem;">Write your own sentence using the word: <b>${unit.sentenceBuilder.freeWord}</b></p>
    <textarea class="freeText" data-action="sbFreeInput" placeholder="Type your sentence here...">${A.sbFreeText||''}</textarea>
    <div class="navRowR">
      <button class="pill" style="background:var(--purple)" data-action="sbSaveFree">Save Sentence</button>
    </div>
    ${A.sbSaved? '<div class="savedMsg">✓ Sentence saved.</div>' : ''}
    <div class="navRowR">
      <button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="sentenceBuilder" data-goto="">Mark Complete</button>
    </div>`;
  }
}

/* ---- Grammar Lab ---- */
function renderGrammarLab(unit){
  if(A.glTab===undefined) A.glTab='toBe';
  const g = unit.grammar;
  const tabs = `<div class="tabRow">
    <button class="subtab ${A.glTab==='toBe'?'active':''}" data-action="setGlTab" data-tab="toBe">To Be</button>
    <button class="subtab ${A.glTab==='toHave'?'active':''}" data-action="setGlTab" data-tab="toHave">To Have</button>
    <button class="subtab ${A.glTab==='questions'?'active':''}" data-action="setGlTab" data-tab="questions">Questions</button>
    <button class="subtab ${A.glTab==='detective'?'active':''}" data-action="setGlTab" data-tab="detective">🔎 Grammar Detective</button>
  </div>`;
  let body='';
  if(A.glTab==='toBe'){
    body = teachBox('To Be', [['I','am'],['He / She / It','is'],['You / We / They','are']]) + renderMCSequence(g.toBe, {completeKey:'grammarLab', finishLabel:'Mark Grammar Lab Complete'});
  } else if(A.glTab==='toHave'){
    body = teachBox('To Have', [['I / You / We / They','have'],['He / She / It','has']]) + renderMCSequence(g.toHave, {completeKey:'grammarLab', finishLabel:'Mark Grammar Lab Complete'});
  } else if(A.glTab==='questions'){
    body = teachBox('Yes/No &amp; Wh- Questions', [['Am / Is / Are','+ subject ...?'],['What / Where / Who / When / Why','+ am/is/are ...?']]) + renderMCSequence(g.questions, {completeKey:'grammarLab', finishLabel:'Mark Grammar Lab Complete'});
  } else {
    body = renderDetective(g.detective, {completeKey:'grammarLab'});
  }
  return tabs+body;
}
function teachBox(title, rows){
  return `<div class="teachBox"><h4>${title}</h4>${rows.map(r=>`<div class="ruleRow"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>`;
}

/* ---- Grammar Detective ---- */
function renderDetective(list, opts){
  if(A.detIdx===undefined){ A.detIdx=0; A.detSolved=null; }
  if(A.detIdx>=list.length){
    return `<div class="matchDone">🔎 All cases solved!</div>
    <div class="navRowR"><button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="${opts.completeKey}" data-goto="">Mark Complete</button></div>`;
  }
  const item = list[A.detIdx];
  const choices = shuffle([item.wrong, item.right]);
  return `
  <div class="detCard">
    <div class="qCounter">Case ${A.detIdx+1} of ${list.length}</div>
    <p style="font-size:0.9rem;color:var(--ink-soft);">Which sentence is correct?</p>
    <div class="detOpts">
      ${choices.map(c=>{
        let cls='opt';
        if(A.detSolved!==null){
          if(c===item.right) cls+=' correct'; else cls+=' dim';
        }
        return `<button class="${cls}" data-action="detPick" data-val="${escapeAttr(c)}" data-right="${escapeAttr(item.right)}">${c}</button>`;
      }).join('')}
    </div>
    ${A.detSolved==='correct' ? '<div class="feedbackMsg good">Case solved! 🔎</div>' : (A.detSolved==='wrong' ? '<div class="feedbackMsg bad">Not quite — look again.</div>' : '')}
  </div>
  <div class="navRowR">
    <button class="pill" style="background:var(--ink)" data-action="detNext" ${A.detSolved==='correct'?'':'disabled'}>${A.detIdx===list.length-1?'Finish':'Next →'}</button>
  </div>`;
}

export { renderSentenceBuilder, renderGrammarLab, teachBox, renderDetective };
