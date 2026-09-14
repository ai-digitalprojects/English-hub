/* Navigation intents. Each one just asks the router for a route; the router
   writes the hash and the hashchange handler re-renders. */
import { S } from './state.js';
import { navigate } from './router.js';
import { sectionByUnitKey } from './data/manifest.js';

function goHome(){ navigate({ view:'home' }); }
function openSection(sectionId){ navigate({ view:'section', sectionId }); }
function openUnit(unitKey){
  const section = sectionByUnitKey(unitKey);
  if(section) openSection(section.id);
}
function openActivity(actKey){
  navigate({ view:'activity', sectionId:S.sectionId, partId:S.partId, activityKey:actKey });
}
function backToUnit(){ navigate({ view:'section', sectionId:S.sectionId }); }
function openProgress(){ navigate({ view:'progress' }); }

export { goHome, openUnit, openSection, openActivity, backToUnit, openProgress };
