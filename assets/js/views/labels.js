/* Human labels for the codes the content model stores. */

const TYPE_TITLES = {
  'flashcards': 'Learn the Words',
  'write-the-words': 'Write the Words',
  'match-sentences-to-pictures': 'Match Sentences to Pictures',
  'complete-the-puzzles': 'Word Puzzles',
  'circle-the-correct-words': 'Circle the Correct Words',
  'complete-the-sentences': 'Complete the Sentences',
  'circle-write-translate': 'Find the Words',
  'highlight-and-translate': 'Highlight and Translate',
  'sort-into-columns': 'Sort into Columns',
  'write-the-correct-words': 'Write the Correct Word',
  'write-sentences-from-table': 'Write Sentences',
  'complete-the-questions': 'Complete the Questions',
  'match-a-to-b': 'Match A to B',
  'write-another-sentence': 'Write Another Sentence',
  'read-and-write': 'Read and Write',
  'choose-the-correct-pictures': 'Choose the Correct Picture',
  'where-things-are-from-quiz': 'Where Is It From?',
  'circle-true-or-false': 'True or False',
  'choose-the-correct-phrases': 'Choose the Correct Phrase',
  'choose-two-answers': 'Choose Two Answers',
  'write-text-messages': 'Write Text Messages',
  'answer-the-questions': 'Answer the Questions',
  'word-list-reference': 'All the Words',
  'find-words-for-category': 'Find Two Words',
  'circle-two-correct-answers': 'Circle TWO Correct Answers',
  'translate-the-sentences': 'Translate the Sentences',
  'think-about': 'Think About…',
  'read-better': 'Read Better',
  'reading-sequence': 'Read the Text',
  'quick-recall': 'Quick Recall',
  'complete-the-dialogues': 'Complete the Dialogues',
  'write-questions': 'Write Your Own Questions',
  'about-you': 'About You'
};

const SKILL_LABELS = {
  vocabulary:'Vocabulary', grammar:'Grammar', reading:'Reading',
  listening:'Listening', speaking:'Speaking', writing:'Writing', phonics:'Phonics'
};

const SKILL_ICONS = {
  vocabulary:'🧠', grammar:'🔧', reading:'📖',
  listening:'🎧', speaking:'🎤', writing:'✍️', phonics:'🔊'
};

const LEVELS = {
  1: { stars:'★',   label:'Warm up',  he:'חימום' },
  2: { stars:'★★',  label:'Practice', he:'תרגול' },
  3: { stars:'★★★', label:'Challenge', he:'אתגר' }
};

function activityTitle(a){ return a.title || TYPE_TITLES[a.type] || a.type; }
function skillLabel(s){ return SKILL_LABELS[s] || s; }
function skillIcon(s){ return SKILL_ICONS[s] || '•'; }

/* The book's own star rating. Unstarred exercises carry no level in the book
   either — they are the introductory Highlight-and-translate tasks. */
function levelBadge(level){
  const L = LEVELS[level];
  if(!L) return '';
  return `<span class="lvl lvl${level}" title="${L.label}">${L.stars}<span class="lvlName">${L.label}</span></span>`;
}

/* "SB 20 · WB 16.1" — where this came from in the printed books. */
function sourceRef(a){
  /* A drill built over the word list cites no page: it is not a printed exercise. */
  if(a.origin === 'word-list')
    return '<span class="refs"><span class="ref wordlist">📚 Word list</span></span>';
  /* A page can carry two exercise 2s — one in the grammar box, one in the
     practice block below it — so a source may name which block it came from. */
  const one = s => 'p.' + s.page + (s.exercise ? '.' + s.exercise : '')
    + (s.note ? ' · ' + s.note : '');
  const bits = [];
  const name = b => b === 'students' ? 'Book' : 'Workbook';
  if(a.source) bits.push(`<span class="ref ${a.source.book}">${name(a.source.book)} ${one(a.source)}</span>`);
  if(a.linkedTo) bits.push(`<span class="ref ${a.linkedTo.book}">${name(a.linkedTo.book)} ${one(a.linkedTo)}</span>`);
  return bits.length ? `<span class="refs">${bits.join('')}</span>` : '';
}

export { activityTitle, skillLabel, skillIcon, levelBadge, sourceRef, LEVELS };
