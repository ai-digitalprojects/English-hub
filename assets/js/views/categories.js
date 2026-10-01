/* The learning sequence a Part is laid out in.

   Warm Up → Vocabulary → Grammar → Reading → Writing → Review. A category that
   has no activities in a given Part is simply not drawn, so Part 3 shows no
   empty Grammar heading and no Part shows a dead Reading card. */

import { bi } from './bilingual.js';

const ORDER = ['warmup', 'vocabulary', 'grammar', 'reading', 'writing', 'review'];

const CATEGORIES = {
  warmup:     { icon: '💡', en: 'Warm Up',    he: 'חימום',      lead: ['Think about it first.', 'חשבו על זה קודם.'] },
  vocabulary: { icon: '🔤', en: 'Vocabulary', he: 'אוצר מילים', lead: ['Learn the words, then use them.', 'למדו את המילים, ואז השתמשו בהן.'] },
  grammar:    { icon: '🔧', en: 'Grammar',    he: 'דקדוק',      lead: ['Learn the rule, then try it.', 'למדו את הכלל, ואז נסו אותו.'] },
  reading:    { icon: '📖', en: 'Reading',    he: 'קריאה',      lead: ['Read a little at a time.', 'קראו קצת בכל פעם.'] },
  writing:    { icon: '✍️', en: 'Writing',    he: 'כתיבה',      lead: ['Now write it yourself.', 'עכשיו כתבו בעצמכם.'] },
  review:     { icon: '🔁', en: 'Review',     he: 'חזרה',       lead: ['Put it all together.', 'חברו הכול יחד.'] }
};

function categoryOf(a){ return a.category || 'vocabulary'; }

/* Activities grouped and ordered: categories in teaching order, and inside a
   category the gentlest step first. */
function groupByCategory(activities){
  const groups = [];
  ORDER.forEach(key => {
    const items = activities
      .filter(a => categoryOf(a) === key)
      .sort((x, y) => (x.step || 5) - (y.step || 5));
    if(items.length) groups.push({ key, def: CATEGORIES[key], items });
  });
  /* Anything with an unknown category still gets shown rather than lost. */
  const known = new Set(ORDER);
  const rest = activities.filter(a => !known.has(categoryOf(a)));
  if(rest.length) groups.push({ key: 'vocabulary', def: CATEGORIES.vocabulary, items: rest });
  return groups;
}

function categoryHeading(group){
  const d = group.def;
  return `
  <header class="catHead cat-${group.key}">
    <span class="catIcon" aria-hidden="true">${d.icon}</span>
    <h3 class="catTitle">${bi(d.en, d.he)}</h3>
    <span class="catLead">${bi(d.lead[0], d.lead[1])}</span>
  </header>`;
}

export { ORDER, CATEGORIES, groupByCategory, categoryHeading, categoryOf };
