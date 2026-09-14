/* Progress across every section and part, read from the content model so it
   lists exactly what exists — nothing hardcoded. */
import { S, clearAllProgress, colorVar } from '../state.js';
import { sectionProgress, partProgress } from '../progress.js';
import { sections, getPart } from '../content/model.js';
import { playableActivities, activitiesOf } from '../content/model.js';
import { hashFor } from '../router.js';

function partRow(sectionId, part){
  const pr = partProgress(sectionId, part);
  const label = part.number ? 'Part ' + part.number + ' · ' + part.title : part.title;
  const href = part.id
    ? hashFor({ view:'part', sectionId, partId:part.id })
    : hashFor({ view:'section', sectionId });
  return `
  <a class="statRow link" href="${href}">
    <span>${label}</span>
    <b>${pr.total ? pr.done + '/' + pr.total : '—'}</b>
  </a>`;
}

function sectionBlock(section){
  const pr = sectionProgress(section);
  const parts = (section.parts && section.parts.length)
    ? section.parts
    : [getPart(section.id, null)].filter(Boolean);
  return `
  <div class="progUnit">
    <h3>${section.icon} ${section.label}</h3>
    <div class="pbarOuter"><div class="pbarInner" style="width:${pr.pct}%;background:${colorVar(section.color)}"></div></div>
    <div class="pctLabel">${pr.pct}% &middot; ${pr.done} of ${pr.total} available activities</div>
    ${parts.map(p => partRow(section.id, p)).join('')}
  </div>`;
}

function renderProgress(){
  const all = sections();
  let done = 0, total = 0;
  all.forEach(s => { const r = sectionProgress(s); done += r.done; total += r.total; });
  const pct = total ? Math.round(done / total * 100) : 0;
  const planned = all.reduce((n, s) => {
    const parts = (s.parts && s.parts.length) ? s.parts : [getPart(s.id, null)].filter(Boolean);
    return n + parts.reduce((m, p) => m + activitiesOf(p).length - playableActivities(p).length, 0);
  }, 0);

  return `
  <div class="overallBarBox">
    <div class="big">Your English Journey</div>
    <div class="pbarOuter" style="background:rgba(255,255,255,0.15);height:12px;">
      <div class="pbarInner" style="width:${pct}%;background:var(--gold);"></div>
    </div>
    <div style="margin-top:8px;">${pct}% Complete &middot; ${done} of ${total}</div>
  </div>
  ${all.map(sectionBlock).join('')}
  <div class="progUnit">
    <h3>Still to come</h3>
    <p class="pctLabel">${planned} more exercises from the book are catalogued and waiting to be built.</p>
    ${S.confirmReset ? `
      <div class="noteBox" style="margin-top:16px;">Are you sure? This clears all progress on this device.
        <div style="margin-top:8px;">
          <button class="pill" style="background:var(--pink)" data-action="resetConfirmYes">Yes, reset</button>
          <button class="pill outline" data-action="resetConfirmNo">Cancel</button>
        </div>
      </div>` : `<button class="resetBtn" data-action="resetAsk">Reset My Progress</button>`}
  </div>`;
}

export { renderProgress, clearAllProgress };
