import { S } from '../state.js';
import { UNITS } from '../data/units.js';
import { heLine } from '../helpers.js';
import { activityNeighbours, slugFor } from '../activity-defs.js';
import { sectionById } from '../data/manifest.js';
import { hashFor, currentRoute } from '../router.js';
import { hasDraft } from '../drafts.js';
import { renderFlashcards, renderVocabPractice, renderClassroomEnglish } from '../activities/vocabulary.js';
import { renderSentenceBuilder, renderGrammarLab } from '../activities/grammar.js';
import { renderSpeak, renderReading, renderWrite, renderChallenge } from '../activities/skills.js';
import { renderQuiz } from '../activities/quiz.js';

/* Previous / Next move through the unit's activity order. They are links, so
   each one pushes a real history entry that Back can step through. */
function activityFooter(){
  const section = sectionById(S.sectionId);
  if(!section) return '';
  const { prev, next } = activityNeighbours(UNITS[S.unitId], S.unitId, S.activityId);
  const link = (def, dir) => {
    if(!def) return '<span></span>';
    const href = hashFor({ view:'activity', sectionId:section.id, partId:S.partId, activityKey:def.key });
    const arrow = dir === 'prev' ? '←' : '→';
    const label = dir === 'prev' ? `${arrow} ${def.title}` : `${def.title} ${arrow}`;
    return `<a class="stepLink ${dir}" href="${href}">${label}</a>`;
  };
  return `<div class="stepNav">${link(prev,'prev')}${link(next,'next')}</div>`;
}

/* Offered only when this activity actually has saved text to throw away. */
function draftNotice(){
  if(!hasDraft(currentRoute())) return '';
  return `<div class="draftRow">
    <span class="draftFlag">✓ Your writing is saved on this device</span>
    <button class="draftClear" data-action="clearDraft">Clear my draft</button>
  </div>`;
}

function renderActivity(){
  const u = S.unitId, act = S.activityId, unit = UNITS[u];
  let title='', sub='', heSub='', body='';
  const writeHe = u==='gs' ? 'כתבו 4 משפטים על עצמכם.' : 'כתבו 4-5 משפטים על חבר/ה.';
  switch(act){
    case 'learnWords': title='Learn the Words'; sub='Flip through the vocabulary cards below.'; heSub='עברו על כרטיסיות אוצר המילים למטה.'; body = renderFlashcards(unit); break;
    case 'vocabPractice': title='Vocabulary Practice'; sub='Match the words, then try the practice questions.'; heSub='התאימו את המילים, ולאחר מכן נסו את שאלות התרגול.'; body = renderVocabPractice(unit); break;
    case 'classroomEnglish': title='Classroom English'; sub='Instructions you\'ll hear every lesson.'; heSub='הוראות שתשמעו בכל שיעור.'; body = renderClassroomEnglish(unit); break;
    case 'sentenceBuilder': title='Build a Sentence'; sub='Put the scrambled words in the right order.'; heSub='סדרו את המילים המעורבבות בסדר הנכון.'; body = renderSentenceBuilder(unit); break;
    case 'grammarLab': title='Grammar Lab'; sub='Learn the rule. Try it. Use it.'; heSub='למדו את הכלל. נסו אותו. השתמשו בו.'; body = renderGrammarLab(unit); break;
    case 'speak': title='Speak English'; sub='Answer each question out loud, in full sentences.'; heSub='ענו על כל שאלה בקול, במשפטים מלאים.'; body = renderSpeak(unit); break;
    case 'read': title='Read & Understand'; sub='Read the text, then answer the questions.'; heSub='קראו את הטקסט וענו על השאלות.'; body = renderReading(unit); break;
    case 'write': title='Write It'; sub=unit.writing.prompt; heSub=writeHe; body = renderWrite(unit); break;
    case 'challenge': title='Challenge'; sub='A few trickier tasks to test yourself.'; heSub='כמה משימות מאתגרות לבחינה עצמית.'; body = renderChallenge(unit); break;
    case 'checkYourself': title = u==='gs' ? 'Check Yourself' : 'Final Check'; sub='10 questions covering everything in this unit.'; heSub='10 שאלות שמכסות את כל היחידה.'; body = renderQuiz(unit); break;
  }
  return `<div class="card"><h2>${title}</h2><div class="actSub">${sub}</div>${heLine(heSub)}${body}${draftNotice()}</div>${activityFooter()}`;
}

export { renderActivity };
