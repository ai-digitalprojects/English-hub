import { S } from './state.js';
import { renderNavBtns } from './views/navbar.js';
import { renderBreadcrumbs } from './views/breadcrumbs.js';
import { renderHome } from './views/home.js';
import { renderSection } from './views/section.js';
import { renderPart } from './views/part.js';
import { renderActivity } from './views/activity.js';
import { renderProgress } from './views/progress.js';

function render(){
  renderNavBtns();
  const app = document.getElementById('app');
  let body = '';
  if(S.view === 'home') body = renderHome();
  else if(S.view === 'section') body = renderSection();
  else if(S.view === 'part') body = renderPart();
  else if(S.view === 'activity') body = renderActivity();
  else if(S.view === 'progress') body = renderProgress();
  app.innerHTML = renderBreadcrumbs() + body;
}

export { render };
