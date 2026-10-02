# Project Status — English Hub

**Last updated:** 2026-10-02
**Branch:** `english-hub-v2`
**Commit:** `80068f0` — *Correct Part 2 against the source PDFs*
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

### Part 2 — Snow Monkeys, corrected against the source PDFs
Completed 2026-10-02 in commit `80068f0`. See section 3.

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

### The central finding — now resolved

> **The Part 2 reading text is SNOW MONKEYS (Student's Book 22–23), not Rex.**

Rex is **Workbook 21, exercise 3 ★★★**, headed *Read and write*, on a page titled
WRITING: Sentences. Its printed Hebrew instruction is
*"קראו על רקס. לאחר מכן, כתבו על חיית מחמד שאתם מכירים."* — it is a **writing
model paragraph**. The hub had turned it into a ten-step Reading activity, which
both misfiled it and left the unit's real text out of the site entirely.

### What the audit confirmed as correct

- **Every Book / Workbook reference and page number was accurate.** All 16 Part 2
  activities were checked individually; no page errors.
- All 13 Part 2 vocabulary words (SB 20) present, in the original English, with
  the book's Hebrew.
- Eight workbook exercises reproduce the source word for word, with correct
  answers: WB 16/1, WB 17/2, WB 17/3, WB 17/4, WB 18/1, WB 19/1, WB 19/2, WB 19/3.
- ★ levels matched the book everywhere except one activity.
- The Rex paragraph itself is quoted verbatim.

---

## 3. Part 2 — corrected ✅

All audit findings for Part 2 are resolved. **27 cards** — 25 from the books plus
2 drills generated over the word list.

### The real reading is in
**Snow Monkeys, Student's Book 22–23**, the *Nature 4 Kids Magazine* article,
built as 14 short screens:

```
1     Before you read   fur · the cold · reason · thousand · several
2     Read              A · What are snow monkeys?   paragraph 1
3–4   Find it           colours · why they are called snow monkeys
5     Read              paragraph 2        6   how many live in Japan
7     Read              paragraph 3        8   food in the winter
9     Read              paragraph 4       10   how they sleep in winter
11    Read              B · Why are snow monkeys famous?
12–13 Find it           why they began · why in winter
14    Now you write     Find examples from the text
```

Built from the book's own exercises: **SB 23.3** (six comprehension questions),
**SB 23.4** (sleeping — pictures described in words), **SB 23.5** (find examples).
**Every option offered is a real sentence from the text**, so the questions ask
the student to locate rather than guess — nothing was invented. The text is
revealed a paragraph at a time, and a question never shows a paragraph the
student has not reached.

### Rex is back in Writing
At **★★★**, the level the workbook gives it, with the model paragraph shown above
the task and the book's own instruction.

### Restored content

| Restored | Source |
|---|---|
| Read Better: long *e* (ea / ee sort) | SB 20 · WB 233 |
| Is or Are? — **introduces short answers** | SB 25.2 |
| Highlight and Translate: Wh- questions | WB 19.2 (Highlight block) |
| Complete the Questions: All Question Words | WB 20.4a |
| Complete the Dialogues ★★★ | WB 20.5 |
| Write Your Own Questions — rebuilt from the book | SB 25.4 + WB 20.4b |
| Write About the Picture — the real writing page | SB 27.1 |
| About You: Your Family | SB 27.2 |
| After You Read | SB 24.6 + SB 24.7 |

**Workbook p.20 had been entirely unused; it is now in.**

### Also fixed
- **Warm Up** — three fabricated multiple-choice items replaced by the book's two
  open questions. Two of the discarded distractors (`directly`, `pocket`) came
  from Parts 3 and 4, which the student has not met.
- **`writing-complete`** — the paired `… It has …` structure and the shared word
  bank restored as the workbook prints them.
- **`several`** — now reads `כמה, אחדים` as printed on SB 20.
- **Star levels** — removed from Student's Book activities; the SB prints none.
- **`origin` flags** — picture-dependent exercises are described in words and
  marked `adapted`, never presented as the original.

### Three engine fixes made along the way
- A two-option question no longer offers a hint that would give the answer away.
- Word banks are a list to read from, not buttons that did nothing when tapped.
- Word-list drills moved to Vocabulary, so the Writing block keeps the book's own
  ★ → ★★ → ★★★ progression unbroken.

### Source pages used
```
Student's Book   20 · 22 · 23 · 24 · 25 · 27
Workbook         16 · 17 · 18 · 19 · 20 · 21     (+ 233, Read Better reference)
```

### Deliberately left out of Part 2
- **SB 25.3** — the question chart. A partner speaking task.
- **SB 27 TASK** — animal fact file. Needs a picture, and the checklist on
  WB 262 is not in the scans.
- **SB 21 · SB 26 · WB 22–23** — not scanned. No source, nothing invented.

### Test results — all passed
```
86 activities site-wide   all open · all have controls · all bilingual
0 empty cards             0 console errors
Reading sequence          14/14 steps · text reveal 1→2→3→4→5 paragraphs ✓
Retry model               answer never shown on a wrong try ✓
                          hint after two misses, grounded in the text ✓
                          6 sparks on a correct answer ✓
Horizontal overflow       0 px at 375 and at 1024
```

---

## 4. Remaining Parts

The learning-sequence system has been applied and validated on **Part 2 only**.
Each remaining Part needs the same treatment *and* its own check against the PDFs
before building:

| | Source pages available |
|---|---|
| Getting Started | WB 4–7 |
| Part 1 — A Trip to Japan | SB 12, 13, 15 · WB 10–13 |
| Part 3 — Let's Go | SB 28, 29, 30 · WB 24–27 |
| Part 4 — Made in Japan | SB 34, 35, 39, 40, 41 · WB 28–33 |
| Part 5 — Story | SB 42, 43, 47 · WB 36–39 |
| Unit Check | SB 51, 52 · WB 41–43 |

### Carried over from the audit

**Part 3 Hebrew is already in the book.** 14 words are still flagged
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

**Open question, now informed by Part 2:** the book's own order is
*Vocabulary → Reading → more Vocabulary → Grammar → Speaking → Writing*. Our
approved order puts Reading after Grammar. Part 2 reads well either way, but in a
Part whose reading carries the vocabulary, it is worth re-deciding consciously.

---

## 5. Hero images

Eight slots are wired and waiting. Until the files exist, each renders a palette
gradient — which is why the console shows one 404 per slot. **These will be
integrated later, during the final visual-polish stage**, not while content work
is in progress. Place in `assets/img/` (see [README](assets/img/README.md)):

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
english-hub-v2   80068f0   ← current work
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

**Apply the validated learning model to Parts 1, 3, 4, 5 and Unit Check, checking
each one against the PDFs.**

Part 2 is the worked example of what "correct" means here, and it set the method:

1. Read that Part's pages in the PDFs first, before touching content.
2. List discrepancies against what is already built, and get them approved.
3. Build from the book's own exercises. Where a printed exercise leans on a
   picture, describe the picture in words and flag the activity `adapted`.
4. Where an answer lives in a text, make the options real sentences from that
   text rather than writing distractors.
5. Carry the book's own ★ levels; Student's Book exercises carry none.
6. Name anything deliberately left out, and why.
7. Test, then stop for review before moving to the next Part.

Suggested order: **Part 1** (its reading, *Things to do in Tokyo*, SB 15, is the
closest parallel to Part 2), then Part 3, Part 4, Part 5, Unit Check.

Local server: `python tools/devserver.py` → <http://localhost:8123>
(ES modules need `http://`; opening `index.html` from disk will not work.)
