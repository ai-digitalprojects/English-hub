import { S } from '../state.js';
import { UNITS, BADGE_DEFS } from '../data/units.js';
import { unitOverallPct, earnedBadges } from '../progress.js';

/* ============ RENDER: PROGRESS PAGE ============ */
function renderProgress(){
  const badges = earnedBadges();
  const gsPct = unitOverallPct('gs');
  const jpPct = unitOverallPct('japan');
  const overall = Math.round((gsPct+jpPct)/2);
  return `
  <div class="overallBarBox">
    <div class="big">Your English Journey</div>
    <div class="pbarOuter" style="background:rgba(255,255,255,0.15);height:12px;">
      <div class="pbarInner" style="width:${overall}%;background:var(--gold);"></div>
    </div>
    <div style="margin-top:8px;">${overall}% Complete</div>
  </div>

  ${progressUnitBlock('gs')}
  ${progressUnitBlock('japan')}

  <div class="progUnit">
    <h3>Achievements</h3>
    <div class="badgeGrid">
      ${BADGE_DEFS.map(b=>`
        <div class="badge ${badges[b.id]?'earned':''}">
          <div class="bIcon">${b.icon}</div>
          <div class="bLabel">${b.label}</div>
        </div>`).join('')}
    </div>
    ${S.confirmReset ? `
      <div class="noteBox" style="margin-top:16px;">Are you sure? This clears all progress in this session.
        <div style="margin-top:8px;"><button class="pill" style="background:var(--pink)" data-action="resetConfirmYes">Yes, reset</button>
        <button class="pill outline" data-action="resetConfirmNo">Cancel</button></div>
      </div>` :
      `<button class="resetBtn" data-action="resetAsk">Reset My Progress</button>`
    }
  </div>`;
}
function progressUnitBlock(u){
  const unit = UNITS[u]; const st = S.units[u];
  const vocabPct = Math.round(((st.learnWords?1:0)+(st.vocabPractice?1:0))/2*100);
  let rows = `<div class="statRow"><span>Vocabulary</span><b>${vocabPct}%</b></div>`;
  if(u==='gs'){
    const sbPct = st.sentenceBuilder?100:0;
    rows += `<div class="statRow"><span>Sentence Building</span><b>${sbPct}%</b></div>`;
  }
  if(unit.hasGrammar) rows += `<div class="statRow"><span>Grammar</span><b>${st.grammarLab?100:0}%</b></div>`;
  if(unit.hasReading) rows += `<div class="statRow"><span>Reading</span><b>${st.read?100:0}%</b></div>`;
  rows += `<div class="statRow"><span>Speaking</span><b>${st.speak?'Completed':'Not completed'}</b></div>`;
  rows += `<div class="statRow"><span>Writing</span><b>${st.write?'Completed':'Not completed'}</b></div>`;
  rows += `<div class="statRow"><span>Final Check</span><b>${st.checkYourself.done ? st.checkYourself.score+'/10' : '—'}</b></div>`;
  rows += `<div class="statRow"><span><b>Overall</b></span><b>${unitOverallPct(u)}%</b></div>`;
  return `<div class="progUnit"><h3>${unit.icon} ${unit.title}</h3>${rows}</div>`;
}

export { renderProgress };
