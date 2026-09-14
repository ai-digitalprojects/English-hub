import { S, colorBg } from '../state.js';
import { UNITS } from '../data/units.js';
import { heLine } from '../helpers.js';
import { activityDefs } from '../activity-defs.js';

function activityStatusIcon(u, key){
  const st = S.units[u];
  if(key==='checkYourself') return st.checkYourself.done ? (st.checkYourself.score>=9?'⭐':'✓') : '○';
  return st[key] ? '✓' : '○';
}
function renderUnit(){
  const u = S.unitId;
  const unit = UNITS[u];
  const cards = activityDefs(unit, u);

  return `
  <div class="unitHead">
    <div class="icon">${unit.icon}</div>
    <div><h2>${unit.title}</h2><p>${unit.subtitle}</p></div>
  </div>
  <div class="actGrid">
    ${cards.map(c=>`
      <div class="actCard" style="background:${colorBg(c.color)}" data-action="openActivity" data-act="${c.key}">
        <div class="status">${activityStatusIcon(u,c.key)}</div>
        <div class="icon">${c.icon}</div>
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        ${heLine(c.he)}
      </div>`).join('')}
  </div>`;
}

export { renderUnit };
