/* What a unit can actually offer, derived from the content itself rather than
   from hand-maintained flags. The previous `unit.hasGrammar` / `unit.hasReading`
   were read in five places but never set anywhere, so Grammar Lab and Reading
   were permanently hidden and Challenge crashed. Phase 4 will extend this to Parts. */

function hasGrammar(unit){ return !!(unit && unit.grammar); }
function hasReading(unit){ return !!(unit && unit.reading); }
function hasClassroom(unit){ return !!(unit && unit.classroom); }

/* Challenge tabs, in display order, limited to the ones this unit has data for. */
function challengeTabs(unit){
  const c = (unit && unit.challenge) || {};
  const defs = [
    ['detective',  'Grammar Detective'],
    ['situations', 'Situations'],
    ['vocabPower', 'Vocabulary Power'],
    ['create',     'Create']
  ];
  const present = { detective:!!c.detective, situations:!!c.situations,
                    vocabPower:!!c.vocabPower, create:!!c.createPrompt };
  return defs.filter(d => present[d[0]]).map(d => ({ key:d[0], label:d[1] }));
}

export { hasGrammar, hasReading, hasClassroom, challengeTabs };
