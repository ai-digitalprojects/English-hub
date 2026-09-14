# THINK ABOUT IT! — Grade 6 English Learning Hub

A practice site for Grade 6 English at Gevim School, built around the
**THINK ABOUT IT!** Book and Workbook.

Live site: <https://ai-digitalprojects.github.io/English-hub/>

---

## How the site is organised

The site follows the book, not a structure of its own.

```
Home
├── Getting Started
└── Unit 1
    ├── Part 1 · All About Japan
    ├── Part 2 · Snow Monkeys
    ├── Part 3 · Let's Go
    ├── Part 4 · Made in Japan
    ├── Part 5 · Story
    └── Unit Check
```

Inside a part the work is split in two, the same way the books are:

| Lane | Comes from |
|---|---|
| 📘 **Learn** | the Book — word lists, grammar rules, Read Better |
| 📝 **Practice** | the Workbook — the exercises |

Every activity shows the page it comes from (`SB p.20`, `WB p.17.3`) and the
book's own difficulty stars: ★ warm up, ★★ practice, ★★★ challenge.

---

## Two kinds of practice

**Catalogued workbook exercises.** Every exercise in the scanned pages is
listed with its type, skill, star level and page — but its questions were never
transcribed, so these cannot be played yet. They are shown greyed out and say
so. Adding the items to the content model is what turns one on; no code change
is needed.

**Word-list drills.** Seven exercises the site builds over the vocabulary it
does hold. They are marked `📚 Word list` and never cite a workbook page,
because they are not workbook exercises:

Match the Words · Choose the Correct Meaning · Complete the Sentences ·
Sort the Words · Word Puzzle · Build a Sentence · Write It Yourself

A drill only appears where the data supports it. Part 3 has no Hebrew recorded,
so it offers only sorting and writing.

---

## Running it locally

The site is plain HTML, CSS and ES modules — no build step, no dependencies.
It must be served over `http://`; opening `index.html` from the file system
will not work, because browsers refuse to load ES modules and JSON that way.

```bash
python tools/devserver.py
```

Then open <http://localhost:8123>. That small script is `http.server` with
caching switched off, so an edit to `content/` shows up on the next reload.
`python -m http.server 8123` works too, but you may have to force-refresh.

---

## Project layout

```
index.html                  page shell
assets/
  favicon.svg
  css/   tokens · base · components · print
  js/
    app.js                  entry point
    router.js               hash routing, three levels deep
    state.js                in-memory state
    progress.js             completion percentages
    storage.js              progress in localStorage
    drafts.js               free-text drafts in localStorage
    content/                model loading, indexing, validation
    views/                  home · section · part · activity · progress
    exercises/              the seven word-list drills
content/
  manifest.json             sections, star levels, book metadata
  sections/*.json           the vocabulary and exercise catalogue
```

---

## Editing the content

All teaching content lives in `content/` as JSON. Nothing in `assets/js`
needs to change to add or correct material.

**A vocabulary entry**

```json
{
  "en": "afraid",
  "he": "פוחד",
  "ar": null,
  "definition": "feeling fear",
  "example": "I am not afraid of dogs.",
  "group": "new-words",
  "source":  { "book": "students", "page": 12 },
  "alsoOn":  [{ "book": "workbook", "page": 8 }],
  "missing": ["ar"]
}
```

**A catalogued exercise**

```json
{
  "id": "complete-sentences",
  "type": "complete-the-sentences",
  "skill": "vocabulary",
  "level": 2,
  "lane": "practice",
  "source":   { "book": "workbook", "page": 17, "exercise": 2 },
  "linkedTo": { "book": "students", "page": 24, "exercise": 3 }
}
```

`level` is the book's stars: `1` = ★, `2` = ★★, `3` = ★★★, `null` = unstarred.

### Adding Unit 2

1. Create `content/sections/unit-2.json` with the same shape as `unit-1.json`.
2. Add it to the `sections` list in `content/manifest.json`.

The routing, breadcrumbs, progress and drills all pick it up. There is nothing
else to change.

---

## What is deliberately missing

Nothing in this project invents textbook content. Where source material was not
in the scanned pages, the gap is recorded rather than filled in:

- **Arabic** is not recorded for any word. The field exists and is `null`.
- **Hebrew** is missing for the 14 Part 3 words and for `Dear ...`.
- **Reading, listening and speaking** are modelled on every part but inactive,
  each with the reason. Two keep the task we have while the text or audio it
  refers to is still missing.
- **Phonics practice** pages (Workbook 233–234) were not scanned.
- Picture-based exercises, the `-s / -es / -ies` verb sort and the collocation
  lists cannot be built at all until their items are transcribed.

`assets/js/content/validate.js` checks the model and reports what is missing.

---

## Printing

Every part has **Print a word worksheet**, which prints the word list as a
worksheet with a blank column to write in, plus name, class and date lines.
Everything interactive is left off the page.

---

## Progress and privacy

Progress and unfinished writing are kept in the browser's `localStorage` on the
student's own device. Nothing is sent anywhere, there is no account and no
server. Clearing the browser's site data clears it, and **Reset My Progress**
on the progress page does the same.
