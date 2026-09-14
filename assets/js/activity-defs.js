/* The ordered activity list for a unit, plus URL slugs.
   Single source of truth: the unit grid, the router, the breadcrumbs and the
   Previous/Next buttons all read this, so they can never disagree. */

import { hasGrammar, hasReading, hasClassroom } from './availability.js';

const SLUGS = {
  learnWords:       'learn-words',
  vocabPractice:    'vocabulary-practice',
  classroomEnglish: 'classroom-english',
  sentenceBuilder:  'build-a-sentence',
  grammarLab:       'grammar-lab',
  speak:            'speak',
  read:             'read',
  write:            'write',
  challenge:        'challenge',
  checkYourself:    'check-yourself'
};
const KEYS_BY_SLUG = Object.keys(SLUGS).reduce((m,k)=>{ m[SLUGS[k]] = k; return m; }, {});

function slugFor(key){ return SLUGS[key] || key; }
function keyForSlug(slug){ return KEYS_BY_SLUG[slug] || null; }

/* Only activities the unit actually has content for. */
function activityDefs(unit, unitKey){
  const list = [];
  list.push({key:'learnWords', icon:'🧠', title:'Learn the Words', desc:'Flashcards with meaning & audio', he:'כרטיסיות עם משמעות והקראה', color:'blue'});
  list.push({key:'vocabPractice', icon:'🎮', title:'Vocabulary Practice', desc:'Match & apply the words', he:'התאימו והשתמשו במילים', color:'blue'});
  if(hasClassroom(unit)) list.push({key:'classroomEnglish', icon:'🏫', title:'Classroom English', desc:'Useful instructions & phrases', he:'ביטויים והוראות שימושיים', color:'blue'});
  list.push({key:'sentenceBuilder', icon:'🧩', title:'Build a Sentence', desc:'Put the words in order', he:'סדרו את המילים במשפט', color:'purple'});
  if(hasGrammar(unit)) list.push({key:'grammarLab', icon:'🔧', title:'Grammar Lab', desc:'Learn the rule. Try it. Use it.', he:'למדו את הכלל. נסו אותו. השתמשו בו.', color:'green'});
  list.push({key:'speak', icon:'🎤', title:'Speak English', desc:'Answer aloud in full sentences', he:'ענו בקול במשפטים מלאים', color:'pink'});
  if(hasReading(unit)) list.push({key:'read', icon:'📖', title:'Read & Understand', desc:'Read a short text and answer', he:'קראו טקסט קצר וענו על שאלות', color:'orange'});
  list.push({key:'write', icon:'✍️', title:'Write It', desc:'Write your own sentences', he:'כתבו משפטים משלכם', color:'pink'});
  list.push({key:'challenge', icon:'🏆', title:'Challenge', desc:'Test yourself with tricky tasks', he:'בחנו את עצמכם במשימות מאתגרות', color:'gold'});
  list.push({key:'checkYourself', icon:'✅', title: unitKey==='gs' ? 'Check Yourself' : 'Final Check', desc:'10-question quiz with a score', he:'בוחן עם ציון', color:'gold'});
  return list;
}

function activityDef(unit, unitKey, key){
  return activityDefs(unit, unitKey).find(a => a.key === key) || null;
}

/* Neighbours in the activity order, for the Previous / Next buttons. */
function activityNeighbours(unit, unitKey, key){
  const list = activityDefs(unit, unitKey);
  const i = list.findIndex(a => a.key === key);
  if(i < 0) return { prev:null, next:null };
  return { prev: i > 0 ? list[i-1] : null, next: i < list.length-1 ? list[i+1] : null };
}

export { activityDefs, activityDef, activityNeighbours, slugFor, keyForSlug };
