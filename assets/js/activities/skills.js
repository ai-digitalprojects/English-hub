import { A } from '../state.js';
import { escapeAttr } from '../helpers.js';
import { renderMCSequence } from './vocabulary.js';
import { renderDetective } from './grammar.js';
import { challengeTabs } from '../availability.js';

/* ---- Speak ---- */
function renderSpeak(unit){
  if(A.spIdx===undefined){ A.spIdx=0; A.spTimer=20; A.spRunning=false; A.spCheck=[false,false,false,false]; }
  if(A.spIdx>=unit.speaking.length){
    return `<div class="matchDone">🎤 All speaking prompts done. Great effort!</div>
    <div class="navRowR"><button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="speak" data-goto="">Mark Speaking Complete</button></div>`;
  }
  const q = unit.speaking[A.spIdx];
  return `
  <div class="speakCard">
    <div class="qCounter">Prompt ${A.spIdx+1} of ${unit.speaking.length}</div>
    <div class="speakQ">🎤 ${q}</div>
    <div class="timerDisp">${A.spTimer}s</div>
    <button class="pill" style="background:var(--pink)" data-action="spStart" ${A.spRunning?'disabled':''}>${A.spRunning?'Speaking...':'Start Speaking (20s)'}</button>
    <div class="checklist">
      <p style="font-weight:700;margin-bottom:2px;">Did you...</p>
      <label><input type="checkbox" data-action="spCheck" data-idx="0" ${A.spCheck[0]?'checked':''}/> answer in English?</label>
      <label><input type="checkbox" data-action="spCheck" data-idx="1" ${A.spCheck[1]?'checked':''}/> use a full sentence?</label>
      <label><input type="checkbox" data-action="spCheck" data-idx="2" ${A.spCheck[2]?'checked':''}/> speak clearly?</label>
      <label><input type="checkbox" data-action="spCheck" data-idx="3" ${A.spCheck[3]?'checked':''}/> use one of the new words?</label>
    </div>
  </div>
  <div class="navRowR">
    <button class="pill" style="background:var(--ink)" data-action="spNext">I finished →</button>
  </div>`;
}

/* ---- Reading ---- */
function renderReading(unit){
  const r = unit.reading;
  if(A.rdTab===undefined) A.rdTab='find';
  const tabs = `<div class="tabRow">
    <button class="subtab ${A.rdTab==='find'?'active':''}" data-action="setRdTab" data-tab="find">Find It</button>
    <button class="subtab ${A.rdTab==='tf'?'active':''}" data-action="setRdTab" data-tab="tf">True or False</button>
    <button class="subtab ${A.rdTab==='choose'?'active':''}" data-action="setRdTab" data-tab="choose">Choose</button>
    <button class="subtab ${A.rdTab==='think'?'active':''}" data-action="setRdTab" data-tab="think">Think</button>
  </div>`;
  const passage = `<div class="teachBox" style="background:var(--orange-bg);border-color:var(--orange);"><p style="margin:0;line-height:1.7;">${r.passage}</p></div>`;
  let q='';
  if(A.rdTab==='find'){
    if(A.rdFindText===undefined) A.rdFindText='';
    q = `<p class="prompt">${r.find}</p>
    <textarea class="freeText" style="min-height:50px" data-action="rdFindInput" placeholder="Type your answer...">${A.rdFindText}</textarea>
    <div class="navRowR"><button class="pill" style="background:var(--orange)" data-action="rdFindSave">Save Answer</button></div>
    ${A.rdFindSaved?'<div class="savedMsg">✓ Answer recorded. Sample answer: Twelve.</div>':''}`;
  } else if(A.rdTab==='tf'){
    if(A.rdTfPicked===undefined) A.rdTfPicked=null;
    const correctVal = r.tf.a ? 'True' : 'False';
    q = `<p class="prompt">${r.tf.p}</p>
    <div class="opts">
      ${['True','False'].map(o=>{
        let cls='opt';
        if(A.rdTfPicked){ if(o===correctVal) cls+=' correct'; else if(o===A.rdTfPicked) cls+=' incorrect'; else cls+=' dim'; }
        return `<button class="${cls}" data-action="rdTfPick" data-val="${o}">${o}</button>`;
      }).join('')}
    </div>`;
  } else if(A.rdTab==='choose'){
    if(A.rdChoosePicked===undefined) A.rdChoosePicked=null;
    q = `<p class="prompt">${r.choose.p}</p>
    <div class="opts">
      ${r.choose.o.map(o=>{
        let cls='opt';
        if(A.rdChoosePicked){ if(o===r.choose.a) cls+=' correct'; else if(o===A.rdChoosePicked) cls+=' incorrect'; else cls+=' dim'; }
        return `<button class="${cls}" data-action="rdChoosePick" data-val="${escapeAttr(o)}">${o}</button>`;
      }).join('')}
    </div>`;
  } else {
    if(A.rdThinkText===undefined) A.rdThinkText='';
    q = `<p class="prompt">${r.think}</p>
    <textarea class="freeText" data-action="rdThinkInput" placeholder="Type your thoughts...">${A.rdThinkText}</textarea>
    <div class="navRowR"><button class="pill" style="background:var(--orange)" data-action="rdThinkSave">Save Answer</button></div>
    ${A.rdThinkSaved?'<div class="savedMsg">✓ Your answer has been recorded.</div>':''}`;
  }
  return passage + `<div style="height:14px;"></div>` + tabs + q + `
  <div class="navRowR"><button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="read" data-goto="">Mark Reading Complete</button></div>`;
}

