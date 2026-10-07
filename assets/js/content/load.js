/* Content Model v2 loader.
   Reads content/manifest.json and the section files it points to, then hands
   back one object with every section resolved. Nothing here renders anything —
   Phase 4 is what wires the app onto this model. */

const BASE = 'content/';

async function fetchJson(path){
  const res = await fetch(BASE + path, { cache: 'no-cache' });
  if(!res.ok) throw new Error('Could not load ' + BASE + path + ' (' + res.status + ')');
  return res.json();
}

async function loadContent(){
  const manifest = await fetchJson('manifest.json');
  const sections = await Promise.all(manifest.sections.map(s => fetchJson(s.file)));
  return { manifest, sections };
}

/* --- shape helpers, so callers never hand-roll these walks --- */

/* Every part of a section. A section with no parts yields one pseudo-part
   holding its own content, so callers can treat both shapes the same way. */
function partsOf(section){
  if(section.parts && section.parts.length) return section.parts;
  return [{
    id: null, number: null, label: section.label, title: section.title,
    icon: section.icon, color: section.color, sources: section.sources,
    vocabulary: section.vocabulary || [], grammar: section.grammar || [],
    activities: section.activities || [], skills: section.skills || {},
    phonics: section.phonics || null,
    /* A section can turn off a drill it would otherwise be given. The field
       has to be copied across explicitly: a pseudo-part is built field by
       field, so anything left out here never reaches the model. */
    skipDrills: section.skipDrills || []
  }];
}

function allVocabulary(section){
  return partsOf(section).reduce((acc, p) => acc.concat(p.vocabulary || []), []);
}

function allActivities(section){
  return partsOf(section).reduce((acc, p) => acc.concat(p.activities || []), []);
}

/* Activities split into the two lanes the site will present. */
function lanes(part){
  const list = part.activities || [];
  return {
    learn:    list.filter(a => a.lane === 'learn'),
    practice: list.filter(a => a.lane === 'practice')
  };
}

function activitiesAtLevel(part, level){
  return (part.activities || []).filter(a => a.level === level);
}

/* A skill block counts as available only when the model says it is active. */
function skillActive(part, skill){
  const s = part.skills && part.skills[skill];
  return !!(s && s.active);
}

export { loadContent, partsOf, allVocabulary, allActivities, lanes, activitiesAtLevel, skillActive };
