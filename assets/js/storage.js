/* Persistence. Every access is wrapped in try/catch because private windows
   and blocked site data make localStorage throw on access, not return null. */

const PROGRESS_KEY = 'english-hub:progress:v2';

function readJson(key){
  try {
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : null;
    return (data && typeof data === 'object') ? data : null;
  } catch(e){ return null; }
}

function writeJson(key, value){
  try {
    if(value && Object.keys(value).length) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
    return true;
  } catch(e){ return false; }
}

function loadProgress(){ return readJson(PROGRESS_KEY) || {}; }
function saveProgress(progress){ return writeJson(PROGRESS_KEY, progress); }
function clearProgress(){ try { localStorage.removeItem(PROGRESS_KEY); return true; } catch(e){ return false; } }

export { loadProgress, saveProgress, clearProgress, PROGRESS_KEY };
