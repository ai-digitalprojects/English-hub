/* Generic exercise renderers.

   Each one is driven entirely by the `items` an activity carries in the
   content model, so one renderer serves many workbook exercise types. An
   activity names the renderer it wants in its `render` field. */

import { A } from '../state.js';
import { shuffle, deal, escapeAttr } from '../helpers.js';
import { bi, ins, ui } from '../views/bilingual.js';
import { correctRow, retryRow, hintRow, revealRow, finishBlock, REVEAL_AT, HINT_AT } from './feedback.js';

const finish = key =>
  `<button class="pill biBtn" style="background:var(--blue)" data-action="finishActivity">${ui(key || 'complete')}</button>`;
const again = doWhat =>
  `<button class="pill outline biBtn" data-action="ex" data-do="${doWhat}">${ui('again')}</button>`;

/* A question may be asked with a picture rather than with a sentence about a
   picture. Where it is, the sentence that described it becomes the alt text
   and no prompt is drawn — the picture is the question. */
function qPicture(q){
  if(!q.img || !q.img.file) return '';
  return `
    <figure class="qFig">
      <img src="assets/img/${q.img.file}" alt="${escapeAttr(q.img.alt || '')}" loading="lazy">
    </figure>`;
}

/* ---------------------------------------------------------------- mc
   One prompt, a few options. `multi: true` asks for two correct answers. */
const mc = {
  render(items, part, act){
    if(A.qs === undefined){
      A.qs = (act.shuffle === false) ? items.slice() : shuffle(items.slice());
      A.i = 0; A.picked = []; A.score = 0; A.checked = false;
      A.tries = 0; A.firstTry = 0; A.solved = false;
    }
    if(A.i >= A.qs.length){
      return finishBlock(A.firstTry, A.qs.length) +
        `<div class="navRowR">${again('restart')}${finish()}</div>`;
    }
    const q = A.qs[A.i];
    const answers = Array.isArray(q.a) ? q.a : [q.a];
    const want = answers.length;
    const done = A.checked;
    const opts = q.o.map((o, oi) => {
      /* An option may be a picture instead of a sentence. The sentence is still
         what the option *is* — it is the stored value, the answer and the alt
         text — so nothing about the checking changes; only what is drawn. */
      const pic = (q.oImg || [])[oi];
      let cls = 'opt';
      const he = !pic && /[֐-׿]/.test(o);
      /* While the student is still trying, only their own choice is marked —
         the correct option is never given away. */
      if(A.solved){
        if(answers.includes(o)) cls += ' correct'; else cls += ' dim';
      } else if(A.revealed){
        if(answers.includes(o)) cls += ' correct';
        else if(A.picked.includes(o)) cls += ' incorrect';
        else cls += ' dim';
      } else if(A.missed && A.missed.includes(o)){
        cls += ' incorrect';
      } else if(A.picked.includes(o)) cls += ' selected';
      if(A.hinted && A.hinted.includes(o)) cls += ' dim';
      const body = pic
        ? `<img src="assets/img/${pic}" alt="${escapeAttr(o)}" loading="lazy">`
        : o;
      return `<button class="${cls}${pic ? ' optPic' : ''}${he ? ' he' : ''}"${he ? ' dir="rtl"' : ''} data-action="ex" data-do="pick"
        data-val="${escapeAttr(o)}" ${done ? 'data-locked="1"' : ''}>${body}</button>`;
    }).join('');
    const got = A.picked.filter(p => answers.includes(p)).length;
    return `
      <p class="exHint">${ins(want > 1 ? 'mcTwo' : 'mc')}</p>
      ${q.intro ? `<p class="exHint sub">${q.intro}</p>` : ''}
      <div class="qWrap">
        <div class="qCounter">Question ${A.i + 1} of ${A.qs.length}${want > 1 ? ' · choose ' + want : ''}</div>
        ${qPicture(q)}${q.p ? `<div class="prompt">${q.p}</div>` : ''}
        <div class="opts${q.oImg ? ' optsPic' : ''}">${opts}</div>
        ${A.solved ? correctRow()
          : A.revealed ? revealRow(answers.join(' + '))
          : A.wrong ? retryRow() : ''}
        ${(!A.solved && !A.revealed && A.tries >= HINT_AT && A.hinted && A.hinted.length)
          ? hintRow() : ''}
      </div>
      <div class="navRowR">
        ${(A.solved || A.revealed)
          ? `<button class="pill biBtn" style="background:var(--navy)" data-action="ex" data-do="next">${ui(A.i === A.qs.length - 1 ? 'finish' : 'next')}</button>`
          : `<button class="pill biBtn" style="background:var(--indigo)" data-action="ex" data-do="check" ${A.picked.length === want ? '' : 'disabled'}>${ui('check')}</button>`}
      </div>`;
  },
  handle(doWhat, t){
    if(doWhat === 'restart'){ delete A.qs; return true; }
    if(doWhat === 'pick'){
      if(A.solved || A.revealed) return true;
      const q = A.qs[A.i], want = Array.isArray(q.a) ? q.a.length : 1;
      const v = t.dataset.val;
      if(A.picked.includes(v)) A.picked = A.picked.filter(x => x !== v);
      else if(A.picked.length < want) A.picked.push(v);
      else if(want === 1) A.picked = [v];
      A.wrong = false;
      return true;
    }
    if(doWhat === 'check'){
      const q = A.qs[A.i], answers = Array.isArray(q.a) ? q.a : [q.a];
      const right = A.picked.length === answers.length && A.picked.every(p => answers.includes(p));
      A.tries++;
      if(right){
        A.solved = true; A.wrong = false; A.score++;
        if(A.tries === 1) A.firstTry++;
        return true;
      }
      /* Remember what was tried so it reads as used up, but keep the answer
         hidden and let them go again. */
      A.missed = (A.missed || []).concat(A.picked);
      A.picked = [];
      A.wrong = true;
      if(A.tries >= HINT_AT && !A.hinted){
        /* The hint takes away one option that is definitely wrong. */
        const wrongOnes = q.o.filter(o => !answers.includes(o) && !(A.missed || []).includes(o));
        A.hinted = wrongOnes.slice(0, 1);
      }
      if(A.tries >= REVEAL_AT) A.revealed = true;
      return true;
    }
    if(doWhat === 'next'){
      A.i++; A.picked = []; A.tries = 0;
      A.solved = false; A.revealed = false; A.wrong = false;
      A.missed = []; A.hinted = null;
      return true;
    }
    return false;
  }
};

