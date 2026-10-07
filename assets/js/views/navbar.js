/* Top bar. "Back" walks one level up the hierarchy; the browser's own Back
   walks the history instead. */
import { S } from '../state.js';
import { goHome, goUp, openProgress } from '../nav.js';

/* Somewhere to practise the words out loud before a dictation. It lives in the
   top bar rather than on a section screen: it is a site off this one, not an
   exercise from the book, so it belongs with the navigation and never with the
   numbered sequence. Nothing here is marked done and nothing counts towards a
   total — it is a link, not an activity.

   The label is written out in full where there is room and shortened to the
   one word on a phone, where the Hebrew also moves under the English instead of
   beside it. Both languages are carried either way. */
const DICTATION = 'https://www.hachtava.co.il/';

function dictationLink(){
  const a = document.createElement('a');
  a.className = 'navbtn navDict';
  a.href = DICTATION;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  /* Only one of the two English spans is ever displayed; display:none keeps the
     other out of the accessibility tree as well, so nothing is read twice. */
  a.innerHTML =
    '<span class="navMain">' +
      '<span class="navIcon" aria-hidden="true">✍️</span>' +
      '<span class="navEn navLong">Dictation Practice</span>' +
      '<span class="navEn navShort">Dictation</span>' +
    '</span>' +
    '<span class="navHe" dir="rtl" lang="he">תרגול הכתבה</span>';
  return a;
}

function renderNavBtns(){
  const el = document.getElementById('navBtns');
  el.innerHTML = '';
  if(S.view !== 'home'){
    const back = document.createElement('button');
    back.className = 'navbtn'; back.textContent = '← Back';
    back.onclick = goUp;
    el.appendChild(back);
  }
  const home = document.createElement('button');
  home.className = 'navbtn'; home.textContent = '🏠 Home';
  home.onclick = goHome;
  el.appendChild(home);
  el.appendChild(dictationLink());
  const prog = document.createElement('button');
  prog.className = 'navbtn'; prog.textContent = '⭐ My Progress';
  prog.onclick = openProgress;
  el.appendChild(prog);
}

export { renderNavBtns };
