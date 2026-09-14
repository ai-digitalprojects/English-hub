/* Hash routing over the content model.
   Navigation only writes location.hash; the hashchange handler is the sole
   thing that changes the view, which is what makes Back and Forward work. */

import { S, A, resetA } from './state.js';
import { getSection, getPart, hasParts, getActivity } from './content/model.js';
import { applyDraft } from './drafts.js';

function hashFor(route){
  if(!route || route.view === 'home') return '#/';
  if(route.view === 'progress') return '#/progress';
  const bits = [route.sectionId];
  if(route.partId) bits.push(route.partId);
  if(route.activityId) bits.push(route.activityId);
  return '#/' + bits.join('/');
}

function parseHash(raw){
  const clean = String(raw || '').replace(/^#\/?/, '').replace(/\/+$/, '');
  if(clean === '') return { view: 'home' };
  const seg = clean.split('/').filter(Boolean);
  if(seg[0] === 'progress' && seg.length === 1) return { view: 'progress' };

  const section = getSection(seg[0]);
  if(!section) return null;
  if(seg.length === 1) return { view: 'section', sectionId: section.id };

  if(hasParts(section)){
    const part = getPart(section.id, seg[1]);
    if(!part) return null;
    if(seg.length === 2) return { view: 'part', sectionId: section.id, partId: part.id };
    return getActivity(section.id, part.id, seg[2])
      ? { view: 'activity', sectionId: section.id, partId: part.id, activityId: seg[2] }
      : null;
  }

  /* Part-less section: the second segment is an activity. */
  if(seg.length === 2 && getActivity(section.id, null, seg[1]))
    return { view: 'activity', sectionId: section.id, activityId: seg[1] };
  return null;
}

function applyRoute(route){
  const nextActivity = route.activityId || null;
  /* Identity is the whole location, not just the activity name. */
  const same = !!nextActivity
    && nextActivity === S.activityId
    && route.sectionId === S.sectionId
    && (route.partId || null) === (S.partId || null);
  if(!same) resetA();

  S.view       = route.view;
  S.sectionId  = route.sectionId || null;
  S.partId     = route.partId || null;
  S.activityId = nextActivity;
  S.route      = route;
  if(!same && nextActivity) applyDraft(route, A);
}

function currentRoute(){ return S.route || { view: 'home' }; }

let onChange = () => {};

function navigate(route){
  const target = hashFor(route);
  if(location.hash === target || (target === '#/' && location.hash === '')){
    applyRoute(route); onChange(); return;
  }
  location.hash = target;
}

function startRouter(renderFn){
  onChange = renderFn;
  const handle = () => {
    const route = parseHash(location.hash);
    if(!route){
      if(location.hash !== '#/'){ location.replace('#/'); return; }
      applyRoute({ view: 'home' });
    } else applyRoute(route);
    renderFn();
  };
  window.addEventListener('hashchange', handle);
  handle();
}

export { startRouter, navigate, parseHash, hashFor, applyRoute, currentRoute };
