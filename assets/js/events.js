import { S, A, resetA, freshUnits, persist } from './state.js';
import { clearProgress } from './storage.js';
import { UNITS } from './data/units.js';
import { shuffle } from './helpers.js';
import { speak } from './speech.js';
import { openUnit, openActivity, backToUnit, openProgress } from './nav.js';
import { render } from './render.js';

function initEvents(){

/* ============ EVENT DELEGATION ============ */
document.getElementById('app').addEventListener('click', function(e){
  const t = e.target.closest('[data-action]');
  if(!t) return;
  const act = t.dataset.action;
  const unit = UNITS[S.unitId];

  if(act==='openUnit'){ openUnit(t.dataset.unit); return; }
  if(act==='openProgress'){ openProgress(); return; }
  if(act==='openActivity'){ openActivity(t.dataset.act); return; }
  if(act==='speak'){ speak(t.dataset.text); return; }

  if(act==='flashPrev'){ A.fIdx = Math.max(0, A.fIdx-1); render(); return; }
  if(act==='flashNext'){ A.fIdx = Math.min(unit.vocab.length-1, A.fIdx+1); render(); return; }

  if(act==='finishActivity'){
    S.units[S.unitId][t.dataset.key] = true;
    persist();
    if(t.dataset.goto){ resetA(); S.activityId = t.dataset.goto; render(); }
    else backToUnit();
    return;
  }

  if(act==='setVpTab'){ A.vpTab = t.dataset.tab; delete A.mLeft; delete A.mcIdx; render(); return; }
  if(act==='setCeTab'){ A.ceTab = t.dataset.tab; delete A.mLeft; delete A.mcIdx; render(); return; }
  if(act==='setGlTab'){ A.glTab = t.dataset.tab; delete A.mcIdx; delete A.detIdx; render(); return; }
  if(act==='setRdTab'){ A.rdTab = t.dataset.tab; render(); return; }
  if(act==='setChTab'){ A.chTab = t.dataset.tab; delete A.mcIdx; delete A.detIdx; render(); return; }

  if(act==='mcSelect'){
    if(t.hasAttribute('data-locked')) return;
    let list;
    if(S.activityId==='vocabPractice') list = unit.practiceQ;
    else if(S.activityId==='classroomEnglish') list = unit.classroom.situational;
    else if(S.activityId==='grammarLab'){
      list = A.glTab==='toBe'?unit.grammar.toBe:A.glTab==='toHave'?unit.grammar.toHave:unit.grammar.questions;
    } else if(S.activityId==='challenge') list = unit.challenge.situations;
    const q = list[A.mcIdx];
    const chosen = t.dataset.opt;
    if(A.mcSelected===q.a){ return; } // already correct, locked
    A.mcAttempts = (A.mcAttempts||0)+1;
    A.mcSelected = chosen;
    if(chosen===q.a) A.mcScore = (A.mcScore||0)+1;
    render(); return;
  }
  if(act==='mcNext'){
    let list;
    if(S.activityId==='vocabPractice') list = unit.practiceQ;
    else if(S.activityId==='classroomEnglish') list = unit.classroom.situational;
    else if(S.activityId==='grammarLab'){ list = A.glTab==='toBe'?unit.grammar.toBe:A.glTab==='toHave'?unit.grammar.toHave:unit.grammar.questions; }
    else if(S.activityId==='challenge') list = unit.challenge.situations;
    if(A.mcIdx < list.length-1){ A.mcIdx++; A.mcSelected=null; A.mcAttempts=0; }
    else { A.mcDone = true; }
    render(); return;
  }
  if(act==='mcRestart'){ delete A.mcIdx; delete A.mcDone; delete A.mcScore; render(); return; }

  if(act==='matchPick'){
    const side=t.dataset.side, val=t.dataset.val;
    if(side==='L') A.mSelLeft = (A.mSelLeft===val? null: val);
    else A.mSelRight = (A.mSelRight===val? null: val);
    if(A.mSelLeft && A.mSelRight){
      const pair = A.mPairs.find(p=>p[0]===A.mSelLeft);
      if(pair && pair[1]===A.mSelRight){
        A.mMatched.push(A.mSelLeft); A.mWrong=null;
      } else {
        A.mWrong = 'L:'+A.mSelLeft;
        setTimeout(()=>{ A.mWrong=null; render(); }, 500);
      }
      A.mSelLeft=null; A.mSelRight=null;
    }
    render(); return;
  }
  if(act==='matchRestart'){ delete A.mLeft; render(); return; }

  if(act==='sbAdd'){
    const idx = parseInt(t.dataset.idx);
    A.sbChosen.push(A.sbPool[idx]);
    A.sbPool.splice(idx,1);
    A.sbResult=null;
    render(); return;
  }
  if(act==='sbRemove'){
    const idx = parseInt(t.dataset.idx);
    A.sbPool.push(A.sbChosen[idx]);
    A.sbChosen.splice(idx,1);
    A.sbResult=null;
    render(); return;
  }
  if(act==='sbClear'){
    A.sbPool = A.sbPool.concat(A.sbChosen);
    A.sbChosen = [];
    A.sbResult=null;
    render(); return;
  }
  if(act==='sbCheck'){
    const item = unit.sentenceBuilder.items[A.sbIdx];
    const built = A.sbChosen.join(' ').toLowerCase().replace(/[.,!?]/g,'');
    A.sbResult = (built===item.correct) ? 'correct' : 'incorrect';
    render(); return;
  }
  if(act==='sbNext'){
    A.sbIdx++;
    if(A.sbIdx < unit.sentenceBuilder.items.length){
      A.sbChosen=[]; A.sbPool = shuffle(unit.sentenceBuilder.items[A.sbIdx].words.slice()); A.sbResult=null;
    }
    render(); return;
  }
  if(act==='sbSaveFree'){ A.sbSaved = true; render(); return; }

  if(act==='detPick'){
    const val = t.dataset.val, right = t.dataset.right;
    A.detSolved = (val===right) ? 'correct' : 'wrong';
    render(); return;
  }
  if(act==='detNext'){
    A.detIdx++; A.detSolved=null; render(); return;
  }

  if(act==='spStart'){
    if(A.spRunning) return;
    A.spRunning = true; render();
    const timer = setInterval(()=>{
      A.spTimer--;
      if(A.spTimer<=0){ clearInterval(timer); A.spRunning=false; A.spTimer=20; }
      render();
    }, 1000);
    return;
  }
  if(act==='spNext'){
    A.spIdx++; A.spTimer=20; A.spRunning=false; A.spCheck=[false,false,false,false];
    render(); return;
  }

  if(act==='rdFindSave'){ A.rdFindSaved = true; render(); return; }
  if(act==='rdTfPick'){ A.rdTfPicked = t.dataset.val; render(); return; }
  if(act==='rdChoosePick'){ A.rdChoosePicked = t.dataset.val; render(); return; }
  if(act==='rdThinkSave'){ A.rdThinkSaved = true; render(); return; }

  if(act==='wrStarter'){
    const s = unit.writing.starters[parseInt(t.dataset.idx)];
    A.wrText = (A.wrText? A.wrText+'\n' : '') + s;
    render(); return;
  }
  if(act==='wrSave'){ A.wrSaved = true; render(); return; }

  if(act==='vpSave'){ A.vpSaved = true; render(); return; }
  if(act==='crSave'){ A.crSaved = true; render(); return; }

  if(act==='qzSelect'){
    if(A.qzSelected!==null) return;
    const q = unit.finalQuiz[A.qzIdx];
    A.qzSelected = t.dataset.opt;
    if(A.qzSelected===q.a) A.qzScore++;
    render(); return;
  }
  if(act==='qzNext'){
    A.qzIdx++; A.qzSelected=null; A.qzOpenText='';
    render(); return;
  }
  if(act==='quizRestart'){
    A.qzIdx=0; A.qzScore=0; A.qzSelected=null; A.qzOpenText='';
    render(); return;
  }
  if(act==='quizFinish'){
    S.units[S.unitId].checkYourself = { done:true, score: parseInt(t.dataset.score) };
    persist();
    backToUnit(); return;
  }

  if(act==='resetAsk'){ S.confirmReset = true; render(); return; }
  if(act==='resetConfirmYes'){
    S.units = freshUnits();
    clearProgress();
    S.confirmReset = false; render(); return;
  }
  if(act==='resetConfirmNo'){ S.confirmReset = false; render(); return; }
});

/* text inputs — update state without full re-render (keeps focus) */
document.getElementById('app').addEventListener('input', function(e){
  const t = e.target;
  const act = t.dataset.action;
  if(act==='sbFreeInput'){ A.sbFreeText = t.value; A.sbSaved=false; }
  else if(act==='rdFindInput'){ A.rdFindText = t.value; A.rdFindSaved=false; }
  else if(act==='rdThinkInput'){ A.rdThinkText = t.value; A.rdThinkSaved=false; }
  else if(act==='wrInput'){
    A.wrText = t.value; A.wrSaved=false;
    const counter = t.parentElement.querySelector('.wordCounter');
    if(counter){ const wc = t.value.trim().length? t.value.trim().split(/\s+/).length:0; counter.textContent = wc+' words'; }
  }
  else if(act==='vpInput'){
    if(A.vpValues===undefined) A.vpValues=[];
    A.vpValues[parseInt(t.dataset.idx)] = t.value; A.vpSaved=false;
  }
  else if(act==='crInput'){ A.crText = t.value; A.crSaved=false; }
  else if(act==='qzOpenInput'){ A.qzOpenText = t.value; }
});
document.getElementById('app').addEventListener('change', function(e){
  const t = e.target;
  if(t.dataset.action==='spCheck'){
    A.spCheck[parseInt(t.dataset.idx)] = t.checked;
  }
});

}

export { initEvents };
