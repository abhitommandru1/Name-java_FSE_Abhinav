# Git-HOL2 - Basic Git Commands (git status, git add, git commit, git log)

**Cognizant Digital Nurture 5.0 - Java FSE Mandatory Hands-on**

## Objective
Practice the basic Git commands used during everyday development: checking status, staging changes, committing, and reviewing commit history.

## Prerequisites
- Git installed and configured.
- A local Git repository.
- At least one sample text file in the repository.

## Step-by-step Procedure
1. Open the repository in a terminal.
2. Check the current state using `git status`.
3. Create or modify a file.
4. Stage the file using `git add`.
5. Commit the staged change using `git commit`.
6. Review the commit history using `git log`.

## Commands
```bash
git status
git add <file>
git add .
git commit -m "Descriptive commit message"
git log
git log --oneline
git log --oneline -n 5
```

## Sample Terminal Output
```bash
$ git status
On branch main
Untracked files:
  demo.txt

$ git add demo.txt
$ git commit -m "Add demo.txt for Git-HOL2"
[main 4d5e6f7] Add demo.txt for Git-HOL2
 1 file changed, 1 insertion(+)
 create mode 100644 demo.txt

$ git log --oneline
4d5e6f7 Add demo.txt for Git-HOL2
a1b2c3d Initial commit for Git-HOL1
```

## Expected Result
- `git status` clearly shows untracked, modified, or staged files.
- `git add` moves changes into the staging area.
- `git commit` records the staged change in repository history.
- `git log` displays the commit trail.

## Conclusion
This hands-on reinforces the daily Git workflow used in real projects to inspect changes, stage work, create commits, and verify history.
