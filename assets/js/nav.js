import { S } from './state.js';
import { navigate } from './router.js';

function goHome(){ navigate({ view:'home' }); }
function openSection(sectionId){ navigate({ view:'section', sectionId }); }
function openPart(sectionId, partId){ navigate({ view:'part', sectionId, partId }); }
function openActivity(activityId){
  navigate({ view:'activity', sectionId:S.sectionId, partId:S.partId, activityId });
}
function openProgress(){ navigate({ view:'progress' }); }

/* One step up the hierarchy. */
function goUp(){
  if(S.view === 'activity') S.partId ? openPart(S.sectionId, S.partId) : openSection(S.sectionId);
  else if(S.view === 'part') openSection(S.sectionId);
  else goHome();
}

export { goHome, openSection, openPart, openActivity, openProgress, goUp };
