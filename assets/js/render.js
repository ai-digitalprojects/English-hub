import { S } from './state.js';
import { renderNavBtns } from './views/navbar.js';
import { renderHome } from './views/home.js';
import { renderUnit } from './views/unit.js';
import { renderActivity } from './views/activity.js';
import { renderProgress } from './views/progress.js';

/* ============ MASTER RENDER ============ */
function render(){
  renderNavBtns();
  const app = document.getElementById('app');
  if(S.view==='home') app.innerHTML = renderHome();
  else if(S.view==='unit') app.innerHTML = renderUnit();
  else if(S.view==='activity') app.innerHTML = renderActivity();
  else if(S.view==='progress') app.innerHTML = renderProgress();
}

export { render };
