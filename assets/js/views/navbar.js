/* Top bar. "Back" walks one level up the hierarchy; the browser's own Back
   walks the history instead. */
import { S } from '../state.js';
import { goHome, goUp, openProgress } from '../nav.js';

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
  const prog = document.createElement('button');
  prog.className = 'navbtn'; prog.textContent = '⭐ My Progress';
  prog.onclick = openProgress;
  el.appendChild(prog);
}

export { renderNavBtns };
