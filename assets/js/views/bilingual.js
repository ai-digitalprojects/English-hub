/* Every instruction a student reads appears in English first, with the Hebrew
   next to it. The English carries the lesson; the Hebrew makes sure nobody is
   stuck on the instruction rather than on the exercise. */

function bi(en, he){
  if(!he) return `<span class="bi"><span class="biEn">${en}</span></span>`;
  return `<span class="bi"><span class="biEn">${en}</span><span class="biHe" dir="rtl">${he}</span></span>`;
}

/* Instructions, keyed by the renderer that shows them. */
const INSTRUCTIONS = {
  mc:           ['Choose the correct answer.', 'בחרו את התשובה הנכונה.'],
  mcTwo:        ['Choose two answers.', 'בחרו שתי תשובות.'],
  pairs:        ['Match the pairs.', 'התאימו בין הזוגות.'],
  bins:         ['Tap a word, then tap its group.', 'הקישו על מילה, ואז על הקבוצה שלה.'],
  writing:      ['Write your answer.', 'כתבו את התשובה שלכם.'],
  unscramble:   ['Unscramble the word.', 'סדרו את האותיות למילה.'],
  wordlist:     ['Listen and repeat.', 'הקשיבו וחזרו.'],
  flashcards:   ['Read the word, then tap the speaker to hear it.', 'קראו את המילה, והקישו על הרמקול כדי לשמוע.'],
  writeWords:   ['Write the word in English.', 'כתבו את המילה באנגלית.'],
  match:        ['Match the words.', 'התאימו בין המילים.'],
  build:        ['Build the sentence.', 'בנו את המשפט.'],
  sentence:     ['Complete the sentence.', 'השלימו את המשפט.'],
  readAnswer:   ['Read and answer.', 'קראו וענו.'],
  fullSentence: ['Write a full sentence.', 'כתבו משפט מלא.']
};

/* Buttons and feedback. */
const UI = {
  check:    ['Check', 'בדקו'],
  again:    ['Try again', 'נסו שוב'],
  next:     ['Next', 'הבא'],
  finish:   ['Finish', 'סיום'],
  done:     ['I have finished', 'סיימתי'],
  complete: ['Mark Complete', 'סמנו כהושלם'],
  clear:    ['Clear', 'ניקוי'],
  shuffle:  ['Shuffle again', 'ערבבו שוב'],
  previous: ['Previous', 'הקודם']
};

function ins(key){ const p = INSTRUCTIONS[key]; return p ? bi(p[0], p[1]) : ''; }
function ui(key){ const p = UI[key]; return p ? bi(p[0], p[1]) : ''; }

export { bi, ins, ui, INSTRUCTIONS, UI };
