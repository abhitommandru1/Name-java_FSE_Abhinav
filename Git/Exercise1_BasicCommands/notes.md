# Exercise 1 – Git Basics (init, add, commit, status, log)

**Module reference:** Module 11 – Version Control (GIT), topic "Basic Git Commands"

## Objective
Practice the core Git workflow: initializing a repository, staging changes, committing them,
checking status, and reading history.

## Commands practiced

```bash
git init                      # create a new repository
git clone <url>                # copy an existing remote repository locally
git add <file>                 # stage a specific file
git add .                      # stage all changed/new files in the working directory
git commit -m "message"        # record staged changes as a new commit
git status                     # show staged/unstaged/untracked changes
git log                        # view commit history
git log --oneline              # compact one-line-per-commit history
git log --oneline -n 5         # limit history to last N commits
```

## Demo

`demo.txt` in this folder was created, staged, and committed to show the add → commit → log
cycle end to end.

```bash
$ git add Git/Exercise1_BasicCommands/demo.txt
$ git commit -m "Add Git Exercise 1 basic commands demo"
$ git log --oneline -1
<hash> Add Git Exercise 1 basic commands demo
$ git status
On branch main
nothing to commit, working tree clean
```

## Key takeaways
- The **working directory** holds edited files, the **staging area** holds what `git add`
  picked up, and the **repository** (`.git`) holds committed history — three distinct states
  every file moves through.
- `git status` should be checked before every commit to confirm exactly what will be recorded.
- `git log --oneline` is the fastest way to review recent history without noise.
