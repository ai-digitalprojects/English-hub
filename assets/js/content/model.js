/* The loaded Content Model v2, indexed for lookup.
   Everything the site shows comes from here. Adding Unit 2 later means adding
   a section to content/manifest.json — no code in this file changes. */

import { loadContent, partsOf } from './load.js';
import { EXERCISES, drillType, isDrill } from '../exercises/index.js';

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
function derivedActivities(part){
  const words = part.vocabulary || [];
  if(!words.length) return [];
  return EXERCISES.filter(ex => ex.needs(words)).map(ex => ({
    id: 'drill-' + ex.id,
    type: drillType(ex),
    title: ex.title,
    skill: ex.skill,
    level: ex.level,
    lane: 'practice',
    origin: 'word-list',
    generated: true,
    status: 'ready'
  }));
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
  const test = PLAYABLE[activity.type];
  return !!(test && test(part, activity));
}

/* Say exactly what is missing. A catalogued book exercise is locked because
   its questions were never transcribed, not because the site lacks a screen. */
function whyNotPlayable(part, activity){
  if(!PLAYABLE[activity.type]){
    const s = activity.source;
    if(s){
      const book = s.book === 'students' ? 'Book' : 'Workbook';
      const where = book + ' p.' + s.page + (s.exercise ? ', exercise ' + s.exercise : '');
      return 'The questions from ' + where + ' have not been added to the site yet.';
    }
    return 'This exercise has not been added to the site yet.';
  }
  if(activity.type === 'write-the-words')
    return 'Needs Hebrew for at least four of these words — not recorded yet.';
  return 'Not available yet.';
}

function playableActivities(part){
  return activitiesOf(part).filter(a => isPlayable(part, a));
}

export {
  initModel, manifest, sections, getSection, getPart, getActivity,
  hasParts, partKey, isPlayable, whyNotPlayable, playableActivities, wordsForActivity,
  derivedActivities, activitiesOf
};
