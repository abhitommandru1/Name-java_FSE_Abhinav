# Exercise 5 – Tags, Rebase, and Cherry-pick

**Module reference:** Module 11 – Version Control (GIT). Not tied to a specific numbered
row in the mandatory-hands-on spreadsheet — the actual Git-HOL source document (5 numbered
labs) isn't available — this exercise covers the remaining core Git topics not yet
demonstrated in Exercises 1-4 (basic commands, branching/merging, remote collaboration,
stashing/undoing).

All commands below were run for real against a disposable scratch repo on `D:`, never
against this repository's actual history. The conflicts shown below are **genuine
conflicts this exercise actually hit while being built** — not scripted for effect —
kept in because they're a more honest and useful demonstration than a conflict-free path.

## Tags — marking a specific commit as a release point
```
$ git tag v1.0                              # lightweight tag: just a name for a commit
$ git tag -a v1.1 -m "Release 1.1 - bug fixes"   # annotated tag: has its own message, author, date
$ git tag -n
v1.0            Initial release
v1.1            Release 1.1 - bug fixes
```
Annotated tags (`-a`) are the recommended choice for releases — they carry metadata
(message, tagger, date) the way a commit does; lightweight tags are just a pointer.

## Rebase — replaying commits onto a new base for linear history
Started with a feature branch and a hotfix landing on `master` independently:
```
* ffb7cd7 Feature: step 2
* bbe2d1d Feature: step 1
| * eb1b354 Hotfix on master
|/
* 5406cb5 Initial release
```
Running `git rebase master` while on `feature` hit a **real conflict** — both branches had
appended a different line to the same spot in `app.txt`:
```
$ git rebase master
CONFLICT (content): Merge conflict in app.txt
error: could not apply bbe2d1d... Feature: step 1
```
Resolved by editing the file to keep both lines in order, then:
```
$ git add app.txt
$ git rebase --continue
Successfully rebased and updated refs/heads/feature.
```
Result — a **linear** history, as if the feature branch had been built starting from the
post-hotfix `master`:
```
* 01d9442 Feature: step 2
* 69300a5 Feature: step 1
* eb1b354 Hotfix on master
* 5406cb5 Initial release
```
Compare this to Exercise 2's `git merge`, which instead produces a merge commit with two
parents and keeps the branch history visibly separate. Rebase rewrites commit hashes
(`bbe2d1d` became `69300a5`) — this is exactly why rebase is unsafe on commits already
pushed/shared: anyone else who had `bbe2d1d` now has a diverged, orphaned copy.

## Cherry-pick — applying one specific commit onto another branch
First attempt used the **old, pre-rebase** commit hash by mistake (`ffb7cd7`, which no
longer exists on any branch after the rebase rewrote it) — this itself produced a real
conflict, which was aborted (`git cherry-pick --abort`) once the mistake was identified.

Retried with the correct post-rebase hash (`01d9442`, "Feature: step 2") cherry-picked
onto a fresh `release` branch that only had the hotfix, **not** "Feature: step 1":
```
$ git cherry-pick 01d9442
CONFLICT (content): Merge conflict in app.txt
```
This conflict is expected, not a mistake: "Feature: step 2"'s diff assumes the line added
by "Feature: step 1" already exists, but `release` never had that commit. Resolved by
editing the file directly, then:
```
$ git add app.txt
$ git cherry-pick --continue
[release 208c2bc] Feature: step 2
```

## Key takeaways
- **Rebase vs merge**: rebase produces linear history by rewriting commits (new hashes);
  merge preserves the branch structure with a merge commit. Never rebase commits that
  have already been pushed and might be in someone else's local history.
- **Cherry-pick conflicts are often a dependency problem**, not a text-diff coincidence —
  a commit that logically depends on an earlier commit will conflict if cherry-picked onto
  a branch missing that earlier commit, exactly as seen above.
- Every conflict here was resolved the same fundamental way: edit the file to the correct
  final content, `git add` it, then `--continue` the operation in progress.
