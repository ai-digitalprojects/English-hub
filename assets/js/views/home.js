import { UNITS } from '../data/units.js';
import { colorVar } from '../state.js';
import { unitOverallPct } from '../progress.js';

function renderHome(){
  const gsPct = unitOverallPct('gs');
  const jpPct = unitOverallPct('japan');
  return `
  <div class="hero">
    <div class="eyebrow">English Learning Hub</div>
    <h1 class="serif">BOOK: "THINK ABOUT IT!"</h1>
    <div class="sub">Grade 6 &middot; Gevim School</div>
    <div class="tagline">Learn &bull; Practice &bull; Speak &bull; Create</div>
  </div>
  <div class="grid">
    ${unitCard('gs', gsPct)}
    ${unitCard('japan', jpPct)}
    ${progressCard()}
  </div>
  `;
}

function unitCard(u, pct){
  const unit = UNITS[u];
  const started = pct>0;
  return `
  <div class="uCard">
    <div class="icon">${unit.icon}</div>
    <h3>${unit.title}</h3>
    <p class="desc">${unit.subtitle}</p>
    <div class="pbarOuter"><div class="pbarInner" style="width:${pct}%;background:${colorVar(unit.color)}"></div></div>
    <div class="pctLabel">Progress: ${pct}%</div>
    <button class="startBtn" style="background:${colorVar(unit.color)}" data-action="openUnit" data-unit="${u}">${started?'Continue →':'Start →'}</button>
  </div>`;
}
function progressCard(){
  return `
  <div class="uCard">
    <div class="icon">⭐</div>
    <h3>My Progress</h3>
    <p class="desc">See your learning progress and achievements</p>
    <div class="pbarOuter"><div class="pbarInner" style="width:100%;background:var(--gold)"></div></div>
    <div class="pctLabel">Track everything in one place</div>
    <button class="startBtn" style="background:var(--gold)" data-action="openProgress">View →</button>
  </div>`;
}

export { renderHome };
