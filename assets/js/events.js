/* Delegated listeners. Links carry navigation; data-action carries behaviour. */
import { S, A, markDone, clearAllProgress } from './state.js';
import { getPart, getActivity, wordsForActivity } from './content/model.js';
import { exerciseFor } from './exercises/index.js';
import { RENDERERS } from './exercises/engine.js';
import { speak } from './speech.js';
import { render } from './render.js';
import { goUp } from './nav.js';
import { scheduleDraftSave, clearDraft, clearAllDrafts } from './drafts.js';
import { currentRoute } from './router.js';

function initEvents(){
  const app = document.getElementById('app');

  app.addEventListener('click', function(e){
    const t = e.target.closest('[data-action]');
    if(!t) return;
    const act = t.dataset.action;
    const part = getPart(S.sectionId, S.partId);

    if(act === 'speak'){ speak(t.dataset.text); return; }

    /* Exercise drills own their own actions. */
    if(act === 'ex'){
      const current = getActivity(S.sectionId, S.partId, S.activityId);
      const engine = current && current.render ? RENDERERS[current.render] : null;
      if(engine){
        if(engine.handle(t.dataset.do, t, current.items, render)) render();
        return;
      }
      const ex = exerciseFor(current);
      if(ex && ex.handle(t.dataset.do, t, wordsForActivity(part, current), render)) render();
      return;
    }

    if(act === 'finishActivity'){
      markDone(S.sectionId, S.partId, S.activityId);
      goUp(); return;
    }

    /* Flashcards */
    if(act === 'flashPrev'){ A.fIdx = Math.max(0, A.fIdx - 1); render(); return; }
    if(act === 'flashNext'){
      const words = wordsForActivity(part, getActivity(S.sectionId, S.partId, S.activityId));
      A.fIdx = Math.min(words.length - 1, A.fIdx + 1); render(); return;
    }

    /* Write the Words */
    if(act === 'wCheck'){ A.wChecked = true; render(); return; }
    if(act === 'wNext'){ A.wIdx++; A.wChecked = false; A.wValue = ''; render(); return; }
    if(act === 'wRestart'){ A.wIdx = 0; A.wChecked = false; A.wValue = ''; render(); return; }

    if(act === 'clearDraft'){ clearDraft(currentRoute(), A); render(); return; }
    if(act === 'resetAsk'){ S.confirmReset = true; render(); return; }
    if(act === 'resetConfirmYes'){
      clearAllProgress(); clearAllDrafts(); S.confirmReset = false; render(); return;
    }
    if(act === 'resetConfirmNo'){ S.confirmReset = false; render(); return; }
  });

  app.addEventListener('input', function(e){
    const t = e.target;
    const act = t.dataset.action;
    const current = getActivity(S.sectionId, S.partId, S.activityId);
    const engine = current && current.render ? RENDERERS[current.render] : null;
    if(engine && engine.input && engine.input(act, t)){ scheduleDraftSave(currentRoute(), A); return; }
    const ex = exerciseFor(current);
    if(ex && ex.input && ex.input(act, t)){
      if(act === 'frInput'){
        const counter = t.parentElement.querySelector('.wordCounter');
        if(counter){
          const n = t.value.trim() ? t.value.trim().split(/\s+/).length : 0;
          counter.textContent = n + ' words';
        }
      }
    }
    else if(act === 'wInput'){ A.wValue = t.value; }
    else return;
    scheduleDraftSave(currentRoute(), A);
  });

  /* Enter checks the answer, then moves on — so a whole drill can be done
     from the keyboard without reaching for the mouse. */
  app.addEventListener('keydown', function(e){
    if(e.key !== 'Enter') return;
    const act = e.target.dataset.action;
    if(act === 'wInput'){
      e.preventDefault();
      if(!A.wChecked) A.wChecked = true;
      else { A.wIdx++; A.wChecked = false; A.wValue = ''; }
      render();
    } else if(act === 'pInput'){
      e.preventDefault();
      if(!A.pChecked){
        A.pChecked = true;
        if(A.pValue.trim().toLowerCase() === A.pItems[A.pIdx].en.toLowerCase()) A.pScore++;
      } else { A.pIdx++; A.pValue = ''; A.pChecked = false; }
      render();
    }
  });
}

export { initEvents };
