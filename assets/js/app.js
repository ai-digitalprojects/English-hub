/* Entry point. The content model must be loaded before anything can render,
   so the boot sequence awaits it and reports clearly if it fails. */
import { initModel } from './content/model.js';
import { hydrate, A } from './state.js';
import { initEvents } from './events.js';
import { render } from './render.js';
import { startRouter, currentRoute } from './router.js';
import { flushDraftSave } from './drafts.js';

try {
  await initModel();
  hydrate();
  initEvents();
  startRouter(render);

  const flush = () => flushDraftSave(currentRoute(), A);
  window.addEventListener('beforeunload', flush);
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', () => {
    if(document.visibilityState === 'hidden') flush();
  });
} catch(err){
  document.getElementById('app').innerHTML =
    '<div class="card"><h2>Could not load the lessons</h2>' +
    '<p>' + String(err && err.message || err) + '</p>' +
    '<p class="pctLabel">This page needs to be served over http. Opening the file directly will not work.</p></div>';
}
