/* Top-bar buttons. "Back" walks one level up the hierarchy, which is
   predictable; the browser's own Back button walks the history instead. */
import { S } from '../state.js';
import { goHome, backToUnit, openSection, openProgress } from '../nav.js';

function renderNavBtns(){
  const el = document.getElementById('navBtns');
  el.innerHTML = '';
  if(S.view!=='home'){
    const back = document.createElement('button');
    back.className='navbtn'; back.textContent='← Back';
    back.onclick = ()=>{
      if(S.view==='activity'){ S.partId ? openSection(S.sectionId) : backToUnit(); }
      else if(S.view==='part'){ openSection(S.sectionId); }
      else goHome();
    };
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
