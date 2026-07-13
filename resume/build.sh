#!/bin/bash
# Build the resume artifacts from this folder's sources into public/,
# so they ship with the next site deploy.
#   resume-print.html  →  public/resume.pdf   (via headless Chromium, A4)
#   resume.md          →  public/resume.md    (verbatim copy)
set -e
cd "$(dirname "$0")"
npx -y playwright pdf --paper-format=A4 "file://$PWD/resume-print.html" ../public/resume.pdf
cp resume.md ../public/resume.md
echo "✓ Built public/resume.pdf and public/resume.md"
echo "  Preview: open ../public/resume.pdf"