/* ---- Write ---- */
function renderWrite(unit){
  if(A.wrText===undefined) A.wrText = '';
  const wordCount = A.wrText.trim().length ? A.wrText.trim().split(/\s+/).length : 0;
  return `
  <p style="font-size:0.85rem;color:var(--ink-soft);">Tap a starter to add it, then keep writing.</p>
  <div class="poolRow">
    ${unit.writing.starters.map((s,i)=>`<button class="chip pool" data-action="wrStarter" data-idx="${i}">${s}</button>`).join('')}
  </div>
  <textarea class="freeText" style="min-height:140px" data-action="wrInput" placeholder="Start writing here...">${A.wrText}</textarea>
  <div class="wordCounter">${wordCount} words</div>
  <div class="navRowR">
    <button class="pill" style="background:var(--pink)" data-action="wrSave">Save Writing</button>
  </div>
  ${A.wrSaved?'<div class="savedMsg">Writing saved ✓</div>':''}
  <div class="navRowR">
    <button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="write" data-goto="">Mark Complete</button>
  </div>`;
}

/* ---- Challenge ---- */
function renderChallenge(unit){
  const c = unit.challenge;
  const tabDefs = challengeTabs(unit);
  if(!tabDefs.length) return '<div class="noteBox">No challenge tasks for this unit yet.</div>';
  if(A.chTab===undefined || !tabDefs.some(t=>t.key===A.chTab)) A.chTab = tabDefs[0].key;
  const tabs = `<div class="tabRow">
    ${tabDefs.map(t=>`<button class="subtab ${A.chTab===t.key?'active':''}" data-action="setChTab" data-tab="${t.key}">${t.label}</button>`).join('')}
  </div>`;
  let body='';
  if(A.chTab==='situations') body = renderMCSequence(c.situations, {completeKey:'challenge', finishLabel:'Mark Challenge Complete'});
  else if(A.chTab==='detective') body = renderDetective(c.detective, {completeKey:'challenge'});
  else if(A.chTab==='vocabPower'){
    if(A.vpValues===undefined) A.vpValues = c.vocabPower.map(()=>'');
    body = `<p style="font-size:0.9rem;color:var(--ink-soft);">Use each word in a sentence of your own.</p>
    ${c.vocabPower.map((w,i)=>`
      <div style="margin-bottom:14px;">
        <div style="font-weight:700;margin-bottom:6px;">${w}</div>
        <input type="text" class="freeText" style="min-height:auto;padding:10px 12px;" data-action="vpInput" data-idx="${i}" value="${escapeAttr(A.vpValues[i])}" placeholder="Write a sentence with '${w}'..."/>
      </div>`).join('')}
    <div class="navRowR"><button class="pill" style="background:var(--gold)" data-action="vpSave">Save Sentences</button></div>
    ${A.vpSaved?'<div class="savedMsg">✓ Sentences saved.</div>':''}`;
  } else {
    if(A.crText===undefined) A.crText='';
    body = `<p class="prompt">${c.createPrompt}</p>
    <textarea class="freeText" style="min-height:120px" data-action="crInput" placeholder="Write your ideas...">${A.crText}</textarea>
    <div class="navRowR"><button class="pill" style="background:var(--gold)" data-action="crSave">Save</button></div>
    ${A.crSaved?'<div class="savedMsg">✓ Saved.</div>':''}`;
  }
  return tabs + body + `<div class="navRowR"><button class="pill" style="background:var(--blue)" data-action="finishActivity" data-key="challenge" data-goto="">Finish Challenge</button></div>`;
}

export { renderSpeak, renderReading, renderWrite, renderChallenge };
