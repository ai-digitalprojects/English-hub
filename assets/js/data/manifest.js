/* The site's navigable structure, independent of the activity content itself.
   The router, breadcrumbs and prev/next all read from here.

   `parts` is the Unit -> Part level. It is empty for now: Phase 4 fills it with
   Part 1 All About Japan, Part 2 Snow Monkeys, Part 3 Let's Go, Part 4 Made in
   Japan, Part 5 Story and Unit Check. Every layer below already handles a
   populated `parts` array, so Phase 4 is a data change, not a code change. */

const SECTIONS = [
  {
    id: 'getting-started',
    unitKey: 'gs',
    label: 'Getting Started',
    parts: []
  },
  {
    id: 'unit-1',
    unitKey: 'japan',
    label: 'Unit 1',
    parts: []
  }
];

function sectionById(id){ return SECTIONS.find(s => s.id === id) || null; }
function sectionByUnitKey(key){ return SECTIONS.find(s => s.unitKey === key) || null; }
function partById(section, id){ return (section && section.parts.find(p => p.id === id)) || null; }

export { SECTIONS, sectionById, sectionByUnitKey, partById };
