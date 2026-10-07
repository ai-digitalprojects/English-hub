# Project Status — English Hub

**Last updated:** 2026-10-07
**Branch:** `english-hub-v2`, merged to `main` and published
**Working tree:** clean
**Live:** <https://ai-digitalprojects.github.io/English-hub/>
**The whole review round is deployed.** Book p.42.1 was the last open item and
is finished; the twenty commits that had been waiting are now on `main`.

---

## Where the project stands

The site is live at <https://ai-digitalprojects.github.io/English-hub/>. Two
rounds of review are now deployed: the readability pass, and the corrections
that put pictures where the book has pictures, fixed the Circle/Choose wording,
straightened text direction, stopped matching from dealing a row opposite its
own answer, and rebuilt four Part 5 activities.

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
| Every click-to-answer exercise says Choose, not Circle | ✅ |
| Picture choices where the book shows pictures — 4 activities, 35 images | ✅ |
| Matching never deals a row opposite its own answer | ✅ |
| Direction audit — 140 activities, resting and after interaction | ✅ |
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
Images                  9 heroes + 40 activity pictures, all 200
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
9f28bd1  Record the photographs and the task 5 wording
51865c6  Drop a hash a commit cannot know
6b6e366  Give Choose the Correct Picture its pictures, and draw the selected state
18ed24b  Put a picture beside each place in the Tokyo reading
6f668ff  Call Part 2's matching exercise what it is
f585e2e  Say choose, not circle, wherever the student clicks
f74a7e3  Show the food court, and let a match item face the right way
da1f1da  Give the Rex writing task something to start from
7b992f2  Never deal a matching row opposite its own answer
8181913  Picture the Part 5 tasks, sort by meaning, and give the tick a box
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

## 8b. The review round — pictures, wording, direction

A second review of the site produced eleven corrections. Each was checked
against the live site before it was treated as a defect; two of the eleven
turned out not to be defects, and are recorded as such.

### Pictures where the book has pictures

Three activities told students to look at a picture and then printed a
paragraph describing one. All three now show the pictures, through one
mechanism: an mc item may carry `oImg` beside its options, and the sentence
that described the picture becomes the image's alt text, so the stored value,
the answer and the reveal text are all unchanged and no other mc activity is
touched.

```
Part 1 · Book p.13.1    Choose the Correct Picture    8 questions, 16 images
Part 5 · WB p.37.1      Choose the Correct Picture    6 questions, 12 images
Part 5 · Book p.42.1    Choose the Correct Phrase     4 questions, 4 images
Getting Started p.6.4   Write Sentences               4 scene cards
Part 1 · SB p.15.4      Things to do in Tokyo         3 section pictures
Part 5 · SB p.43.3      Who Says It?                  1 full scene
```

Two shapes, because the two kinds of question are not the same one. Where the
*answer* is a picture, the options carry `oImg`. Where the *question* is a
picture — Book p.42.1 asks which phrase fits what you see — the item carries
`img` and no prompt is drawn at all: the picture is the question, and the
sentence that used to describe it is its alt text.

Supplied composites were split down the middle; where the panels carried A/B
badges the badge was cropped off, because the correct answer alternates
between the two positions and a badge would have put the pair out of order.
The correct side alternates in every picture activity, so it cannot be found
by where it sits.

### Wording

*Circle* is gone from every exercise the student clicks — two activity types
renamed rather than each activity, since every activity of either type is
multiple choice, which corrected the three screens carrying no title of their
own. Six written-out titles and seven instructions followed, in both
languages. One title keeps the word on purpose: Getting Started's *Circle,
Write and Translate* is a typing exercise, and its instruction already
explains that the workbook circles where the screen types.

Part 2's *Match Sentences to Pictures* has no pictures in it; it is *Complete
the Sentences*. Part 3's matching exercise has the same mismatch and is still
open — it was out of scope when it was found.

### Direction

The right-hand match column was set `direction:rtl` outright, on the
assumption that it is always the Hebrew one. It is Hebrew in the word-list
drills and English everywhere else, which is what threw the full stop to the
wrong end of an English sentence. Direction now follows what is written in
the item, and `bi()` states it on both halves rather than letting the English
lean on the page being left-to-right.

The audit that followed covered every element of all 140 activities, in the
resting state and again after selecting, checking, a wrong answer and a wrong
drop. **Nothing was found.** The single hit was a false positive: an English
`<b>` inside the English half of a bilingual line, computing left-to-right
all the way up.

