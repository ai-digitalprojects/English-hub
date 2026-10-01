# Project Status — English Hub

**Last updated:** 2026-10-01
**Branch:** `english-hub-v2`
**Commit:** `31a11b4` — *v2: new theme, learning sequence, retry feedback, Part 2 benchmark*
**Working tree:** clean
**`main`:** `865802c`, unchanged and identical to `origin/main`
**Not deployed. Not merged. No PR.**

---

## 1. Completed

### Visual direction (v2)
- `assets/css/tokens.css` rebuilt around the approved palette — navy and indigo
  for structure, ivory and warm white for surfaces, four muted accents that mark
  *type of learning* rather than decorating:

  | | | |
  |---|---|---|
  | Vocabulary | blush | Grammar · teal |
  | Reading | sage | Writing · indigo |
  | Review | gold | |

  Cards stay white. Legacy colour aliases kept so older rules still resolve.
- `assets/css/effects.css` — tick, six sparks, retry turn, hint, finish block.
  Every animation disabled under `prefers-reduced-motion`.

### Learning sequence
- `assets/js/views/categories.js` — **Warm Up → Vocabulary → Grammar → Reading →
  Writing → Review**. A category with no activities is never drawn.
- `part.js`, `home.js`, `section.js` rewritten. Stage cards show a category strip
  so the student sees what a Part contains before opening it.
- Grammar rules render before grammar practice.

### Feedback model
- `assets/js/exercises/feedback.js` + engine changes.
  `HINT_AT = 2`, `REVEAL_AT = 4`. A wrong answer says *Try again* and clears the
  choice; the correct option is never marked while the student is still trying.
  The final score counts answers right on the first attempt.

### Hero component
- `assets/js/views/hero.js` — 8 named image slots, painted as
  `background-image: var(--heroImg), var(--heroTone)` so a missing file falls
  through to a palette gradient. No substitute artwork was created.

### Verified in the browser
77 activities open, all with working controls, zero failures. Console clean apart
from one expected 404 per missing hero image.

---

## 2. What the PDF audit found

Five source PDFs (53 pages) were read in full. They interleave **Student's Book**
and **Workbook** pages:

```
00.pdf  WB 4–7                                   Getting Started
01.pdf  SB 12,13,15 · WB 10–13 · SB 20 · WB 16,17 · SB 22,23,24,25 · WB 18,19
02.pdf  SB 27 · WB 20,21 · SB 28,29,30 · WB 24–27 · SB 34,35 · WB 28,29
03.pdf  SB 39,40,41 · WB 30–33 · SB 42,43 · WB 36,37 · SB 47 · WB 38,39
04.pdf  SB 51,52 · WB 41,42,43                   Unit Check
```

### The central finding