/* ------------------------------------------------------------- pairs
   Two columns to match. Items are [left, right]. */
const pairs = {
  render(items){
    if(A.pairs === undefined){
      A.pairs = items.map(it => [it.a, it.b]);
      const d = deal(A.pairs);
      A.left = d.left; A.right = d.right;
      A.matched = []; A.selL = null; A.selR = null; A.wrong = null;
    }
    if(A.matched.length === A.pairs.length){
      return finishBlock(A.pairs.length, A.pairs.length, bi('You matched them all!', 'התאמתם את כולם!')) +
        `<div class="navRowR">${again('restart')}${finish()}</div>`;
    }
    const col = (list, side) => list.map(v => {
      const isMatched = side === 'L'
        ? A.matched.includes(v)
        : A.matched.some(l => A.pairs.find(p => p[0] === l)[1] === v);
      const sel = (side === 'L' ? A.selL : A.selR) === v;
      /* Said outright on every item, not only on the Hebrew ones. The right
         column is Hebrew in the word-list drills and English here, and an
         English sentence left to a right-to-left box puts its full stop at the
         wrong end. */
      const he = /[֐-׿]/.test(v);
      const cls = 'matchItem' + (isMatched ? ' matched' : '') + (sel ? ' selected' : '')
                + (A.wrong === side + ':' + v ? ' wrong' : '');
      return `<button class="${cls}" dir="${he ? 'rtl' : 'ltr'}" data-action="ex" data-do="pick"
        data-side="${side}" data-val="${escapeAttr(v)}" ${isMatched ? 'disabled' : ''}>${v}</button>`;
    }).join('');
    return `<p class="exHint">${ins('pairs')}</p>
      <p class="exHint sub">${bi('Tap one on the left, then its partner on the right.', 'הקישו על אחד משמאל, ואז על בן הזוג שלו מימין.')}</p>
      <div class="matchGrid">
        <div class="matchCol">${col(A.left, 'L')}</div>
        <div class="matchCol">${col(A.right, 'R')}</div>
      </div>
      <div class="pctLabel">${A.matched.length} of ${A.pairs.length} matched</div>`;
  },
  handle(doWhat, t, items, rerender){
    if(doWhat === 'restart'){ delete A.pairs; return true; }
    if(doWhat !== 'pick') return false;
    const side = t.dataset.side, val = t.dataset.val;
    if(side === 'L') A.selL = (A.selL === val ? null : val);
    else A.selR = (A.selR === val ? null : val);
    if(A.selL && A.selR){
      const pair = A.pairs.find(p => p[0] === A.selL);
      if(pair && pair[1] === A.selR){ A.matched.push(A.selL); A.wrong = null; }
      else { A.wrong = 'L:' + A.selL; setTimeout(() => { A.wrong = null; rerender(); }, 500); }
      A.selL = null; A.selR = null;
    }
    return true;
  }
};

