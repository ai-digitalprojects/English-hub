/* Entry point. Order matters: restore saved progress, wire the delegated
   listeners, then let the router read the URL and draw the first screen. */
import { hydrate } from './state.js';
import { initEvents } from './events.js';
import { render } from './render.js';
import { startRouter, currentRoute } from './router.js';
import { A } from './state.js';
import { flushDraftSave } from './drafts.js';

hydrate();
initEvents();
startRouter(render);

/* Saving is debounced while typing; flush it if the page is closed or hidden
   mid-sentence so the last few keystrokes are never lost. */
const flush = () => flushDraftSave(currentRoute(), A);
window.addEventListener('beforeunload', flush);
window.addEventListener('pagehide', flush);
document.addEventListener('visibilitychange', () => { if(document.visibilityState === 'hidden') flush(); });
