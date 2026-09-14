import { S, colorBg } from '../state.js';
import { UNITS } from '../data/units.js';
import { heLine } from '../helpers.js';

function activityStatusIcon(u, key){
  const st = S.units[u];
  if(key==='checkYourself') return st.checkYourself.done ? (st.checkYourself.score>=9?'⭐':'✓') : '○';
  return st[key] ? '✓' : '○';
}
function renderUnit(){
  const u = S.unitId;
  const unit = UNITS[u];
  const cards = [];
  cards.push({key:'learnWords', icon:'🧠', title:'Learn the Words', desc:'Flashcards with meaning & audio', he:'כרטיסיות עם משמעות והקראה', color:'blue'});
  cards.push({key:'vocabPractice', icon:'🎮', title:'Vocabulary Practice', desc:'Match & apply the words', he:'התאימו והשתמשו במילים', color:'blue'});
  if(u==='gs') cards.push({key:'classroomEnglish', icon:'🏫', title:'Classroom English', desc:'Useful instructions & phrases', he:'ביטויים והוראות שימושיים', color:'blue'});
  cards.push({key:'sentenceBuilder', icon:'🧩', title:'Build a Sentence', desc:'Put the words in order', he:'סדרו את המילים במשפט', color:'purple'});
  if(unit.hasGrammar) cards.push({key:'grammarLab', icon:'🔧', title:'Grammar Lab', desc:'Learn the rule. Try it. Use it.', he:'למדו את הכלל. נסו אותו. השתמשו בו.', color:'green'});
  cards.push({key:'speak', icon:'🎤', title:'Speak English', desc:'Answer aloud in full sentences', he:'ענו בקול במשפטים מלאים', color:'pink'});
  if(unit.hasReading) cards.push({key:'read', icon:'📖', title:'Read & Understand', desc:'Read a short text and answer', he:'קראו טקסט קצר וענו על שאלות', color:'orange'});
  cards.push({key:'write', icon:'✍️', title:'Write It', desc:'Write your own sentences', he:'כתבו משפטים משלכם', color:'pink'});
  cards.push({key:'challenge', icon:'🏆', title:'Challenge', desc:'Test yourself with tricky tasks', he:'בחנו את עצמכם במשימות מאתגרות', color:'gold'});
  cards.push({key:'checkYourself', icon:'✅', title: u==='gs' ? 'Check Yourself' : 'Final Check', desc:'10-question quiz with a score', he:'בוחן עם ציון', color:'gold'});

  return `
  <div class="unitHead">
    <div class="icon">${unit.icon}</div>
    <div><h2>${unit.title}</h2><p>${unit.subtitle}</p></div>
  </div>
  <div class="actGrid">
    ${cards.map(c=>`
      <div class="actCard" style="background:${colorBg(c.color)}" data-action="openActivity" data-act="${c.key}">
        <div class="status">${activityStatusIcon(u,c.key)}</div>
        <div class="icon">${c.icon}</div>
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        ${heLine(c.he)}
      </div>`).join('')}
  </div>`;
}

export { renderUnit };