/* --------------------------------------------------------------- bins
   Sort words or phrases into named groups. Items are {v, bin}. */
/* A group's heading. A bin is identified by a short key, and an activity may
   give that key both languages; one that does not just shows the key, as the
   word-list drill always has. */
function binLabel(act, key){
  const pair = (act && act.binLabels) ? act.binLabels[key] : null;
  return pair ? bi(pair[0], pair[1]) : key;
}

const bins = {
  render(items, part, act){
    if(A.pool === undefined){
      A.binNames = act.bins || [...new Set(items.map(i => i.bin))];
      A.pool = shuffle(items.slice());
      A.placed = {}; A.binNames.forEach(b => { A.placed[b] = []; });
      A.sel = null; A.wrong = null;
    }
    if(!A.pool.length){
      return finishBlock(A.binNames.length, A.binNames.length, bi('Everything is in the right group!', 'הכול בקבוצה הנכונה!')) +
        `<div class="navRowR">${again('restart')}${finish()}</div>`;
    }
    return `
      <p class="exHint">${ins('bins')}</p>
      <div class="poolRow">${A.pool.map((it, i) => `
        <button class="chip pool${A.sel === i ? ' selected' : ''}${A.wrong === i ? ' wrong' : ''}"
          data-action="ex" data-do="pick" data-idx="${i}">${it.v}</button>`).join('')}</div>
      <div class="binRow">${A.binNames.map(b => `
        <button type="button" class="bin" data-action="ex" data-do="drop" data-bin="${escapeAttr(b)}">
          <div class="binHead">${binLabel(act, b)}</div>
          <div class="binItems">${A.placed[b].map(v => `<span class="chip done">${v}</span>`).join('')
            || '<span class="stripHint">empty</span>'}</div>
        </button>`).join('')}</div>
      <div class="pctLabel">${A.pool.length} left</div>`;
  },
  handle(doWhat, t, items, rerender){
    if(doWhat === 'restart'){ delete A.pool; return true; }
    if(doWhat === 'pick'){ const i = Number(t.dataset.idx); A.sel = (A.sel === i ? null : i); A.wrong = null; return true; }
    if(doWhat === 'drop'){
      if(A.sel === null) return true;
      const it = A.pool[A.sel], b = t.dataset.bin;
      if(it.bin === b){ A.placed[b].push(it.v); A.pool.splice(A.sel, 1); A.sel = null; A.wrong = null; }
      else { A.wrong = A.sel; setTimeout(() => { A.wrong = null; rerender(); }, 500); }
      return true;
    }
    return false;
  }
};

/* ---- Support for a writing task ----
   Two boxes above the writing area, for an open task where a learner can be
   left staring at an empty box: the words they are likely to need, each with
   its Hebrew, and a few sentences already started. Both are to read and copy,
   not controls — nothing happens if you tap one.

   Drawn only for an activity that asks for them, so every other writing task
   is unchanged. */
