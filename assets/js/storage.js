/* Progress persistence. Everything is wrapped in try/catch because private
   windows and blocked site data make localStorage throw on access, not just
   return null — a thrown error there must never take the whole page down. */

const KEY = 'english-hub:progress:v1';

function loadProgress(){
  try {
    const raw = localStorage.getItem(KEY);
    if(!raw) return null;
    const data = JSON.parse(raw);
    return (data && typeof data === 'object') ? data : null;
  } catch(e){ return null; }
}

function saveProgress(units){
  try { localStorage.setItem(KEY, JSON.stringify(units)); return true; }
  catch(e){ return false; }
}

function clearProgress(){
  try { localStorage.removeItem(KEY); return true; }
  catch(e){ return false; }
}

/* Merge saved values onto a freshly built state so that a stored file written
   by an older version can never remove or corrupt keys the app expects. */
function mergeUnitState(fresh, saved){
  if(!saved || typeof saved !== 'object') return fresh;
  const out = {};
  Object.keys(fresh).forEach(k => {
    const f = fresh[k], s = saved[k];
    if(f && typeof f === 'object' && !Array.isArray(f)){
      out[k] = Object.assign({}, f, (s && typeof s === 'object') ? s : {});
    } else {
      out[k] = (typeof s === typeof f) ? s : f;
    }
  });
  return out;
}

export { loadProgress, saveProgress, clearProgress, mergeUnitState };
