/* Application state.
   `A` is mutated in place and cleared via resetA(), never reassigned, because
   ES module bindings are read-only for importers. */

import { loadProgress, saveProgress } from './storage.js';

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

function colorVar(c){ return 'var(--' + c + ')'; }
function colorBg(c){ return 'var(--' + c + '-bg)'; }

export {
  S, A, resetA, hydrate, persist,
  isDone, markDone, clearAllProgress, pKey,
  colorVar, colorBg
};
