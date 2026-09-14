import { S } from './state.js';
import { renderNavBtns } from './views/navbar.js';
import { renderBreadcrumbs } from './views/breadcrumbs.js';
import { renderHome } from './views/home.js';
import { renderUnit } from './views/unit.js';
import { renderActivity } from './views/activity.js';
import { renderProgress } from './views/progress.js';

/* Placeholder for the Unit -> Part level. The router can only produce this
   view once data/manifest.js lists parts, which Phase 4 does. */
function renderPart(){
  return `<div class="card"><h2>Part</h2>
    <div class="actSub">This part has no content yet.</div></div>`;
}

function render(){
  renderNavBtns();
  const app = document.getElementById('app');
  let body = '';
  if(S.view==='home') body = renderHome();
  else if(S.view==='unit') body = renderUnit();
  else if(S.view==='part') body = renderPart();
  else if(S.view==='activity') body = renderActivity();
  else if(S.view==='progress') body = renderProgress();
  app.innerHTML = renderBreadcrumbs() + body;
}

export { render };
