import { S, resetA } from './state.js';
import { render } from './render.js';

function goHome(){ S.view='home'; S.unitId=null; S.activityId=null; render(); }
function openUnit(id){ S.view='unit'; S.unitId=id; S.activityId=null; render(); }
function openActivity(actId){
  S.view='activity'; S.activityId=actId; resetA(); render();
}
function backToUnit(){ S.view='unit'; S.activityId=null; resetA(); render(); }
function openProgress(){ S.view='progress'; render(); }

export { goHome, openUnit, openActivity, backToUnit, openProgress };
