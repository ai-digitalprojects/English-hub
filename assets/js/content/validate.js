/* Integrity checks for Content Model v2.
   Run against the loaded model; returns problems rather than throwing, so a
   single bad entry can be reported instead of taking the page down. */

import { partsOf } from './load.js';

const SKILLS = ['vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'phonics'];
const LANES = ['learn', 'practice'];
const BOOKS = ['students', 'workbook'];

function validate(model){
  const errors = [], warnings = [], stats = {
    sections: 0, parts: 0, words: 0, activities: 0, grammar: 0,
    withHebrew: 0, withArabic: 0, withDefinition: 0, needsReview: 0,
    byLevel: { 1:0, 2:0, 3:0, unstarred:0 },
    inactiveSkills: []
  };
  const ids = new Set();

  model.sections.forEach(section => {
    stats.sections++;
    if(!section.id) errors.push('A section has no id');

    partsOf(section).forEach(part => {
      stats.parts++;
      const where = section.id + (part.id ? '/' + part.id : '');

      (part.vocabulary || []).forEach(w => {
        stats.words++;
        if(!w.en) errors.push(where + ': a word has no English');
        if(w.he) stats.withHebrew++;
        if(w.ar) stats.withArabic++;
        if(w.definition) stats.withDefinition++;
        if(w.needsReview) stats.needsReview++;
        if(!w.source || BOOKS.indexOf(w.source.book) < 0)
          errors.push(where + '/' + w.en + ': missing or unknown source book');
        if(!w.source || typeof w.source.page !== 'number')
          errors.push(where + '/' + w.en + ': missing page number');
      });

      (part.activities || []).forEach(a => {
        stats.activities++;
        const key = where + '#' + a.id;
        if(ids.has(key)) errors.push('Duplicate activity id: ' + key);
        ids.add(key);
        if(SKILLS.indexOf(a.skill) < 0) errors.push(key + ': unknown skill "' + a.skill + '"');
        if(LANES.indexOf(a.lane) < 0) errors.push(key + ': unknown lane "' + a.lane + '"');
        if(!a.type) errors.push(key + ': no activity type');
        if(!a.source || BOOKS.indexOf(a.source.book) < 0) errors.push(key + ': bad source');
        if(a.level === null || a.level === undefined) stats.byLevel.unstarred++;
        else if([1,2,3].indexOf(a.level) < 0) errors.push(key + ': level must be 1, 2, 3 or null');
        else stats.byLevel[a.level]++;
      });

      (part.grammar || []).forEach(g => {
        stats.grammar++;
        if(!g.topic) errors.push(where + ': a grammar entry has no topic');
        if(!g.source) errors.push(where + '/' + (g.id || '?') + ': grammar entry has no source');
      });

      ['reading', 'listening', 'speaking'].forEach(skill => {
        const s = part.skills && part.skills[skill];
        if(!s){ warnings.push(where + ': no ' + skill + ' block at all'); return; }
        if(!s.active){
          if(!s.reason) errors.push(where + ': ' + skill + ' is inactive with no reason given');
          stats.inactiveSkills.push(where + '/' + skill);
        }
      });
    });
  });

  return { ok: errors.length === 0, errors, warnings, stats };
}

export { validate };