function writingHelp(act){
  const words = act.helpWords || [];
  const starters = act.starters || [];
  if(!words.length && !starters.length) return '';
  const wordBox = words.length ? `
    <section class="helpBox">
      <h4 class="helpTitle">${bi('Useful words', 'מילים שיעזרו לכם')}</h4>
      <ul class="helpWords">${words.map(w => `
        <li>
          <span class="hwEn" dir="ltr">${w.en}</span>
          <span class="hwHe" dir="rtl" lang="he">${w.he}</span>
        </li>`).join('')}</ul>
    </section>` : '';
  const startBox = starters.length ? `
    <section class="helpBox">
      <h4 class="helpTitle">${bi('Sentence starters', 'התחלות למשפטים')}</h4>
      <ul class="helpStarters">${starters.map(t => `<li dir="ltr">${t}</li>`).join('')}</ul>
    </section>` : '';
  return `<div class="helpGrid">${wordBox}${startBox}</div>`;
}

/* ------------------------------------------------------------ writing
   Prompts with a box under each. Nothing is auto-marked; the text is kept
   as a draft and the student decides when it is done. */
const writing = {
  render(items, part, act){
    if(A.answers === undefined) A.answers = items.map(() => '');
    /* The words the book prints above the exercise. They are there to be read
       and copied, so they are not controls — nothing happens if you tap one. */
    const wordBank = act.wordBank
      ? `<div class="poolRow bank">${act.wordBank
          .map(w => `<span class="chip bank">${w}</span>`).join('')}</div>`
      : '';
    return `
      <p class="exHint">${ins('writing')}</p>
      ${wordBank}
      ${writingHelp(act)}
      ${items.map((it, i) => `
        <div class="writeItem">
          <div class="writePrompt">${i + 1}. ${it.p}</div>
          <textarea class="freeText" data-action="wrItem" data-idx="${i}"
            placeholder="Write your answer...">${escapeAttr(A.answers[i] || '')}</textarea>
        </div>`).join('')}
      <div class="navRowR">${finish('done')}</div>`;
  },
  handle(){ return false; },
  input(act, t){
    if(act !== 'wrItem') return false;
    if(A.answers === undefined) A.answers = [];
    A.answers[Number(t.dataset.idx)] = t.value;
    return true;
  }
};

/* ------------------------------------------------- translate and tick
   The workbook prints a sentence, asks for the bold word in Hebrew, and has a
   box to tick if the sentence is true for you. On screen the tick had nowhere
   to go, so the second half of the task could not be done at all.

   Each row now has the sentence, a field for the translation and a tick. The
   translation goes in the same A.answers the writing renderer uses; the ticks
   go in A.ticks, which the draft store keeps alongside it. Nothing is marked:
   a translation is the student's own and the tick is about their own life. */
const translateTick = {
  render(items){
    if(A.answers === undefined) A.answers = items.map(() => '');
    if(A.ticks === undefined) A.ticks = items.map(() => false);
    const row = (it, i) => `
      <li class="ttRow">
        <p class="ttSentence" dir="ltr">${it.p}</p>
        <div class="ttFields">
          <label class="ttTranslate">
            <span class="ttLabel">${bi('Translate', 'תרגמו')}
              <b dir="ltr">${it.word || ''}</b></span>
            <input type="text" class="freeText ttInput" dir="rtl" lang="he"
              data-action="wrItem" data-idx="${i}"
              value="${escapeAttr(A.answers[i] || '')}"
              placeholder="${escapeAttr('בעברית…')}">
          </label>
          <label class="ttTick">
            <input type="checkbox" data-action="tickItem" data-idx="${i}"
              ${A.ticks[i] ? 'checked' : ''}>
            <span class="ttTickText">${bi('True for me', 'נכון לגביי')} ✓</span>
          </label>
        </div>
      </li>`;
    /* No hint of its own: the activity's own instruction already says to write
       the Hebrew and tick what is true, and two lines saying it is one too
       many for a reader working in a second language. */
    return `
      <ol class="ttList">${items.map(row).join('')}</ol>
      <div class="navRowR">${finish('done')}</div>`;
  },
  handle(){ return false; },
  input(act, t){
    if(act === 'wrItem') return writing.input(act, t);
    if(act !== 'tickItem') return false;
    if(A.ticks === undefined) A.ticks = [];
    A.ticks[Number(t.dataset.idx)] = t.checked;
    return true;
  }
};

/* ---------------------------------------------------- sentence table
   Six numbered rows, each with the words the student may build a sentence
   from and one box to write it in. It is the writing renderer in a table:
   the text lives in the same A.answers array, so every row is saved on its
   own by the ordinary draft machinery and nothing here is auto-marked.

   Items are {words:[…]}; a row with no words is a free one. */