### Matching

Both columns were already shuffled independently — that was not the defect.
What independent shuffling does not promise is that no row lands opposite its
own answer, which a plain shuffle fails to do about 63% of the time whatever
the number of pairs (measured over 20,000 trials: 63.1% at five pairs, 62.7%
at twenty-two). The two columns are now dealt together and reshuffled until no
row lines up. Display order only — scoring looks the partner up in the pair
list and never reads either column.

```
Who Says It?          40 deals   0 lined up   37 distinct right-hand orders
11 pairs activities   12 each    0 lined up
2 word-list drills    12 each    0 lined up
```

### Part 5, rebuilt where it was teaching the wrong thing

*Sort the Words* asked students to put the list back into New Words 1 and New
Words 2 — a fact about the book's layout. It is now **Sort the Words by
Meaning**, with three groups a Grade 6 reader can decide between:

```
Health / בריאות              get the flu · feel well · get better · medical · nurse
Actions / פעולות             come home · invite · tell a story · make a mistake · believe
How Much, How Good /         really · much · almost · full · excellent
  כמה וכמה טוב
```

Every word was checked against its own gloss before it was placed. The
suggested fourth group, *People*, would have held one word, so it is not
there; ten words that do not sort cleanly — *if, should, both, keep, miss,
see, kiss, sorry, date, a while* — are left out rather than forced into a
group a student could not predict. Adding the activity suppresses the old
drill on its own, because the part already covers that shape, so Part 5 still
shows 19 cards.

*Translate and Tick* told students to tick the sentences true for them and
gave them nothing to tick. Each row now has the sentence, a field for the bold
word in Hebrew, and a tick — 44px of target, full width on a phone. Ticks live
in `A.ticks` beside the translations and persist with the draft. Nothing is
marked: a translation is the student's own and the tick is about their own
life.

### Support for the open writing task

Workbook p.21.3 — which is in **Part 2**, not Part 5 — asks a learner to read
four sentences about a dog and then write about a pet, with nothing in
between. Two boxes now sit above the writing area: fourteen words with their
Hebrew, in two columns so the box finishes level with the one beside it, and
seven sentences already begun. Both are optional fields on a writing activity,
so the other five writing tasks are unchanged.

### Still open

- **Book p.42.1 is finished.** The four pictures were supplied and are in: a
  calendar reading *Meet Karen at 5:00*, a sunny park by a pond, a boy
  celebrating in a park, and a man and a boy reading on a sofa. The written
  descriptions are gone from the screen and survive as alt text, and the task
  reads *Look at the picture. Choose the correct phrase.*
- **Part 3's matching exercise** is corrected too. It now reads *Complete the
  Sentences* with the same instruction as Part 2. Worth knowing: unlike Part 2,
  its sentences are already complete — *She is taking a picture of the birds.*
  matched to *take a picture* — so nothing is actually filled in. The wording
  was specified; a title that described the task exactly would be *Match
  Sentences to Phrases*.

---

## 9. Branch state

```
main             published   the live site · equals origin/main
english-hub-v2   published   merged into main, kept
rebuild          ba95e7d     0 commits that are not already in main
tag              v1-single-file
```

**Do not delete `english-hub-v2` or `rebuild`. Do not rewrite history. Do not
force push.** The repository and the public URL do not change:
<https://ai-digitalprojects.github.io/English-hub/>.

### Not being built
Identity, login, student name or class, teacher tracking, Google Sheets,
Apps Script.

---

## 10. Where things stand, and what is left

### Deployed

Everything in §8 and §8b is live. The working tree is clean and `main` carries
the whole review round.

### The review round is complete

Every item from the review is done and deployed. The last one — Part 3's
matching exercise, which inherited *Match Sentences to Pictures* without having
any — now reads *Complete the Sentences*, matching Part 2.

One nuance recorded rather than silently settled: Part 3's sentences are not
gapped the way Part 2's are. A student matches *She is taking a picture of the
birds.* to *take a picture*; nothing is completed. The wording was specified,
and *Match Sentences to Phrases* would describe the task more exactly if that
is preferred.

### Judgement calls worth confirming

- **Sort the Words by Meaning uses three groups**, not the four suggested:
  *People* would have held one word. Ten words that do not sort cleanly are
  left out rather than forced. §8b lists them.
- **`.stChip` went from 13.8px to 15.2px**, which also enlarges the word chips
  in Part 1's Write Sentences table.

### Still open from before

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
