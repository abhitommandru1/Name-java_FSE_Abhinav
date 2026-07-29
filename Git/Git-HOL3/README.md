# Git-HOL3 - Branching, Switching Branches, Merging and Merge Conflict Resolution

**Cognizant Digital Nurture 5.0 - Java FSE Mandatory Hands-on**

## Objective
Create branches, switch between them, merge changes, and resolve a merge conflict.

## Prerequisites
- Git installed and configured.
- A repository with at least one committed file.
- A text editor for resolving conflicts.

## Step-by-step Procedure
1. Create a feature branch.
2. Switch to the branch and make a change.
3. Switch back to the main branch.
4. Make a conflicting change in the same file.
5. Merge the feature branch into the main branch.
6. Resolve the merge conflict manually.
7. Stage the resolved file and complete the merge commit.

## Commands
```bash
git branch
git switch -c feature/git-hol3-branch
git switch main
git merge feature/git-hol3-branch
git status
git add <conflicted-file>
git commit
git log --oneline --graph --decorate -n 10
```

## Sample Terminal Output
```bash
$ git switch -c feature/git-hol3-branch
Switched to a new branch 'feature/git-hol3-branch'

$ git switch main
Switched to branch 'main'

$ git merge feature/git-hol3-branch
Auto-merging feature.txt
CONFLICT (content): Merge conflict in feature.txt
Automatic merge failed; fix conflicts and then commit the result.

$ git status
both modified:   feature.txt
```

## Conflict Resolution Example
Open the conflicted file and keep the required final content by removing the conflict markers:

```text
<<<<<<< HEAD
Main branch line
=======
Feature branch line
>>>>>>> feature/git-hol3-branch
```

After editing, stage and commit the resolved file.

## Expected Result
- A branch is created and used for isolated work.
- The merge conflict is resolved correctly.
- The final merge commit appears in the history.

## Conclusion
This hands-on demonstrates the standard branch-based workflow used to isolate work and safely combine changes from different branches.
