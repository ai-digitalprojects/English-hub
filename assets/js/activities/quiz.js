import { A } from '../state.js';
import { escapeAttr } from '../helpers.js';

/* ---- Final Quiz ---- */
function renderQuiz(unit){
  if(A.qzIdx===undefined){ A.qzIdx=0; A.qzScore=0; A.qzSelected=null; A.qzAnswered=false; A.qzScoreCount=0; }
  if(A.qzIdx>=unit.finalQuiz.length){
    const scoreable = unit.finalQuiz.filter(q=>q.type==='mc').length;
    const pct = Math.round(A.qzScore/scoreable*10); // scale to /10 overall
    const scaledScore = Math.round(A.qzScore/scoreable*10);
    let tier;
    if(scaledScore>=9) tier = {icon:'⭐', title:'Excellent!', msg:'You are ready to move on.'};
    else if(scaledScore>=7) tier = {icon:'👍', title:'Good job!', msg:'Try the challenge and review a few words.'};
    else tier = {icon:'🔄', title:"Let's practice a little more.", msg:'Review the vocabulary and grammar sections, then try again.'};
    return `
    <div class="resultBox">
      <div class="scoreCircle">${scaledScore}/10</div>
      <h3>${tier.icon} ${tier.title}</h3>
      <p>${tier.msg}</p>
      <div class="navRowR" style="justify-content:center;">
        <button class="pill outline" data-action="quizRestart">Practice Again</button>
        <button class="pill" style="background:var(--blue)" data-action="quizFinish" data-score="${scaledScore}">Back to Unit</button>
      </div>
    </div>`;
  }
  const q = unit.finalQuiz[A.qzIdx];
  let body='';
  if(q.type==='mc'){
    const answered = A.qzSelected!==null;
    body = `
    <div class="prompt">${q.p}</div>
    <div class="opts">
      ${q.o.map(o=>{
        let cls='opt';
        if(answered){ if(o===q.a) cls+=' correct'; else if(o===A.qzSelected) cls+=' incorrect'; else cls+=' dim'; }
        return `<button class="${cls}" data-action="qzSelect" data-opt="${escapeAttr(o)}">${o}</button>`;
      }).join('')}
    </div>`;
  } else {
    body = `<div class="prompt">${q.p}</div>
    <textarea class="freeText" data-action="qzOpenInput" placeholder="Type your answer...">${(A.qzOpen && A.qzOpen[A.qzIdx]) || ''}</textarea>
    <div class="noteBox">This question isn't scored — your answer is simply recorded.</div>`;
  }
  const canNext = q.type==='mc' ? A.qzSelected!==null : true;
  return `
  <div class="qCounter">Question ${A.qzIdx+1} of ${unit.finalQuiz.length}</div>
  ${body}
  <div class="navRowR">
    <button class="pill" style="background:var(--ink)" data-action="qzNext" ${canNext?'':'disabled'}>${A.qzIdx===unit.finalQuiz.length-1?'See Results':'Next →'}</button>
  </div>`;
}

export { renderQuiz };