const sentenceTable = {
  render(items){
    if(A.answers === undefined) A.answers = items.map(() => '');
    const he = s => /[֐-׿]/.test(s);
    const row = (it, i) => `
      <tr>
        <td class="stNum">${i + 1}</td>
        <td class="stWords">
          ${(it.words || []).map(w =>
            `<span class="stChip${he(w) ? ' he' : ''}"${he(w) ? ' dir="rtl"' : ''}>${w}</span>`).join('')}
        </td>
        <td class="stWrite">
          <span class="stLabel">${bi('Write your sentence', 'כתבו את המשפט שלכם')}</span>
          <textarea class="freeText sentBox" rows="2" data-action="wrItem" data-idx="${i}"
            aria-label="Sentence ${i + 1}"
            placeholder="${escapeAttr('Sentence ' + (i + 1) + '…')}">${escapeAttr(A.answers[i] || '')}</textarea>
        </td>
      </tr>`;
    return `
      <div class="sentTableWrap">
        <table class="sentTable">
          <thead>
            <tr>
              <th class="stNum">#</th>
              <th class="stWords">${bi('Words to help you', 'מילים שיעזרו לכם')}</th>
              <th class="stWrite">${bi('Write your sentence', 'כתבו את המשפט שלכם')}</th>
            </tr>
          </thead>
          <tbody>${items.map(row).join('')}</tbody>
        </table>
      </div>
      <div class="navRowR">${finish('done')}</div>`;
  },
  handle(){ return false; },
  /* The same box and the same store as the writing renderer. */
  input(act, t){ return writing.input(act, t); }
};

/* -------------------------------------------------------- scene cards
   A picture, a few words to use with it, and one box to write in — four
   times over. It is the writing renderer given pictures: the text lives in
   the same A.answers array, so every card is saved on its own by the ordinary
   draft machinery and nothing here is auto-marked.

   Items are {img, alt, words:[…]}. The alt text carries the description of
   the picture for anyone not seeing it, which is the only place that
   description now appears — the student reads the picture, not a paragraph
   about it. */
const sceneCards = {
  render(items){
    if(A.answers === undefined) A.answers = items.map(() => '');
    const he = s => /[֐-׿]/.test(s);
    const card = (it, i) => `
      <li class="sceneCard">
        <div class="scHead">
          <span class="scStep">${i + 1}</span>
          <span class="scLabel scTitle">${bi('Picture', 'תמונה')}</span>
        </div>
        <figure class="scFig">
          <img src="assets/img/${it.img}" alt="${escapeAttr(it.alt || '')}" loading="lazy">
        </figure>
        <span class="scLabel">${bi('Words to help you', 'מילים שיעזרו לכם')}</span>
        <div class="scWords">
          ${(it.words || []).map(w =>
            `<span class="stChip${he(w) ? ' he' : ''}"${he(w) ? ' dir="rtl"' : ''}>${w}</span>`).join('')}
        </div>
        <span class="scLabel">${bi('Write your sentence', 'כתבו את המשפט שלכם')}</span>
        <textarea class="freeText sentBox" rows="3" data-action="wrItem" data-idx="${i}"
          aria-label="Sentence for picture ${i + 1}"
          placeholder="${escapeAttr('Sentence ' + (i + 1) + '…')}">${escapeAttr(A.answers[i] || '')}</textarea>
      </li>`;
    return `
      <ol class="sceneGrid">${items.map(card).join('')}</ol>
      <div class="navRowR">${finish('done')}</div>`;
  },
  handle(){ return false; },
  /* The same box and the same store as the writing renderer. */
  input(act, t){ return writing.input(act, t); }
};

/* --------------------------------------------------------- unscramble
   Scrambled letters with a clue. Items are {answer, clue}. */
