# Project Status — English Hub

**Last updated:** 2026-10-03
**Branch:** `english-hub-v2`
**Commit:** `9b92d2f` — *Rebuild Write Sentences around the park picture and a writing table*
**Plus the housekeeping commit on top of it, which adds `favicon.ico` and this file.**
**Working tree:** clean
**`main`:** `865802c`, unchanged and identical to `origin/main`
**Not deployed. Not merged. No PR.**

---

## Where the project stands

Content and visual work are complete. A full pre-deployment check has been run
and passed; the project is waiting for the go-ahead to deploy.

| | |
|---|---|
| Every section built from the source PDFs | ✅ |
| Bilingual activity titles on every card | ✅ |
| Print button removed from the student interface | ✅ |
| Nine hero images integrated | ✅ |
| One design language across every screen | ✅ |
| Dictation practice link on all 7 sections with a word list | ✅ |
| Write Sentences rebuilt around the park picture and a writing table | ✅ |
| Full responsive testing — 320, 375, 768, 1120 | ✅ |
| 140 activities tested, all opened successfully | ✅ |
| Zero broken links · zero missing images · zero overflow · zero JS errors | ✅ |
| `/favicon.ico` 404 fixed | ✅ |
| `main` untouched | ✅ |

---

## 1. Content — all sections validated against the PDFs

Five source PDFs (53 pages) are the **complete and authoritative scope** of this
project. Nothing outside them has been built, and a page that is not in them is
never cited on a card a student can open.

```
00.pdf  WB 4–7                                   Getting Started
01.pdf  SB 12,13,15 · WB 10–13 · SB 20 · WB 16,17 · SB 22,23,24,25 · WB 18,19
02.pdf  SB 27 · WB 20,21 · SB 28,29,30 · WB 24–27 · SB 34,35 · WB 28,29
03.pdf  SB 39,40,41 · WB 30–33 · SB 42,43 · WB 36,37 · SB 47 · WB 38,39
04.pdf  SB 51,52 · WB 41,42,43                   Unit Check
```

Each section was read in the PDFs first, compared against what was already
built, corrected, tested and approved on its own before the next one began.

| Section | Cards | Words | Source pages | Commit |
|---|---|---|---|---|
| Getting Started | 15 | 22 | WB 4–7 | `55367c4` |
| Part 1 · A Trip to Japan | 16 | 13 | SB 12, 13, 15 · WB 10–13 | `0bd5062` `1ad2430` |
| Part 2 · Snow Monkeys | 27 | 13 | SB 20, 22–25, 27 · WB 16–21 | `80068f0` |
| Part 3 · Let's Go | 18 | 14 | SB 28, 29, 30 · WB 24–27 | `9002742` |
| Part 4 · Made in Japan | 26 | 13 | SB 34, 35, 39–41 · WB 28–33 | `d386c94` |
| Part 5 · Story | 19 | 25 | SB 42, 43, 47 · WB 36–39 | `a756da1` |
| Unit Check | 19 | 78 | SB 51, 52 · WB 41–43 | `2a9faae` |
| | **140** | | | |

A card count is the book's own exercises plus the drills the site builds over
that part's word list. **Part 1's *Read Better: long a* was removed on request**
(`1ad2430`): 17 cards became 16. Nothing else referenced it, and the part still
holds two other sorting exercises, so the site's own sort-the-words drill stays
suppressed and the drill set is unchanged. Every count on the site is derived
rather than stored, so the unit card, the progress rows and the site total
followed on their own. The Unit Check's word list is the whole unit, so its
drills take an even sample of 12 (`drillCap`) rather than all 78 — a 78-word
matching grid is unusable.

### Part 1 · Write Sentences — rebuilt (`9b92d2f`)

The task had six loose boxes under a paragraph describing a picture the project
did not have. It now has the picture — `assets/img/scene-park.webp`, above the
instruction, because the instruction is about it — and the paragraph is gone;
the image's alt text carries the description instead.

The six boxes became one table: a number, the words the row offers, and a box to
write the sentence in. The helper words are only what the picture supports —
Nina under the tree, Omer's blue cap, Gal on the bench, Shira's basket, the dog
and the ball on the grass — with *is / has / are*, so the row still practises the
part's two verbs. The sixth row is the student's own sentence.

The book's example named Mom; the woman in the picture is labelled Shira, so she
is called Shira. Nothing is asserted that the picture does not show.

It is the writing renderer in a table (`render: "sentence-table"`): the text
lives in the same `A.answers` array, so each row saves on its own through the
ordinary draft machinery and nothing is auto-marked. On a phone the table stops
being a table — each row becomes its own card, so nothing scrolls sideways.

### The method, applied to every section

1. Read that section's pages in the PDFs before touching content.
2. List the discrepancies against what is built, and get them approved.
3. Build from the book's own exercises. Where a printed exercise leans on a
   picture, describe the picture in words and mark the activity `adapted`.
