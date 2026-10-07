# Project Status — English Hub

**Last updated:** 2026-10-07
**Branch:** `english-hub-v2`
**Commit:** `3279e8c` — *Use the supplied photographs and reword task 5*, plus
this status update on top of it.
**Working tree:** clean
**`main`:** `5706a35`, unchanged and identical to `origin/main` — this is what the
live site serves.
**Eight commits sit on `english-hub-v2` ahead of `main`, none merged, none deployed.**

---

## Where the project stands

The site is live at <https://ai-digitalprojects.github.io/English-hub/> running
`5706a35`. Everything since then is readability and two rebuilt Getting Started
activities, finished and tested on the branch, **waiting for review**.

| | |
|---|---|
| Every section built from the source PDFs | ✅ |
| Bilingual activity titles on every card | ✅ |
| Print button removed from the student interface | ✅ |
| Nine hero images integrated | ✅ |
| One design language across every screen | ✅ |
| Dictation practice — now one link in the top bar, site-wide | ✅ |
| Part 1 Write Sentences rebuilt around the park picture and a writing table | ✅ |
| Hebrew set at the size of the English, site-wide | ✅ |
| Top bar set at reading size | ✅ |
| Getting Started Write Sentences rebuilt around four supplied pictures | ✅ |
| Getting Started Task 7 replaced with Vocabulary Review | ✅ |
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
| Getting Started | 15 | 22 | WB 4–7 | `55367c4` `8a5e4b2` |
| Part 1 · A Trip to Japan | 16 | 13 | SB 12, 13, 15 · WB 10–13 | `0bd5062` `1ad2430` |
| Part 2 · Snow Monkeys | 27 | 13 | SB 20, 22–25, 27 · WB 16–21 | `80068f0` |
| Part 3 · Let's Go | 18 | 14 | SB 28, 29, 30 · WB 24–27 | `9002742` |
| Part 4 · Made in Japan | 26 | 13 | SB 34, 35, 39–41 · WB 28–33 | `d386c94` |
| Part 5 · Story | 19 | 25 | SB 42, 43, 47 · WB 36–39 | `a756da1` |
| Unit Check | 19 | 78 | SB 51, 52 · WB 41–43 | `2a9faae` |
| | **140** | | | |

A card count is the book's own exercises plus the drills the site builds over
that part's word list. **Getting Started's sort-the-words drill was replaced by
a Vocabulary Review activity** (`8a5e4b2`), so its count is unchanged at 15; the
drill still runs on Parts 3 and 5, which is where it earns its place. **Part 1's *Read Better: long a* was removed on request**
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

**It lives in the top bar** (`7944e7e`), between Home and My Progress, so it is
one item reachable from every screen rather than a panel repeated on seven of
them. The large card it used to be is gone from Getting Started, from all five
Parts and from the Unit Check.

```
✍️ Dictation Practice    תרגול הכתבה
```

**What it is not.** It is an `<a>`, not an activity. Nothing marks it done and it
touches no total: `partProgress` counts visible activities only.

**How it behaves.** Opens in a new tab with `rel="noopener noreferrer"`. It is
the one gold thing in the bar — gold is used nowhere else up there, which is what
makes it findable. The gold text reads 7.6:1 on the navy and its outline 3.2:1,
so the outline clears the 3:1 a control's own boundary has to meet.

**On a phone** it moves up beside the brand, where the right-hand half of that
row was empty, shortens to *Dictation*, and sets its Hebrew under its English
instead of beside it. The bar grows 20px rather than taking a third row.

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

Five further pictures are not heroes. `scene-park.webp` is the park that Part
1's Write Sentences is about; it sits inside the activity, held to 620px rather
than cropped, because every name in it has to stay readable. The four other
`scene-*.webp` files are the pictures for Getting Started's Write Sentences
(§8), one per card, supplied by the teacher and resized to 1000px wide.

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
- The top bar is thinner, the gold band is now a hairline, buttons read as links —
  but the type in it is set at reading size, not at chrome size (see §8).
- The Hebrew half of a bilingual line is set once, on `.biHe`, at the size of the
  English beside it (see §8).

---

## 7. Test results — full pre-deployment check

Every activity was opened and exercised, not merely counted.