const unscramble = {
  render(items){
    if(A.items === undefined){
      A.items = shuffle(items.filter(it => it.answer.replace(/[^A-Za-z]/g, '').length >= 3))
        .map(it => ({ ...it, mix: mixLetters(it.answer) }));
      A.i = 0; A.val = ''; A.checked = false; A.score = 0;
      A.tries = 0; A.firstTry = 0; A.solved = false; A.revealed = false; A.wrong = false;
    }
    if(A.i >= A.items.length){
      return finishBlock(A.firstTry, A.items.length) +
        `<div class="navRowR">${again('restart')}${finish()}</div>`;
    }
    const it = A.items[A.i];
    const right = A.checked && A.val.trim().toLowerCase() === it.answer.toLowerCase();
    const he = /[֐-׿]/.test(it.clue || '');
    return `
      <p class="exHint">${ins('unscramble')}</p>
      <div class="qWrap">
        <div class="qCounter">Word ${A.i + 1} of ${A.items.length}</div>
        <div class="scrambled">${it.mix.split('').map(c => `<span class="letter">${c}</span>`).join('')}</div>
        ${it.clue ? `<div class="${he ? 'hePrompt' : 'prompt'}"${he ? ' dir="rtl"' : ''}>${it.clue}</div>` : ''}
        <input type="text" class="freeText wordInput" data-action="exInput" dir="ltr"
               value="${escapeAttr(A.val)}" placeholder="Write the word..." />
        ${A.solved ? correctRow()
          : A.revealed ? revealRow(it.answer)
          : A.wrong ? retryRow() : ''}
        ${(!A.solved && !A.revealed && A.tries >= HINT_AT)
          ? hintRow(bi('It starts with <b>' + it.answer[0].toUpperCase() + '</b> and has ' + it.answer.replace(/[^A-Za-z]/g, '').length + ' letters.',
                       'המילה מתחילה ב-<b>' + it.answer[0].toUpperCase() + '</b> ויש בה ' + it.answer.replace(/[^A-Za-z]/g, '').length + ' אותיות.')) : ''}
      </div>
      <div class="navRowR">
        ${(A.solved || A.revealed)
          ? `<button class="pill biBtn" style="background:var(--navy)" data-action="ex" data-do="next">${ui(A.i === A.items.length - 1 ? 'finish' : 'next')}</button>`
          : `<button class="pill biBtn" style="background:var(--indigo)" data-action="ex" data-do="check">${ui('check')}</button>`}
      </div>`;
  },
  handle(doWhat){
    if(doWhat === 'restart'){ delete A.items; return true; }
    if(doWhat === 'check'){
      A.tries++;
      if(A.val.trim().toLowerCase() === A.items[A.i].answer.toLowerCase()){
        A.solved = true; A.wrong = false; A.score++;
        if(A.tries === 1) A.firstTry++;
      } else {
        A.wrong = true;
        if(A.tries >= REVEAL_AT) A.revealed = true;
      }
      return true;
    }
    if(doWhat === 'next'){
      A.i++; A.val = ''; A.tries = 0;
      A.solved = false; A.revealed = false; A.wrong = false;
      return true;
    }
    return false;
  },
  input(act, t){
    if(act !== 'exInput') return false;
    A.val = t.value; A.wrong = false; return true;
  }
};

function mixLetters(word){
  const letters = word.replace(/[^A-Za-z]/g, '').split('');
  const straight = letters.join('');
  let out = shuffle(letters).join('');
  for(let i = 0; i < 6 && out.toLowerCase() === straight.toLowerCase(); i++) out = shuffle(letters).join('');
  return out;
}

/* ----------------------------------------------------------- wordlist
   A readable reference list with audio, for the Unit Check word page. */
const wordlist = {
  render(items){
    return `<p class="exHint">${ins('wordlist')}</p>
      <p class="exHint sub">${bi('Every word from this unit.', 'כל המילים של היחידה.')}</p>
      <div class="wordListGrid">${items.map(it => `
        <div class="wordListRow">
          <span class="wlEn">${it.en}</span>
          <button class="speaker" data-action="speak" data-text="${escapeAttr(it.en)}">🔊</button>
          <span class="wlHe" dir="rtl">${it.he || ''}</span>
        </div>`).join('')}</div>
      <div class="navRowR">${finish('done')}</div>`;
  },
  handle(){ return false; }
};

import { reading, recall } from './reading.js';

const RENDERERS = {
  mc, pairs, bins, writing, unscramble, wordlist, reading, recall,
  'sentence-table': sentenceTable,
  'scene-cards': sceneCards,
  'translate-tick': translateTick
};

export { RENDERERS };
