/* Human labels for the codes the content model stores. */

/* An activity type's own title, in both languages. The Hebrew is the one the
   student reads under the English on every card, so it is written the way a
   Grade 6 instruction is written in class: plural imperative, no jargon. */
const TYPE_TITLES = {
  'flashcards':                  ['Learn the Words',             'למדו את המילים'],
  'write-the-words':             ['Write the Words',             'כתבו את המילים'],
  'match-sentences-to-pictures': ['Match Sentences to Pictures', 'התאימו משפטים לתמונות'],
  'complete-the-puzzles':        ['Word Puzzles',                'תשבצי מילים'],
  'circle-the-correct-words':    ['Circle the Correct Words',    'הקיפו את המילים הנכונות'],
  'complete-the-sentences':      ['Complete the Sentences',      'השלימו את המשפטים'],
  'circle-write-translate':      ['Find the Words',              'מצאו את המילים'],
  'highlight-and-translate':     ['Highlight and Translate',     'סמנו ותרגמו'],
  'sort-into-columns':           ['Sort into Columns',           'מיינו לטורים'],
  'write-the-correct-words':     ['Write the Correct Word',      'כתבו את המילה הנכונה'],
  'write-sentences-from-table':  ['Write Sentences',             'כתבו משפטים'],
  'complete-the-questions':      ['Complete the Questions',      'השלימו את השאלות'],
  'match-a-to-b':                ['Match A to B',                'התאימו בין A ל-B'],
  'write-another-sentence':      ['Write Another Sentence',      'כתבו משפט נוסף'],
  'read-and-write':              ['Read and Write',              'קראו וכתבו'],
  'choose-the-correct-pictures': ['Choose the Correct Picture',  'בחרו את התמונה הנכונה'],
  'where-things-are-from-quiz':  ['Where Is It From?',           'מאיפה זה?'],
  'circle-true-or-false':        ['True or False',               'נכון או לא נכון'],
  'choose-the-correct-phrases':  ['Choose the Correct Phrase',   'בחרו את הביטוי הנכון'],
  'choose-two-answers':          ['Choose Two Answers',          'בחרו שתי תשובות'],
  'write-text-messages':         ['Write Text Messages',         'כתבו הודעות'],
  'answer-the-questions':        ['Answer the Questions',        'ענו על השאלות'],
  'word-list-reference':         ['All the Words',               'כל המילים'],
  'find-words-for-category':     ['Find Two Words',              'מצאו שתי מילים'],
  'circle-two-correct-answers':  ['Circle TWO Correct Answers',  'הקיפו שתי תשובות נכונות'],
  'translate-the-sentences':     ['Translate the Sentences',     'תרגמו את המשפטים'],
  'think-about':                 ['Think About…',                'חשבו על…'],
  'read-better':                 ['Read Better',                 'קראו טוב יותר'],
  'reading-sequence':            ['Read the Text',               'קראו את הטקסט'],
  'quick-recall':                ['Quick Recall',                'זכירה מהירה'],
  'complete-the-dialogues':      ['Complete the Dialogues',      'השלימו את הדיאלוגים'],
  'write-questions':             ['Write Your Own Questions',    'כתבו שאלות משלכם'],
  'about-you':                   ['About You',                   'על עצמכם'],
  'give-examples':               ['Give Examples',               'תנו דוגמאות'],
  'write-examples':              ['Write Examples',              'כתבו דוגמאות'],
  'highlight-and-write':         ['Highlight and Write',         'סמנו וכתבו'],
  'fact-file':                   ['My Fact File',                'דף העובדות שלי'],
  'write-a-blog':                ['Write a Blog',                'כתבו בלוג'],
  'choose-the-best-meanings':    ['Choose the Best Meaning',     'בחרו את המשמעות המתאימה'],
  'match-sentences-to-people':   ['Who Says It?',                'מי אומר את זה?'],
  'translate-and-tick':          ['Translate and Tick',          'תרגמו וסמנו'],
  'make-phrases':                ['Make Phrases',                'הרכיבו ביטויים'],
  'replace-the-words':           ['Replace the Words',           'החליפו את המילים'],
  'word-maps':                   ['Word Maps',                   'מפות מילים']
};

/* Titles the content writes out in full, because the book's own exercise says
   more than its type does. Keyed by the English, so one entry serves every
   part that reuses the same exercise name.

   The seven drills the site builds over a word list are in here too: their
   English lives with the exercise module, and the whole student-facing
   vocabulary of the interface is kept in this file. */