4. Where an answer lives in a text, make the options real sentences from that
   text rather than writing distractors.
5. Carry the book's own ★ levels; Student's Book exercises carry none.
6. Name anything deliberately left out, and why.
7. Test, then stop for review before moving on.

### The scope rule

An out-of-scope page may be named **only inside an inactive skill record**,
where it is the reason a task cannot run. It is never a citation on a card.
Two such records survive by design: SB 18 (the Part 1 listening audio) and
SB 45 (a Part 5 reading). `09f4ce3` removed the last activity that broke this
rule — Part 1's word snake, which cited WB 8 and SB 17.

---

## 2. Bilingual activity titles

Every student-facing card shows the English title with the Hebrew directly
underneath, smaller, in the muted ink and right to left. The same pair heads the
activity screen itself. Source labels — `Book p.34`, `Workbook p.28.1` — are
never translated.

The Hebrew is **read off the English, not stored 137 times**
(`assets/js/views/labels.js`):

- an activity type carries both languages;
- a title the content writes out in full is listed by its English;
- the book names its exercises in a pattern — a task, then what it is about — so
  the task is looked up and the qualifier is carried across, which is why
  *Write the Words 2 — Word Power 2* needs no entry of its own.

Only prose is translated. A grammar form (`to be`, `am / is / are`, `s / es /
ies`), a sound (`long a`) and a heading printed in the book (`Word Power 1`,
`New Words 2`) stay in English, because that is the string in front of the
student.

**106 distinct English → Hebrew pairs resolve; none is missing.**

---

## 3. Print button removed

The *Print a word worksheet* button is gone from Getting Started, from every
Part and from the Unit Check, along with its click handler. The hidden print
layout stays: a teacher who presses Ctrl+P on a Part still gets the word sheet
with a blank column rather than a picture of the cards.

---

## 4. Dictation practice — an external resource

A link out to <https://www.hachtava.co.il/> for practising the words before a
dictation, added on request (`1ad2430`). The site is a free Hebrew and English
dictation trainer: it carries ready word lists and takes a typed list of your
own, which is what makes it usable with this unit's vocabulary.

```
Practice for Dictation          תרגול והכנה להכתבה
Practice your words before      תרגלו את המילים והתכוננו להכתבה.
the dictation.
Start Dictation Practice →      התחילו תרגול הכתבה
```

**Where it appears.** On every section that has a word list — the five Parts,
Getting Started and the Unit Check — placed with the word count and the progress
bar, above the first category block. It is not drawn on Home, on the Unit 1
overview or on My Progress, where there is nothing to practise.

**What it is not.** It is an `<aside>`, not an activity card. It sits outside the
numbered sequence because it is a site off this one rather than an exercise from
the book, nothing marks it done, and it touches no total: `partProgress` counts
visible activities only.

**How it behaves.** The link opens in a new tab with
`rel="noopener noreferrer"`. It is the one gold element on a Part screen — the
same warm card as everything else, an accent rule down its edge, a tinted tile
for the mark and a gold-outlined button — which is what makes it findable
without being loud. On a phone the button goes full width and the mark rises to
sit with the title.

---

## 5. Hero images

All nine slots carry artwork (`b1cb9eb`, `22d9f7f`). `assets/js/views/hero.js`
holds the slot names and a focal point per image, written straight into
`background-image` — a relative `url()` inside a custom property resolves
against the stylesheet, not the page, which is what sent the first attempt
looking for `assets/css/assets/img/`.

```
hero-home.webp              hero-part-2.webp      hero-part-5.webp
hero-getting-started.webp   hero-part-3.webp      hero-unit-check.webp
hero-unit-1.webp            hero-part-4.webp      hero-part-1.webp
```

Every band is the same height — **214px desktop · 208 tablet · 188 phone** — with
a 20px radius, the text left-aligned and the counts under a hairline.

The scrim is measured, not guessed. The Part bands carry a long page list, so
their ellipse reaches further right than the unit's; the unit keeps the tighter
one it was approved with, which lets more of the picture through.

One further picture is not a hero: `scene-park.webp`, the park that Part 1's
Write Sentences is about. It sits inside the activity, held to 620px rather than
cropped, because every name in it has to stay readable.

The site icon is `favicon.ico` at the project root alongside
`assets/favicon.svg`; both are declared in `<head>`.

---

## 6. Visual polish — one design language

`assets/css/polish.css` loads last and carries the language that was designed
and approved on the Unit 1 overview (`f660e5f`) to every screen (`25669a1`).
Most of the work is done by **redefining the tokens the earlier layers already
ask for**, so one palette reaches every component.

```
--navy  #152B40     --ivory #F6F2EA     --gold #C9A25A
--blue  #46658A     --white #FFFDF9     --sage #8FA68C
--ink   #1C2733     --ink-soft #5A6773  --line #E8E1D5
```

