/* Application state.
   NOTE: `A` is mutated in place and cleared via resetA() — never reassigned,
   because ES module bindings are read-only for importers. */

import { loadProgress, saveProgress, mergeUnitState } from './storage.js';

function freshUnitState(){
  return { learnWords:false, vocabPractice:false, classroomEnglish:false, sentenceBuilder:false,
           grammarLab:false, speak:false, read:false, write:false, challenge:false,
           checkYourself:{done:false, score:0} };
}

function freshUnits(){ return { gs: freshUnitState(), japan: freshUnitState() }; }

let S = {
  view:'home', unitId:null, activityId:null,
  sectionId:null, partId:null, route:null,
  units: freshUnits(),
  confirmReset:false,
  storageAvailable:true
};

let A = {}; // ephemeral per-activity state, reset on activity open

function resetA(){ Object.keys(A).forEach(k => delete A[k]); }

/* Rehydrate from localStorage at boot, merging onto a fresh shape so an older
   or partial saved file can never remove keys the app relies on. */
function hydrate(){
  const saved = loadProgress();
  if(!saved) return;
  const units = freshUnits();
  Object.keys(units).forEach(k => { units[k] = mergeUnitState(units[k], saved[k]); });
  S.units = units;
}

/* Called after anything that changes progress. */
function persist(){
  S.storageAvailable = saveProgress(S.units);
  return S.storageAvailable;
}

function colorVar(c){ return 'var(--'+c+')'; }
function colorBg(c){ return 'var(--'+c+'-bg)'; }

export { S, A, freshUnitState, freshUnits, resetA, hydrate, persist, colorVar, colorBg };
