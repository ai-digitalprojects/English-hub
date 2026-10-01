/* Feedback.

   A wrong answer is not a verdict. It says "try again", keeps the answer to
   itself and lets the student go round. A hint arrives only after two misses,
   the answer only after four — enough to keep anyone from being stuck without
   handing it over the first time something is hard. */

import { bi } from '../views/bilingual.js';

const HINT_AT = 2;     // misses before a hint narrows things down
const REVEAL_AT = 4;   // misses before the answer is shown

function correctRow(message){
  return `<div class="fxRow good">
    <span class="fxBurst"><span class="fxTick">✓</span><i></i><i></i><i></i><i></i><i></i><i></i></span>
    ${message || bi('Great job!', 'כל הכבוד!')}
  </div>`;
}

function retryRow(message){
  return `<div class="fxRow retry">
    <span class="fxRetryIcon">↻</span>
    ${message || bi('Try again', 'נסו שוב')}
  </div>`;
}

function hintRow(message){
  return `<div class="fxHint">💡 ${message || bi('One of the choices is out. Look again.', 'אחת האפשרויות ירדה. הסתכלו שוב.')}</div>`;
}

function revealRow(answer){
  return `<div class="fxRow retry">
    <span class="fxRetryIcon">💡</span>
    ${bi('The answer is:', 'התשובה הנכונה:')} <b>${answer}</b>
  </div>`;
}

/* How the exercise ends. The score counts answers that were right first time,
   because everything is retried until it is right. */
function finishBlock(firstTry, total, message){
  const pct = total ? Math.round(firstTry / total * 100) : 0;
  const star = pct >= 90 ? '🌟' : pct >= 70 ? '⭐' : '✅';
  const praise = message || (pct >= 90
    ? bi('Excellent!', 'מצוין!')
    : pct >= 70 ? bi('Great job!', 'כל הכבוד!') : bi('Well done — keep going!', 'יפה מאוד — תמשיכו!'));
  return `<div class="fxFinish">
    <span class="fxStar">${star}</span>
    <div class="fxScore">${firstTry} / ${total}</div>
    <div>${praise}</div>
    <p class="fxNote">${bi('Right on the first try.', 'נכון בניסיון הראשון.')}</p>
  </div>`;
}

export { correctRow, retryRow, hintRow, revealRow, finishBlock, HINT_AT, REVEAL_AT };
