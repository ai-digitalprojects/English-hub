/* Exercise registry.

   These are drills the site builds over the book's own word list. They are not
   the printed workbook exercises — those stay locked until their items are
   transcribed into the content model — so they never cite a workbook page.
   Each module declares what data it needs; a drill only appears for a part
   that actually has that data. */

import matchWords from './match-words.js';
import chooseMeaning from './choose-meaning.js';
import completeSentence from './complete-sentence.js';
import buildSentence from './build-sentence.js';
import sortGroups from './sort-groups.js';
import wordPuzzle from './word-puzzle.js';
import freeWriting from './free-writing.js';

const EXERCISES = [
  matchWords,
  chooseMeaning,
  completeSentence,
  sortGroups,
  wordPuzzle,
  buildSentence,
  freeWriting
];

const BY_ID = EXERCISES.reduce((m, ex) => { m[ex.id] = ex; return m; }, {});

const PREFIX = 'drill:';

function isDrill(activity){ return !!activity && String(activity.type).indexOf(PREFIX) === 0; }
function exerciseFor(activity){ return isDrill(activity) ? (BY_ID[activity.type.slice(PREFIX.length)] || null) : null; }
function drillType(ex){ return PREFIX + ex.id; }

export { EXERCISES, BY_ID, PREFIX, isDrill, exerciseFor, drillType };
