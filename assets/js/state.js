/* Application state.
   `A` is mutated in place and cleared via resetA(), never reassigned, because
   ES module bindings are read-only for importers. */

import { loadProgress, saveProgress } from './storage.js';
import { getPart, playableActivities } from './content/model.js';

const S = {
  view: 'home',
  sectionId: null, partId: null, activityId: null,
  route: null,
  progress: {},          // sectionId -> partId('-') -> activityId -> true
  confirmReset: false,
  storageAvailable: true
};

const A = {};            // ephemeral per-activity state

function resetA(){ Object.keys(A).forEach(k => delete A[k]); }

function hydrate(){ S.progress = loadProgress(); }
function persist(){ S.storageAvailable = saveProgress(S.progress); return S.storageAvailable; }

/* ---- progress read / write ---- */
function pKey(partId){ return partId || '-'; }

function isDone(sectionId, partId, activityId){
  const sec = S.progress[sectionId];
  const part = sec && sec[pKey(partId)];
  return !!(part && part[activityId]);
}

function markDone(sectionId, partId, activityId){
  if(!S.progress[sectionId]) S.progress[sectionId] = {};
  if(!S.progress[sectionId][pKey(partId)]) S.progress[sectionId][pKey(partId)] = {};
  S.progress[sectionId][pKey(partId)][activityId] = true;
  persist();
}

function clearAllProgress(){ S.progress = {}; persist(); }

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

function colorVar(c){ return 'var(--' + c + ')'; }
function colorBg(c){ return 'var(--' + c + '-bg)'; }

export {
  S, A, resetA, hydrate, persist,
  isDone, markDone, clearAllProgress, partProgress, sectionProgress,
  colorVar, colorBg
};
