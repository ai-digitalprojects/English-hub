/* The loaded Content Model v2, indexed for lookup.
   Everything the site shows comes from here. Adding Unit 2 later means adding
   a section to content/manifest.json — no code in this file changes. */

import { loadContent, partsOf } from './load.js';
import { EXERCISES, drillType, isDrill } from '../exercises/index.js';
import { RENDERERS } from '../exercises/engine.js';

let MODEL = null;          // { manifest, sections }
const SECTIONS = new Map();
const PARTS = new Map();   // "sectionId/partId" -> part

/* A section with no parts still gets one pseudo-part so every screen below
   can treat both shapes identically. Its id is null. */
function indexModel(model){
  SECTIONS.clear(); PARTS.clear();
  model.sections.forEach(section => {
    SECTIONS.set(section.id, section);
    partsOf(section).forEach(part => {
      PARTS.set(partKey(section.id, part.id), part);
    });
  });
}

function partKey(sectionId, partId){ return sectionId + '/' + (partId || '-'); }

async function initModel(){
  MODEL = await loadContent();
  indexModel(MODEL);
  return MODEL;
}

function manifest(){ return MODEL ? MODEL.manifest : null; }
function sections(){ return MODEL ? MODEL.sections : []; }
function getSection(id){ return SECTIONS.get(id) || null; }
function getPart(sectionId, partId){ return PARTS.get(partKey(sectionId, partId)) || null; }

/* True when the section presents a Part level of its own (Unit 1 does,
   Getting Started does not). */
function hasParts(section){ return !!(section && section.parts && section.parts.length); }

/* Drills the site can build over this part's word list. They carry no
   workbook page because they are not workbook exercises. */
/* The shape of practice a drill offers, so a part is not handed the same
   shape twice. */
const DRILL_FORMAT = {
  'match-words': 'pairs',
  'choose-meaning': 'mc',
  'complete-sentence': 'mc',
  'sort-groups': 'bins',
  'word-puzzle': 'unscramble',
  'build-sentence': 'build',
  'free-writing': 'writing'
};
const DRILL_STEP = { pairs:2, mc:3, unscramble:4, bins:5, build:6, writing:7 };

function derivedActivities(part){
  const words = part.vocabulary || [];
  if(!words.length) return [];

  /* Whatever the book already gives this part counts as covered — a drill is
     only worth adding when it practises in a shape the part does not have. */
  const covered = new Set((part.activities || []).map(a => a.render).filter(Boolean));

  const out = [];
  EXERCISES.forEach(ex => {
    if(!ex.needs(words)) return;
    const format = DRILL_FORMAT[ex.id] || ex.id;
    if(covered.has(format)) return;
    covered.add(format);
    out.push({
      id: 'drill-' + ex.id,
      type: drillType(ex),
      title: ex.title,
      skill: ex.skill,
      level: ex.level,
      lane: 'practice',
      category: ex.skill === 'writing' ? 'writing' : 'vocabulary',
      step: DRILL_STEP[format] || 5,
      origin: 'word-list',
      generated: true,
      status: 'ready'
    });
  });
  return out;
}

/* Everything on a part: the book's catalogued exercises plus the drills. */
function activitiesOf(part){
  return (part.activities || []).concat(derivedActivities(part));
}

function getActivity(sectionId, partId, activityId){
  const part = getPart(sectionId, partId);
  if(!part) return null;
  return activitiesOf(part).find(a => a.id === activityId) || null;
}

/* ---- what the UI can actually run ----
   An activity is playable when a renderer exists for its type AND the content
   it needs is present. Everything else is listed with its details but is not
   opened, so the site never promises something it cannot deliver. */
/* A part can hold more than one word group (Part 3 has Word Power 1 and 2,
   Part 5 has New Words 1 and 2). Each activity works on the group it is
   printed with, matched by the book page it cites. */
function wordsForActivity(part, activity){
  const all = part.vocabulary || [];
  if(activity && activity.origin === 'word-list') return all;
  const src = activity && activity.source;
  if(!src) return all;
  const hit = src.book === 'students'
    ? all.filter(w => w.source && w.source.page === src.page)
    : all.filter(w => (w.alsoOn || []).some(x => x.page === src.page));
  return hit.length ? hit : all;
}

const PLAYABLE = {
  'flashcards': (part, a) => wordsForActivity(part, a).length > 0,
  'write-the-words': (part, a) => wordsForActivity(part, a).filter(w => w.he).length >= 4
};

function isPlayable(part, activity){
  if(isDrill(activity)) return true;      // a drill only exists when its data does
  if(activity.render && RENDERERS[activity.render] && (activity.items || []).length) return true;
  const test = PLAYABLE[activity.type];
  return !!(test && test(part, activity));
}

/* Nothing a student can see is unplayable any more, so this is only a guard
   for content added later without a renderer. Such an activity is hidden
   rather than shown greyed out. */
function whyNotPlayable(){ return 'Not available yet.'; }

function playableActivities(part){
  return activitiesOf(part).filter(a => isPlayable(part, a));
}

/* What the student sees. Anything without a working renderer is left out
   entirely rather than displayed as a dead card. */
function visibleActivities(part){
  return playableActivities(part);
}

export {
  initModel, manifest, sections, getSection, getPart, getActivity,
  hasParts, partKey, isPlayable, whyNotPlayable, playableActivities, wordsForActivity,
  derivedActivities, activitiesOf, visibleActivities
};
