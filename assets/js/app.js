/* Entry point. Order matters: restore saved progress, wire the delegated
   listeners, then let the router read the URL and draw the first screen. */
import { hydrate } from './state.js';
import { initEvents } from './events.js';
import { render } from './render.js';
import { startRouter } from './router.js';

hydrate();
initEvents();
startRouter(render);
