import { S } from './state.js';
import { UNITS } from './data/units.js';
import { hasGrammar, hasReading, hasClassroom } from './availability.js';

function unitOverallPct(u){
  const st = S.units[u];
  const unit = UNITS[u];
  let keys = ['learnWords','vocabPractice','sentenceBuilder','speak','write','challenge'];
  if(hasClassroom(unit)) keys.push('classroomEnglish');
  if(hasGrammar(unit)) keys.push('grammarLab');
  if(hasReading(unit)) keys.push('read');
  let done=0;
  keys.forEach(k=>{ if(st[k]) done++; });
  if(st.checkYourself.done) done++;
  const total = keys.length+1;
  return Math.round(done/total*100);
}
function earnedBadges(){
  const b = {};
  ['gs','japan'].forEach(u=>{
    const st = S.units[u];
    if(st.vocabPractice) b.vocabMaster = true;
    if(st.sentenceBuilder) b.sentenceBuilderB = true;
    if(st.grammarLab) b.grammarDetective = true;
    if(st.read) b.readingExplorer = true;
    if(st.speak) b.englishSpeaker = true;
    if(st.write) b.englishWriter = true;
    if(st.checkYourself.done && st.checkYourself.score>=9){
      if(u==='gs') b.unitCompletedGs = true; else b.unitCompletedJapan = true;
    }
  });
  return b;
}

export { unitOverallPct, earnedBadges };
