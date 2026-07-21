# Exercise 6 – Ignoring Unwanted Files with .gitignore

**Module reference:** Module 11 – Version Control (GIT), Git-HOL 2 — "Explain git ignore /
Implement git ignore command to ignore unwanted files and folders."

## Objective
Create a `.log` file and a `logs/` folder in the working directory, then update `.gitignore`
so that on committing, those files and folders are ignored — and verify with `git status`
that the working directory, staging area, and repository all reflect this correctly.

## What was done
1. Created `app.log` (a `.log` file) and `logs/debug.log`, `logs/access.log` (a log folder)
   in this exercise directory, alongside a real source file `app.js`.
2. Added a `.gitignore` with two rules:
   ```
   *.log
   logs/
   ```
3. Verified the ignore rules took effect before ever staging anything.

## Evidence

Before `.gitignore` existed, `git status` showed the whole untracked directory as one
opaque unit (git doesn't look inside an untracked directory by default):
```
?? Git/Exercise6_GitIgnore/
```

After adding `.gitignore`, running `git status --ignored` shows Git now sees inside the
directory and explicitly recognizes `app.log` and `logs/` as **ignored** (`!!`), while the
directory itself is still `??` because it still contains the un-ignored `app.js` and
`.gitignore`:
```
?? Git/Exercise6_GitIgnore/
!! Git/Exercise6_GitIgnore/app.log
!! Git/Exercise6_GitIgnore/logs/
```

Staging everything in the directory (`git add Git/Exercise6_GitIgnore/`) only picks up the
two real files — `git status --porcelain` and `git diff --cached --stat` after the add show
just:
```
A  Git/Exercise6_GitIgnore/.gitignore
A  Git/Exercise6_GitIgnore/app.js
```
`app.log`, `logs/debug.log`, and `logs/access.log` never enter the staging area or the
repository, confirming `.gitignore` is respected across the working directory, the index,
and (once committed) the local repository.

## Key takeaways
- `.gitignore` patterns are matched against paths relative to the `.gitignore` file's
  location (or the repo root, for a root-level file).
- `*.log` ignores by extension anywhere under that directory; `logs/` ignores the whole
  folder (trailing slash = directory-only match).
- Ignored files still show up under `git status --ignored`, which is the way to confirm a
  rule is actually taking effect rather than the file simply not existing yet.
- `.gitignore` only stops **future** tracking — a file already committed before being added
  to `.gitignore` will keep being tracked until explicitly removed with `git rm --cached`.
