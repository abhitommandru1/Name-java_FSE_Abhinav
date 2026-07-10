# Exercise 2 – Branching and Merging

**Module reference:** Module 11 – Version Control (GIT), topics "Branching and Merging",
"Branching Strategies"

## Objective
Create a feature branch, make an isolated change, and merge it back into `main` —
demonstrating the standard feature-branch workflow.

## Commands practiced

```bash
git branch                                  # list local branches
git checkout -b feature/git-exercise-branching  # create + switch to a new branch
git checkout main                           # switch back to main
git merge feature/git-exercise-branching    # merge the feature branch into main
git log --oneline --graph -n 6              # visualize branch/merge history
```

## Demo walkthrough

1. `feature.txt` was added on `main` as the starting point.
2. Branch `feature/git-exercise-branching` was created from `main`.
3. On the feature branch, `feature.txt` was edited to add a new line — an isolated change
   that does not touch `main` until merged.
4. Switched back to `main` and ran `git merge feature/git-exercise-branching`.
5. `git log --oneline --graph` (see below) shows the branch point and merge.

```
<merge log will show two parents joining: the main-line commit and the feature-branch commit>
```

## Branching strategies (concept notes)
- **Feature branching** — one branch per feature/fix, merged back into main when complete
  (the workflow demonstrated above).
- **Release branching** — a branch cut from main to stabilize a version for release while
  main keeps moving forward.
- **Git Flow** — combines `main` (production), `develop` (integration), plus short-lived
  `feature/*`, `release/*`, and `hotfix/*` branches.

## Merge conflicts
A conflict occurs when the same lines of a file are changed differently on both branches
being merged. Git marks the conflicting region with `<<<<<<<`, `=======`, `>>>>>>>` markers
in the file; resolving it means editing the file to the correct final content, then
`git add <file>` and `git commit` to complete the merge.