> **The Part 2 reading text is SNOW MONKEYS (Student's Book 22–23), not Rex.**

Rex is **Workbook 21, exercise 3 ★★★**, headed *Read and write*, on a page titled
WRITING: Sentences. Its printed Hebrew instruction is
*"קראו על רקס. לאחר מכן, כתבו על חיית מחמד שאתם מכירים."* — it is a **writing
model paragraph**. The hub turned it into a ten-step Reading activity, which both
misfiled it and left the unit's real text out of the site entirely.

### What is correct

- **Every Book / Workbook reference and page number is accurate.** All 16 Part 2
  activities were checked individually; no page errors.
- All 13 Part 2 vocabulary words (SB 20) present, in the original English, with
  the book's Hebrew.
- Eight workbook exercises reproduce the source word for word, with correct
  answers: WB 16/1, WB 17/2, WB 17/3, WB 17/4, WB 18/1, WB 19/1, WB 19/2, WB 19/3.
- ★ levels match the book everywhere except one activity.
- The Rex paragraph itself is quoted verbatim.
- `origin: adapted` on `match-to-pictures` is an honest flag — the pictures are
  unavailable, so the format was converted.

---

## 3. Still to fix in Part 2

### Missing

| Source | What |
|---|---|
| SB 22–23 | The Snow Monkeys text (sections A and B) |
| SB 23/3 | Answer the questions — 6, in two groups |
| SB 23/4 | How do snow monkeys sleep in the winter? — picture choice |
| SB 23/5 | Find examples from the text — 3 tasks |
| SB 24/6 | Answer the questions — 2 thinking questions |
| SB 24/7 | ABOUT YOU |
| WB 18/2 | Highlight — Wh-questions (5 items) |
| **WB 20** | **Entire page unused:** 4a, 4b, 5 (Complete the dialogues ★★★) |
| SB 25/2 | Complete with *Is* or *Are*, then choose the correct answers |
| SB 25/3 | The What/When/Where/Who/Why × is/are chart |
| SB 27 | 1a, 1b, 2 ABOUT YOU, TASK — the real Part 2 writing page |
| SB 20 | Read Better: long *e* (ea / ee) |
| WB 18 | Short answers (*Yes, he is. / No, he isn't.*) — taught nowhere on the site |

Note: the SB 27 picture is **of the snow monkeys**, so the book's writing page is
tied to the reading. That link is currently lost.

### Inaccurate

1. **Warm-up is fabricated.** SB 20 asks two open discussion questions. The hub
   invented three multiple-choice items with "correct" answers. One uses
   `directly` (Part 3) and `pocket` (Part 4) as distractors — words the student
   has not met. Another asks about text content the site does not contain.
2. **Rex filed as Reading.** Also: level is 2, the book marks it ★★★; the
   pre-teach words (`beautiful · brown · ears · small`, Hebrew `יפה · חום ·
   אוזניים · קטן`) are not Part 2 vocabulary and the Hebrew was invented; all
   seven comprehension questions around it were invented.
3. **`writing-complete` lost its grammar point.** The book's paired structure
   (`The dog is ___ . It has ___ .`) was flattened to one half, and the shared
   word bank was split arbitrarily per item.
4. **`ask-your-own`** is marked `origin: book` but its five prompts were written
   by us. Should be `adapted`.
5. **`writing-another`** — second prompt invented.
6. **`several`** — book reads `כמה, אחדים`; the site has only `כמה`.

### No source available — do not invent
`SB 21` · `SB 26` (Speaking) · `WB 22` (READ MORE) · `WB 23`

---

## 4. Remaining Parts

The learning-sequence system (categories, hero, retry feedback, varied formats)
has **only been applied to Part 2**. Still to do, each needing the same
PDF check before building:

| | Source pages available |
|---|---|
| Getting Started | WB 4–7 |
| Part 1 — A Trip to Japan | SB 12, 13, 15 · WB 10–13 |
| Part 3 — Let's Go | SB 28, 29, 30 · WB 24–27 |
| Part 4 — Made in Japan | SB 34, 35, 39, 40, 41 · WB 28–33 |
| Part 5 — Story | SB 42, 43, 47 · WB 36–39 |
| Unit Check | SB 51, 52 · WB 41–43 |

### Carried over from the audit

**Part 3 Hebrew is already in the book.** 14 words were flagged
`heSource: added-for-teaching` / `needsReview`. The printed Hebrew exists on
SB 28 (Word Power 1) and SB 29 (Word Power 2). Six of our 14 match the book
exactly; eight differ:

| | Book | Site |
|---|---|---|
| take a train | לקחת רכבת | לנסוע ברכבת |
| take (something) away | לקחת (משהו) | לקחת (משהו) **משם** |
| Take care! | תשמור / תשמרי על עצמך | שמרו על עצמכם! |
| take (something) off | להוריד (משהו) | להוריד (**בגד**) |
| get off | לרדת | לרדת (**מכלי תחבורה**) |
| get on | לעלות | לעלות (**על כלי תחבורה**) |
| visitor | אורח/ת, מבקר/ת | מבקר, אורח |
| welcome | ברוך/כה הבא/ה, ברוכים הבאים | ברוכים הבאים |

All 14 can move to `heSource: book` and the review flags can be dropped.

**Open question:** the book's own order is
*Vocabulary → Reading → more Vocabulary → Grammar → Speaking → Writing*. Our
approved order puts Reading after Grammar. That was a deliberate choice, not an
error, but in Part 2 the reading is the heart of the unit and SB 24 leans on it.
Worth re-deciding consciously.

---

## 5. Hero images

Eight slots are wired and waiting. Until the files exist, each renders a palette
gradient — which is why the console shows one 404 per slot. Place in
`assets/img/` (see [README](assets/img/README.md)):

```
hero-home.webp              hero-part-2.webp
hero-getting-started.webp   hero-part-3.webp
hero-unit-1.webp            hero-part-4.webp
hero-part-1.webp            hero-part-5.webp
                            hero-unit-check.webp
```

1600×500 · WebP · under 200 KB · calm left third (text sits there).

---

## 6. Branch state

```
main             865802c   live site — untouched, equals origin/main
rebuild          ba95e7d   3 commits never deployed
english-hub-v2   31a11b4   ← current work
tag              v1-single-file
```

**Do not deploy. Do not merge to `main`. Do not create a PR. Do not delete
`rebuild`.**

The live site still runs `865802c`, which shows `SB` / `WB` labels and 47 locked
cards. The three `rebuild` commits (Book/Workbook labels, larger cards, 89
clickable activities, bilingual instructions) remain undeployed — still an open
decision.

### Not being built at this stage
Identity, login, student name or class, teacher tracking, Google Sheets,
Apps Script.

---

## Next step when we resume

**Resume by correcting Part 2 based on the PDF audit, then review it before
expanding to the remaining Parts.**

Concretely, in order:

1. Build the **Snow Monkeys** reading from SB 22–23 with its real comprehension
   exercises (SB 23/3, 4, 5 and SB 24/6, 7).
2. Return **Rex** to Writing, as the model paragraph the book makes it, at ★★★.
3. Replace the fabricated warm-up with the book's two open questions.
4. Add the unused grammar: WB 18/2, WB 20 (4a, 4b, 5), SB 25/2 and 3, and short
   answers.
5. Build the real writing page from SB 27.
6. Fix `writing-complete`, the two `origin` flags, and `several`.
7. **Test locally and review before touching any other Part.**

Local server: `python tools/devserver.py` → <http://localhost:8123>
(ES modules need `http://`; opening `index.html` from disk will not work.)