```
Activities              140 / 140 opened          0 empty · 0 without controls
Bilingual               0 cards without Hebrew    0 activities without a
                                                  two-language instruction
Console errors          0
Network                 0 non-200 · 57 files checked directly against the server
Images                  9 heroes + 5 scene pictures, all 200
Horizontal overflow     0 px at 320, 375, 768 and 1120
Grids                   Home 2→1 · Unit 1 3→2→1 · Parts 2→2→1
Hero height             214 / 208 / 188, identical on all ten bands
Hero contrast           worst line 5.0 desktop · 3.8 phone (large text, floor 3.0)
Card and page text      every measured value above AA
Dictation              one link in the top bar · opens in a new tab ·
                        destination loads · counted on no total
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

## 8. Readability, and two rebuilt Getting Started activities — 7 October

Five commits sit on the branch above the live site. All five are finished and
tested; **none has been reviewed, merged or deployed.**

```
0352332  Make the answer buttons readable
053f503  Set the Hebrew in an instruction to the size of the English
fa12201  Set the top bar at reading size
7944e7e  Set the Hebrew at reading size and move dictation into the bar
8a5e4b2  Rebuild Write Sentences around pictures and replace Task 7
4d2d9ea  Record the checkpoint: five commits waiting on review
3279e8c  Use the supplied photographs and reword task 5
(this one) Record the photographs and the task 5 wording
```

### Answer buttons and instructions (`0352332`, `053f503`)

The matching and multiple-choice buttons were warm white on a warm white card
and all but vanished. They now sit on a deeper tint of the same family with a
`#A4906B` border — 3.05:1 against the card, the lightest tone that clears the
3:1 a control's own boundary has to meet — at 18.9px with more padding and more
space between rows. Sort the Words was deliberately left alone at the time, and
has since been replaced outright.

### The top bar (`fa12201`)

The header was the smallest type on the site. The brand went 13.1 → 16.6px, its
school line 10.6 → 13.4, the buttons 12.2 → 15.2. The band itself grew 1.5px,
because the leading is tight and the buttons carry their height in padding. At
320px the three buttons wanted 307px of a 292px row, so below 360px the padding
gives way rather than the words.

### Hebrew, set once (`7944e7e`)

The Hebrew half of a bilingual line was at 94% of the English. Hebrew carries no
ascenders or descenders, so it read smaller still. It is now set to parity on
`.biHe` — one rule — with more leading and one step of weight, which moves
instructions, category headings and leads, origin badges, progress labels,
buttons, table headings and card titles together. What keeps it secondary is the
muted ink, not the size. A few English labels set at 11 or 12px came up with it,
because a label that small leaves its Hebrew nowhere to go.

One trap worth recording: the origin badge needed `opacity:1` written out rather
than merely omitted. The components layer fades that Hebrew to 0.75, which left
the second half of the badge at 3.15 against its own tint.

```
lowest-contrast Hebrew anywhere on the site   4.67
smallest Hebrew anywhere on the site          13.1px at 5.19
```

### Getting Started · Write Sentences (`8a5e4b2`)

Workbook p.6.4 asked for a sentence about each picture and then printed a
paragraph describing the picture instead of showing one. The four pictures were
first drawn as SVG from the descriptions the activity carried; they were then
**replaced by four supplied illustrations** (`3279e8c`), which is what the
activity ships with. The drawn files were deleted rather than left unused.

```
scene-new-words.webp      the teacher at the board, which says New Words,
                          children with a hand up
scene-dictionary.webp     a boy writing in his notebook, an open dictionary
                          beside him
scene-instructions.webp   two children reading a sheet headed Instructions
scene-tablet.webp         a boy at a tablet with a keyboard and a Vocabulary book
```

Each word bank was rewritten to match what its new picture actually shows, and
every word in it is one of the 22 verified Getting Started words:

```
1  raise · vocabulary · repeat        3  instructions · conversation · task
2  dictionary · spell · complete      4  vocabulary · keyboard · find out
```

Each is a card — a numbered badge, the picture, three words to use, one box —
two up on a desktop and one up on a phone, so a picture never parts company
with its box. The
descriptions survive as the images' `alt` text, which is where a description
belongs. A new `scene-cards` renderer draws them and stores into the same
`A.answers` array the writing renderer uses, so each card saves on its own
through the existing draft machinery and nothing is auto-marked. Still ★★★,
still `Workbook p.6.4`.

### Getting Started · Task 7 (`8a5e4b2`)

Task 7 was *Sort the Words*, a derived drill that asked students to sort the list
back into Word Power 1 and Word Power 2 — the two halves of one list, which is a
fact about the book's layout rather than anything about English.

A part can now name a drill it does not want (`skipDrills` in the section file,
honoured in `derivedActivities`), and Getting Started names that one. No other
part's drill set changes.

