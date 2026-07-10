# Exercise 3 – Remote Repositories and Collaboration

**Module reference:** Module 11 – Version Control (GIT), topics "Remote Repositories",
"Collaborating with Git"

## Objective
Understand how a local repository links to a remote one, and how forking + pull requests
enable collaboration on a shared codebase.

## Commands practiced

```bash
git remote -v                       # list configured remotes and their URLs
git remote add origin <url>         # link a local repo to a remote
git push origin main                # push local commits to the remote
git push -u origin <branch>         # push a new branch and set it to track the remote
git pull origin main                # fetch + merge remote changes into the current branch
git fetch                           # download remote changes without merging
```

## This repository's remote

```
$ git remote -v
origin  https://github.com/abhitommandru1/Name-java_FSE_Abhinav.git (fetch)
origin  https://github.com/abhitommandru1/Name-java_FSE_Abhinav.git (push)
```

`main` tracks `origin/main`, so `git push` / `git pull` (no arguments) act on that remote
branch by default.

## Forking and Pull Requests
- **Forking** creates a personal copy of someone else's repository under your own GitHub
  account. Changes are made on the fork, not the original.
- A **Pull Request (PR)** proposes merging changes from a branch (in a fork, or in a branch
  of the same repo) back into the target repository's branch — it's the review/discussion
  unit before a merge happens.

## Collaboration workflows
- **Centralized workflow** — everyone pushes directly to a shared `main`; simplest, works
  for small trusted teams.
- **Feature Branch workflow** — every change lives on its own branch and merges via PR;
  used in this repo (see Exercise 2).
- **Forking workflow** — contributors fork the repo, branch on their fork, and open PRs from
  fork → upstream; standard for open-source projects where contributors don't have direct
  write access.
- **Gitflow workflow** — adds `develop`, `release/*`, and `hotfix/*` branches around the
  feature-branch model for teams doing scheduled releases.

## Practicing fork + PR
Forking and opening a PR happen through GitHub itself (Fork button on a repo page; "New
pull request" once a branch exists), not through local `git` commands. Practiced against a
small public repo (or a second personal repo) as follows:
1. Fork the target repo on github.com.
2. `git clone` your fork locally.
3. Create a feature branch, commit a change, `git push -u origin <branch>`.
4. On github.com, open a Pull Request from your branch into the upstream `main`.
