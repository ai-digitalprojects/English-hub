/* Application state.
   NOTE: `A` is mutated in place and cleared via resetA() — never reassigned,
   because ES module bindings are read-only for importers. */

function freshUnitState(){
  return { learnWords:false, vocabPractice:false, classroomEnglish:false, sentenceBuilder:false,
           grammarLab:false, speak:false, read:false, write:false, challenge:false,
           checkYourself:{done:false, score:0} };
}

let S = {
  view:'home', unitId:null, activityId:null,
  units:{ gs: freshUnitState(), japan: freshUnitState() },
  confirmReset:false
};

let A = {}; // ephemeral per-activity state, reset on activity open

function colorVar(c){ return 'var(--'+c+')'; }
function colorBg(c){ return 'var(--'+c+'-bg)'; }

function resetA(){ Object.keys(A).forEach(k => delete A[k]); }

export { S, A, freshUnitState, resetA, colorVar, colorBg };