const HE_EXTRA = {
  /* Getting Started */
  'Complete the Puzzles':                'השלימו את התשבצים',
  'Circle, Write and Translate':         'הקיפו, כתבו ותרגמו',
  'Complete the Sentences. Then Tick.':  'השלימו את המשפטים ואז סמנו',

  /* Part 1 */
  'Think About… friends and family in different places': 'חשבו על… חברים ומשפחה במקומות שונים',
  'Match Words to Meanings':             'התאימו מילים למשמעויות',
  'Things to do in Tokyo':               'מה עושים בטוקיו',

  /* Part 2 */
  'Think About… animals that are clever': 'חשבו על… חיות חכמות',
  'Is or Are?':                          'is או are?',
  'Snow Monkeys':                        'קופי השלג',
  'After You Read':                      'אחרי הקריאה',
  'Write About the Picture':             'כתבו על התמונה',

  /* Part 3 */
  'Think About… trains':                 'חשבו על… רכבות',
  'Match A and B':                       'התאימו בין A ל-B',
  'Which Sentence Is Not True?':         'איזה משפט אינו נכון?',
  'Circle the Correct Sentence':         'הקיפו את המשפט הנכון',
  'Complete the Text':                   'השלימו את הטקסט',

  /* Part 4 */
  'Think About… where things are from':  'חשבו על… מאיפה דברים באים',
  'Match Phrases to Pictures':           'התאימו ביטויים לתמונות',
  'Circle the Correct Word for Each Picture': 'הקיפו את המילה הנכונה לכל תמונה',
  'Circle the TWO Correct Answers':      'הקיפו את שתי התשובות הנכונות',
  'Read About Asahi':                    'קראו על אסאהי',
  'Circle the Correct Verb':             'הקיפו את הפועל הנכון',
  'Write About Neta':                    'כתבו על נטע',
  'Write About Your Day':                'כתבו על היום שלכם',
  'Read Ali\'s Blog':                    'קראו את הבלוג של עלי',
  'Correct and Write the Words':         'תקנו וכתבו את המילים',
  'Write Your Blog':                     'כתבו את הבלוג שלכם',

  /* Part 5 */
  'Think About… making wishes':          'חשבו על… משאלות',

  /* Unit Check */
  'Two Words for Each':                  'שתי מילים לכל קבוצה',
  'Where Can You…?':                     'איפה אפשר…?',
  'Nouns, Verbs or Adjectives?':         'שמות עצם, פעלים או שמות תואר?',
  'Memory Game':                         'משחק זיכרון',
  'Write the Answers':                   'כתבו את התשובות',

  /* The drills built over the word list (assets/js/exercises/) */
  'Match the Words':                     'התאימו בין המילים',
  'Choose the Correct Meaning':          'בחרו את המשמעות הנכונה',
  'Sort the Words':                      'מיינו את המילים',
  'Word Puzzle':                         'תשבץ מילים',
  'Build a Sentence':                    'בנו משפט',
  'Write It Yourself':                   'כתבו בעצמכם'
};

/* A title's qualifier, after the dash or the colon. Only prose is translated:
   a grammar form the student is learning (to be, am / is / are, s / es / ies),
   a sound (long a), and a heading printed in the book (Word Power 1, New Words
   2) stay in English, because that is the string on the page in front of them. */
const HE_TAILS = {
  'About You':           'על עצמכם',
  'Your Family':         'המשפחה שלכם',
  'The Animals':         'החיות',
  'All Question Words':  'כל מילות השאלה',
  'Wh- Questions':       'שאלות Wh-',
  'Capital Letters':     'אותיות גדולות',
  'Riding the Train':    'נסיעה ברכבת'
};

/* English title -> Hebrew. A type's own title is a title in its own right, so
   the map starts from those and the written-out ones are laid over it. */
const HE_TITLES = Object.assign(
  Object.fromEntries(Object.values(TYPE_TITLES)),
  HE_EXTRA
);

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

function activityTitle(a){
  return a.title || (TYPE_TITLES[a.type] || [])[0] || a.type;
}

/* The Hebrew for an English title. The book names its exercises in a pattern —
   a task, then what it is about — so rather than listing every combination,
   the task is looked up and the qualifier is carried across. "Write the Words 2
   — Word Power 2" needs no entry of its own.

   Returns '' when nothing is known, and the card then shows the English alone
   rather than a guess. */
function heFor(en){
  if(HE_TITLES[en]) return HE_TITLES[en];

  /* "Highlight and Translate: to be" / "Learn the Words — take" */
  const split = en.match(/^(.+?)(?: — |: )(.+)$/);
  if(split){
    const base = heFor(split[1]);
    if(base) return base + ' — ' + (HE_TAILS[split[2]] || split[2]);
  }

  /* "Learn the Words 1" */
  const numbered = en.match(/^(.*\S) (\d+)$/);
  if(numbered){
    const base = heFor(numbered[1]);
    if(base) return base + ' ' + numbered[2];
  }

  return '';
}

/* The Hebrew shown under an activity's English title. Content may name it
   outright with titleHe; otherwise it is read off the English. */
function activityTitleHe(a){
  if(a.titleHe) return a.titleHe;
  return heFor(activityTitle(a)) || (TYPE_TITLES[a.type] || [])[1] || '';
}

/* The second line of a card's title. Nothing is drawn when there is no Hebrew,
   so a card never shows an empty row. */
function titleHeLine(a, tag){
  const he = activityTitleHe(a);
  if(!he) return '';
  const el = tag || 'p';
  return `<${el} class="actTitleHe" dir="rtl" lang="he">${he}</${el}>`;
}

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

export {
  activityTitle, activityTitleHe, titleHeLine,
  skillLabel, skillIcon, levelBadge, sourceRef, LEVELS
};
