/* Free-text drafts.
   Everything a student types by hand is kept so a refresh never loses work:
   Write It, the Challenge writing tasks, the free sentence in Build a
   Sentence, both Reading text answers, and the unscored open quiz question.

   Drafts are stored separately from progress. Writing text is NOT progress —
   having a draft never marks an activity complete. */

const KEY = 'english-hub:drafts:v1';

/* The ephemeral (A) fields that hold student-authored text. */
const FIELDS = ['wValue', 'sbFreeText', 'rdFindText', 'rdThinkText', 'wrText', 'vpValues', 'crText', 'qzOpen'];

/* One slot per Unit / Part / Activity. '-' stands in for "no part yet"; once
   Phase 4 introduces parts the same key shape keeps them apart. */
function draftKey(route){
  if(!route || !route.sectionId || !route.activityId) return null;
  return [route.sectionId, route.partId || '-', route.activityId].join('/');
}

function loadAll(){
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : null;
    return (data && typeof data === 'object') ? data : {};
  } catch(e){ return {}; }
}

function saveAll(all){
  try {
    if(Object.keys(all).length) localStorage.setItem(KEY, JSON.stringify(all));
    else localStorage.removeItem(KEY);
    return true;
  } catch(e){ return false; }
}

function isEmptyValue(v){
  if(v == null) return true;
  if(typeof v === 'string') return v.trim() === '';
  if(Array.isArray(v)) return v.every(x => !x || String(x).trim() === '');
  if(typeof v === 'object') return Object.keys(v).every(k => !v[k] || String(v[k]).trim() === '');
  return false;
}

/* Copy a saved draft into the ephemeral state before an activity renders. */
function applyDraft(route, A){
  const key = draftKey(route);
  if(!key) return false;
  const saved = loadAll()[key];
  if(!saved) return false;
  FIELDS.forEach(f => {
    if(saved[f] !== undefined && !isEmptyValue(saved[f])) A[f] = saved[f];
  });
  return true;
}

function writeDraft(route, A){
  const key = draftKey(route);
  if(!key) return false;
  const all = loadAll();
  const record = {};
  FIELDS.forEach(f => { if(!isEmptyValue(A[f])) record[f] = A[f]; });
  if(Object.keys(record).length) all[key] = record; else delete all[key];
  return saveAll(all);
}

function hasDraft(route){
  const key = draftKey(route);
  return !!(key && loadAll()[key]);
}

/* Clear one activity's draft without disturbing the rest of its state
   (quiz position, match progress and so on stay as they were). */
function clearDraft(route, A){
  const key = draftKey(route);
  if(!key) return false;
  const all = loadAll();
  delete all[key];
  saveAll(all);
  if(A) FIELDS.forEach(f => { delete A[f]; });
  return true;
}

function clearAllDrafts(){
  try { localStorage.removeItem(KEY); return true; } catch(e){ return false; }
}

/* Typing fires on every keystroke; coalesce the writes. */
let timer = null;
function scheduleDraftSave(route, A){
  if(timer) clearTimeout(timer);
  timer = setTimeout(() => { timer = null; writeDraft(route, A); }, 250);
}

/* Flush immediately — used when leaving the page mid-sentence. */
function flushDraftSave(route, A){
  if(timer){ clearTimeout(timer); timer = null; }
  writeDraft(route, A);
}

export { applyDraft, writeDraft, hasDraft, clearDraft, clearAllDrafts, scheduleDraftSave, flushDraftSave, draftKey };
