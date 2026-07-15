# Exercise 4 – Stashing and Undoing Changes

**Module reference:** Module 11 – Version Control (GIT). Not tied to a specific numbered
row in the mandatory-hands-on spreadsheet — the actual Git-HOL source document (5 numbered
labs) isn't available — this exercise covers the "undo" side of Git that Exercises 1-3
(basic commands, branching/merging, remote collaboration) didn't touch.

All commands below were run for real against a disposable scratch repo on `D:` (created
and destroyed outside this project, never against this repository's actual history), and
the output shown is the genuine terminal output, not a written-out example.

## `git stash` — shelve uncommitted work temporarily
```
$ echo "line 2 - work in progress" >> notes.txt
$ git status --short
 M notes.txt
$ git stash push -m "WIP: adding line 2"
Saved working directory and index state On master: WIP: adding line 2
$ git status --short
                                          # clean — the change is stashed away
$ git stash list
stash@{0}: On master: WIP: adding line 2
$ git stash pop
Dropped refs/stash@{0} (8ca6f58...)
$ cat notes.txt
line 1
line 2 - work in progress          # the change is back
```

## `git reset` — three modes, three different blast radii
```
$ git log --oneline
78ec666 Add line 3 (mistake)
5deccb6 Add line 2
538f1d3 Initial commit

$ git reset --soft HEAD~1        # undo the commit, keep the change staged
M  notes.txt
5deccb6 Add line 2               # HEAD moved back, but nothing was lost

$ git reset HEAD                 # --mixed (default): unstage, keep working-dir changes
Unstaged changes after reset:
M	notes.txt

$ git checkout -- notes.txt      # discard the working-dir change entirely
$ cat notes.txt
line 1
line 2 - work in progress        # back to the last committed state
```

## `git revert` — undo a commit without rewriting history
```
$ git log --oneline
d966209 Add line 3 (bad change)
5deccb6 Add line 2
538f1d3 Initial commit

$ git revert --no-edit HEAD
[master 2d5ea27] Revert "Add line 3 (bad change)"

$ git log --oneline
2d5ea27 Revert "Add line 3 (bad change)"   # new commit that undoes the old one
d966209 Add line 3 (bad change)             # original commit still in history
5deccb6 Add line 2
538f1d3 Initial commit
```

## When to use which
| Command | Rewrites history? | Safe on already-pushed commits? | Use case |
|---|---|---|---|
| `git stash` | No | N/A (local only) | "I need to switch tasks but I'm not ready to commit" |
| `git reset --soft` | Yes (moves HEAD) | No | "Undo my last local commit, keep the changes staged" |
| `git reset --mixed` | Yes (moves HEAD) | No | "Undo my last local commit and unstage it" |
| `git reset --hard` | Yes (moves HEAD, discards changes) | No | "Throw away local commits and changes entirely" (destructive) |
| `git checkout -- <file>` | No | N/A | "Discard uncommitted changes to one file" |
| `git revert` | No — adds a new commit | **Yes** | "Undo a commit that's already been pushed/shared" |

## Key takeaways
- `reset` rewrites local history (moves what `HEAD` points to) — safe only on commits
  nobody else has pulled. `revert` is the safe equivalent for shared history: it adds a
  new commit rather than erasing the old one.
- `stash` is for uncommitted work you want to set aside temporarily, not a substitute for
  committing.
