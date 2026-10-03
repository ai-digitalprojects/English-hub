import { S } from './state.js';
import { getSection, hasParts } from './content/model.js';
import { renderNavBtns } from './views/navbar.js';
import { renderBreadcrumbs } from './views/breadcrumbs.js';
import { renderHome } from './views/home.js';
import { renderSection } from './views/section.js';
import { renderPart } from './views/part.js';
import { renderActivity } from './views/activity.js';
import { renderProgress } from './views/progress.js';

/* The unit overview is being restyled on its own before the rest of the site
   follows, and the top bar sits outside #app, so the screen marks itself on
   <body> and the scoped stylesheet hangs off that. */
function markScreen(){
  const unitOverview = S.view === 'section' && hasParts(getSection(S.sectionId));
  document.body.classList.toggle('screen-unit', !!unitOverview);
}

function render(){
  markScreen();
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
