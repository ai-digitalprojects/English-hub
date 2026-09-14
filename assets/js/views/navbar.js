/* Top-bar navigation buttons.
   Note: render.js -> navbar.js -> nav.js -> render.js is a module cycle.
   It is safe: `render` is a hoisted function declaration, so the binding is
   initialised before any of these click handlers can run. */
import { S } from '../state.js';
import { goHome, backToUnit, openProgress } from '../nav.js';

function renderNavBtns(){
  const el = document.getElementById('navBtns');
  el.innerHTML = '';
  if(S.view!=='home'){
    const back = document.createElement('button');
    back.className='navbtn'; back.textContent='← Back';
    back.onclick = ()=>{ if(S.view==='activity') backToUnit(); else goHome(); };
    el.appendChild(back);
  }
  const home = document.createElement('button');
  home.className='navbtn'; home.textContent='🏠 Home';
  home.onclick = goHome;
  el.appendChild(home);
  const prog = document.createElement('button');
  prog.className='navbtn'; prog.textContent='⭐ My Progress';
  prog.onclick = openProgress;
  el.appendChild(prog);
}

export { renderNavBtns };
