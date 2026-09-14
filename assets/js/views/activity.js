import { S } from '../state.js';
import { UNITS } from '../data/units.js';
import { heLine } from '../helpers.js';
import { renderFlashcards, renderVocabPractice, renderClassroomEnglish } from '../activities/vocabulary.js';
import { renderSentenceBuilder, renderGrammarLab } from '../activities/grammar.js';
import { renderSpeak, renderReading, renderWrite, renderChallenge } from '../activities/skills.js';
import { renderQuiz } from '../activities/quiz.js';

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
  return `<div class="card"><h2>${title}</h2><div class="actSub">${sub}</div>${heLine(heSub)}${body}</div>`;
}

export { renderActivity };
