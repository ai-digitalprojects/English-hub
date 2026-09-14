/* Progress percentages.
   Kept out of state.js on purpose: state is imported by the exercise
   modules, and the model imports those, so a model import inside state
   would close an import cycle. */

import { S, isDone } from './state.js';
import { getPart, playableActivities } from './content/model.js';

/* Percentages count only what a student can actually do right now, so the bar
   never stalls below 100% because of an exercise that is not built yet. */
function partProgress(sectionId, part){
  const playable = playableActivities(part);
  if(!playable.length) return { done: 0, total: 0, pct: 0 };
  const done = playable.filter(a => isDone(sectionId, part.id, a.id)).length;
  return { done, total: playable.length, pct: Math.round(done / playable.length * 100) };
}

function sectionProgress(section){
  const parts = (section.parts && section.parts.length)
    ? section.parts
    : [getPart(section.id, null)].filter(Boolean);
  let done = 0, total = 0;
  parts.forEach(p => { const r = partProgress(section.id, p); done += r.done; total += r.total; });
  return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
}

export { partProgress, sectionProgress };