- **One card** everywhere: warm white, a hairline, an 18px radius, a soft shadow.
- **One quiet label**: an icon, a muted word, the faintest tint. The level star,
  the book reference and the Extra/Adapted tag all wear it.
- **One progress rail**: a sage hairline and a line of text, never a score.
- Section and category emoji sit in the same soft desaturated tile.
- Activity titles are set in the serif at 500; the Hebrew stays in the sans.
- The top bar is thinner, the gold band is now a hairline, buttons read as links.

---

## 7. Test results — full pre-deployment check

Every activity was opened and exercised, not merely counted.

```
Activities              140 / 140 opened          0 empty · 0 without controls
Bilingual               0 cards without Hebrew    0 activities without a
                                                  two-language instruction
Console errors          0
Network                 0 non-200 · 57 files checked directly against the server
Images                  9 heroes + 1 scene, all 200, all painted
Horizontal overflow     0 px at 320, 375, 768 and 1120
Grids                   Home 2→1 · Unit 1 3→2→1 · Parts 2→2→1
Hero height             214 / 208 / 188, identical on all ten bands
Hero contrast           worst line 5.0 desktop · 3.8 phone (large text, floor 3.0)
Card and page text      every measured value above AA
Dictation panel         7 sections · one href · opens in a new tab · destination
                        loads · counted on no total
Routing                 breadcrumbs, the Back button, browser back/forward and a
                        reload on a deep link all resolve
Progress                3 marked done → part, unit card, Home and My Progress all
                        agreed; Reset cancels and clears correctly
```

Renderers were driven, not just rendered:

```
mc            right answer scores · wrong answer says Try again and does NOT
              reveal the correct option
pairs         solved in full → 6 / 6 → Complete → counted
bins          word selected · dropped in a group · marked
unscramble    letters, Hebrew clue, input, Puzzle 1 of 14
reading       14 steps, a paragraph revealed per step
flashcards    next / previous / counter / speaker
sentence-table  three rows typed, activity left and re-entered, all restored,
              a fourth typed without disturbing them, progress untouched
```

### The one 404, and its fix

`/favicon.ico` returned 404 on every page load. The site never referenced it —
`index.html` declared `assets/favicon.svg`, which served correctly — but with no
`.ico` declared the browser probes the root for one on its own.

`favicon.ico` now sits at the project root, rendered from the existing SVG
artwork at six sizes (16–256). The artwork was not redesigned: the shapes were
replayed from the source file at its own coordinates, since no SVG rasteriser is
installed. Both icons are declared in `<head>`, the `.ico` first with
`sizes="any"`.

Verified in a clean browser tab: `/favicon.ico` → 200, `assets/favicon.svg` →
200, 47 resources loaded, **console completely empty**, and a control request for
a file that genuinely does not exist still returns 404.

---

## 8. Branch state

```
main             865802c   live site — untouched, equals origin/main
rebuild          ba95e7d   3 commits never deployed
english-hub-v2   9b92d2f   ← the last feature commit, plus housekeeping
tag              v1-single-file
```

**Do not deploy. Do not merge to `main`. Do not create a PR. Do not delete
`rebuild`.**

The live site still runs `865802c`, which shows `SB` / `WB` labels and 47 locked
cards. The three `rebuild` commits remain undeployed — still an open decision.

### Not being built
Identity, login, student name or class, teacher tracking, Google Sheets,
Apps Script.

---

## 9. Open items

- **Awaiting the go-ahead to deploy.** The design pass is approved and the full
  pre-deployment check has passed; nothing is merged or deployed.
- **Provenance flags on Parts 1 and 2.** Their 26 words still carry
  `heSource: "site"` from before the PDF audits, and `saw` (Part 2) is still
  flagged `needsReview`, although both parts were validated against the source.
  This is bookkeeping in the data, not something a student sees; the flags were
  left alone rather than changed during a visual-only pass.
- **Getting Started glosses.** Its 22 words carry the book's Hebrew
  (`heSource: book`) with `glossSource: "added-for-teaching"` — the definitions
  and examples were written for the site, as WB 4–7 prints none.
- **The three `rebuild` commits** and what the live site should eventually run.

---

## Running it locally

```
python tools/devserver.py        →  http://localhost:8123
```

ES modules need `http://`; opening `index.html` from disk will not work.

```
assets/css/   tokens · base · components · effects · polish · print
assets/js/    app · render · router · state · progress · events · nav
              drafts · storage · speech · helpers
              content/   load · model · validate      (Content Model v2)
              views/     home · section · part · activity · progress · navbar
                         hero · labels · categories · bilingual · breadcrumbs
              exercises/ engine · feedback + seven drills over a word list
content/      manifest.json · sections/getting-started.json · sections/unit-1.json
```
