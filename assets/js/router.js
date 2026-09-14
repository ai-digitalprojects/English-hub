/* Hash routing.
   Routes are the single source of truth for what is on screen: every
   navigation writes location.hash, and the hashchange handler is the only
   thing that mutates the view. That is what makes the browser's Back and
   Forward buttons work without any extra bookkeeping.

   Grammar:
     #/                                  home
     #/progress                          progress page
     #/<section>                         section overview
     #/<section>/<part>                  part overview        (Phase 4)
     #/<section>/<activity>              activity, part-less section
     #/<section>/<part>/<activity>       activity inside a part (Phase 4)  */

import { S, A, resetA } from './state.js';
import { UNITS } from './data/units.js';
import { sectionById, partById } from './data/manifest.js';
import { activityDefs, slugFor, keyForSlug } from './activity-defs.js';
import { applyDraft } from './drafts.js';

/* ---- route -> hash ---- */
function hashFor(route){
  if(!route || route.view === 'home') return '#/';
  if(route.view === 'progress') return '#/progress';
  const bits = [route.sectionId];
  if(route.partId) bits.push(route.partId);
  if(route.activityKey) bits.push(slugFor(route.activityKey));
  return '#/' + bits.join('/');
}

/* ---- hash -> route (null when the hash names nothing that exists) ---- */
function parseHash(raw){
  const clean = String(raw || '').replace(/^#\/?/, '').replace(/\/+$/, '');
  if(clean === '') return { view:'home' };
  const seg = clean.split('/').filter(Boolean);
  if(seg[0] === 'progress' && seg.length === 1) return { view:'progress' };

  const section = sectionById(seg[0]);
  if(!section) return null;
  const unit = UNITS[section.unitKey];
  if(!unit) return null;

  if(seg.length === 1) return { view:'section', sectionId:section.id };

  const part = partById(section, seg[1]);
  if(part){
    if(seg.length === 2) return { view:'part', sectionId:section.id, partId:part.id };
    const key = resolveActivity(unit, section.unitKey, seg[2]);
    return key ? { view:'activity', sectionId:section.id, partId:part.id, activityKey:key } : null;
  }

  /* No part by that name. In a part-less section the segment is an activity. */
  if(section.parts.length === 0 && seg.length === 2){
    const key = resolveActivity(unit, section.unitKey, seg[1]);
    if(key) return { view:'activity', sectionId:section.id, activityKey:key };
  }
  return null;
}

/* An activity slug only resolves if this unit actually offers that activity. */
function resolveActivity(unit, unitKey, slug){
  const key = keyForSlug(slug);
  if(!key) return null;
  return activityDefs(unit, unitKey).some(a => a.key === key) ? key : null;
}

/* ---- route -> app state ---- */
function applyRoute(route){
  const section = route.sectionId ? sectionById(route.sectionId) : null;
  const nextActivity = route.activityKey || null;
  /* Identity is the whole location, not just the activity name: Getting
     Started's "Write It" and Unit 1's "Write It" share a key but are two
     different activities, and their in-progress state must not bleed across. */
  const sameActivity = !!nextActivity
    && nextActivity === S.activityId
    && route.sectionId === S.sectionId
    && (route.partId || null) === (S.partId || null);
  const changed = !sameActivity;
  if(changed) resetA();

  S.view       = route.view === 'section' ? 'unit' : route.view;
  S.sectionId  = route.sectionId || null;
  S.partId     = route.partId || null;
  S.unitId     = section ? section.unitKey : null;
  S.activityId = nextActivity;
  S.route      = route;
  /* Restore any saved text for this activity before it renders. */
  if(changed && nextActivity) applyDraft(route, A);
}

function currentRoute(){
  return S.route || { view:'home' };
}

/* Navigating only writes the hash; onHashChange does the rest. When the hash
   is already what we want, hashchange will not fire, so render directly. */
let onChange = () => {};

function navigate(route){
  const target = hashFor(route);
  if(location.hash === target || (target === '#/' && location.hash === '')){
    applyRoute(route);
    onChange();
    return;
  }
  location.hash = target;
}

function startRouter(renderFn){
  onChange = renderFn;
  const handle = () => {
    const route = parseHash(location.hash);
    if(!route){
      /* Unknown or stale URL: fall back to home rather than a blank screen. */
      if(location.hash !== '#/'){ location.replace('#/'); return; }
      applyRoute({ view:'home' });
    } else {
      applyRoute(route);
    }
    renderFn();
  };
  window.addEventListener('hashchange', handle);
  handle();
}

export { startRouter, navigate, parseHash, hashFor, applyRoute, currentRoute };