In its place, **Vocabulary Review** / *חזרה על אוצר המילים*: ten sentences with
three choices each, built only from the 22 verified Getting Started words —
answers and distractors alike. It is an ordinary `mc` activity of the content
model, so retry, the answer staying hidden after a first mistake, and the praise
after a correct one are the behaviour every other question already has. The
correct option sits at position 1, 2 and 3 in turn, so it cannot be guessed from
where it is.

### Getting Started · task 5 wording (`3279e8c`)

*Circle the Correct Words* became **Choose the Correct Words** / *בחרו את המילים
הנכונות*, on the card, on the activity heading and in the task line. Nothing is
circled on a screen. The change is on this activity only: the type's own title
still reads *Circle* for the printed exercises elsewhere that do ask for it.

**Eight other screens still say Circle** and were deliberately left alone —
Part 1 `circle-be-have`, Part 2 `circle-correct` and `circle-wh` (all three take
their title from the type), Part 4 `circle-present-simple`, `true-false` and
`choose-two-answers`, and Unit Check `to-be`, `have-has` and `circle-two-correct`.
Changing them is a one-pass edit whenever it is wanted.

### Tested

```
Getting Started      15 cards — unchanged (Task 7 replaced, not added to)
Site total           140 activities — unchanged
1000px               140 / 140 open · 0 overflow · 0 console errors
375px                140 / 140 open · 0 overflow
320px                header on two rows, nothing clipped
Draft saving         two cards typed, left the activity, returned, both restored;
                     a third typed without disturbing them; nothing marked done
Vocabulary Review    wrong answer → Try again, wrong choice marked, correct one
                     NOT revealed, retry allowed; correct → Great job!;
                     all ten questions run to the finish block
Dictation link       destination loads in a new tab
Pictures             5 scene images, all 200, all decoded and painted
```

---

## 9. Branch state

```
main             5706a35   the live site · equals origin/main · untouched today
english-hub-v2   3279e8c+  8 commits ahead of main, none reviewed or deployed
rebuild          ba95e7d   0 commits that are not already in main
tag              v1-single-file
```

**Do not deploy. Do not merge to `main`. Do not create a PR. Do not delete
`rebuild` or `english-hub-v2`. Do not rewrite history. Do not force push.**

The live site at <https://ai-digitalprojects.github.io/English-hub/> serves
`5706a35`. Every commit `rebuild` holds is already reachable from `main`, so
nothing on it is at risk.

### Not being built
Identity, login, student name or class, teacher tracking, Google Sheets,
Apps Script.

---

## 10. Where we stopped, and what comes next

### Unfinished

Nothing is half-built. The working tree is clean and every change is committed.
What is outstanding is **review**, not work:

- **The commits on `english-hub-v2` have not been reviewed.** They are the
  answer-button readability pass, the two Hebrew sizing passes, the top bar, the
  two rebuilt Getting Started activities, and the supplied photographs with the
  task 5 rewording.

### The exact next step when we resume

> **Review the rebuilt Getting Started activities on the local preview:**
> `http://localhost:8123/#/getting-started/write-sentences`,
> `http://localhost:8123/#/getting-started/vocabulary-review` and
> `http://localhost:8123/#/getting-started/circle-correct`.
> Then say whether to keep them, change them, or revert.

A note on sequencing, so the record is straight: the request to stop named the
two rebuilds as the next work, and they had already been built and committed as
`8a5e4b2` when it arrived. Work resumed afterwards on request, to swap in the
supplied pictures and reword task 5. If a piece is not wanted, each is its own
commit and can be reverted without touching the others.

Two questions are worth deciding at the same time:

- **Eight other screens still say Circle** (listed in §8). Task 5 was the only
  one in scope; say whether the rest should follow.
- **`.stChip` went from 13.8px to 15.2px**, which also enlarges the word chips in
  Part 1's Write Sentences table. It was the last thing left at the old size. Say
  if Part 1 should keep the smaller chip.

### Still open from before

- **Awaiting the go-ahead to merge and deploy** anything above `5706a35`.
- **Provenance flags on Parts 1 and 2.** Their 26 words still carry
  `heSource: "site"` from before the PDF audits, and `saw` (Part 2) is still
  flagged `needsReview`, although both parts were validated against the source.
  This is bookkeeping in the data, not something a student sees.
- **Getting Started glosses.** Its 22 words carry the book's Hebrew
  (`heSource: book`) with `glossSource: "added-for-teaching"` — the definitions
  and examples were written for the site, as WB 4–7 prints none.

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
