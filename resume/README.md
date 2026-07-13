# Resume workspace

The single place to iterate on the resume. The website serves whatever is in
`public/` — these are the sources that generate it.

| File | What it is |
|---|---|
| `resume-print.html` | Designed source of the PDF (edit text/styles here) |
| `resume.md` | Markdown version ("paste into Claude / AI" download) — keep in sync with the HTML |
| `build.sh` | Renders `resume-print.html` → `public/resume.pdf` (A4, one page) and copies `resume.md` → `public/` |

## Workflow

1. Iterate on `resume-print.html` and `resume.md` (or ask Claude to).
2. `./build.sh` — regenerates the public artifacts.
3. Preview `public/resume.pdf`. Check it is still **one page**.
4. Say **"push it"** — commit + push `main` + `npm run deploy` publishes it to
   krishnazolpatil.com (Resume menu → Preview / Download PDF / Markdown).

Keep both files telling the same story: the PDF is what recruiters download,
the markdown is what gets pasted into AI screeners.
