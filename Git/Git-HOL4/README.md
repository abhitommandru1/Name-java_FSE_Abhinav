# Git-HOL4 - Working with Remote Repositories (GitHub, git remote, git push, git pull)

**Cognizant Digital Nurture 5.0 - Java FSE Mandatory Hands-on**

## Objective
Connect a local repository to GitHub, push changes to the remote repository, and pull updates from it.

## Prerequisites
- Git installed and configured.
- A GitHub account.
- A repository created on GitHub or an existing remote repository URL.

## Step-by-step Procedure
1. Create a repository on GitHub.
2. Add the remote URL to the local repository.
3. Verify the configured remote.
4. Commit local changes.
5. Push the branch to GitHub.
6. Make a change on the remote side or in another clone.
7. Pull the remote updates into the local branch.

## Commands
```bash
git remote -v
git remote add origin <github-repo-url>
git branch -M main
git push -u origin main
git pull origin main
git fetch
```

## Sample Terminal Output
```bash
$ git remote -v
origin  https://github.com/user/git-hol4-demo.git (fetch)
origin  https://github.com/user/git-hol4-demo.git (push)

$ git push -u origin main
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Writing objects: 100% (3/3), done.
To https://github.com/user/git-hol4-demo.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.

$ git pull origin main
Already up to date.
```

## Expected Result
- The local repository is connected to GitHub through a remote.
- Commits can be pushed to the remote branch.
- Remote changes can be pulled back into the local repository.

## Conclusion
This hands-on shows how Git connects a local repository with GitHub so that source code can be shared, updated, and synchronized.
