# Git-HOL5 - Forking a Repository, Cloning, Making Changes, Pushing and Creating a Pull Request

**Cognizant Digital Nurture 5.0 - Java FSE Mandatory Hands-on**

## Objective
Practice the fork-based collaboration workflow: fork a repository on GitHub, clone the fork locally, make changes, push them, and open a pull request.

## Prerequisites
- Git installed and configured.
- A GitHub account.
- Access to a public repository to fork.
- Permission to create a pull request from the fork.

## Step-by-step Procedure
1. Open the target repository on GitHub and click **Fork**.
2. Clone the forked repository to the local machine.
3. Create a new branch for the change.
4. Make the required code or text update.
5. Stage and commit the change.
6. Push the branch to the fork on GitHub.
7. Open a pull request from the fork branch to the upstream repository.

## Commands
```bash
git clone <forked-repo-url>
cd <repo-folder>
git checkout -b feature/fork-pr-demo
git add <file>
git commit -m "Add change for Git-HOL5"
git push -u origin feature/fork-pr-demo
```

## Sample Terminal Output
```bash
$ git clone https://github.com/user/forked-demo-repo.git
Cloning into 'forked-demo-repo'...
done.

$ git checkout -b feature/fork-pr-demo
Switched to a new branch 'feature/fork-pr-demo'

$ git push -u origin feature/fork-pr-demo
Enumerating objects: 6, done.
Counting objects: 100% (6/6), done.
To https://github.com/user/forked-demo-repo.git
 * [new branch]      feature/fork-pr-demo -> feature/fork-pr-demo
branch 'feature/fork-pr-demo' set up to track 'origin/feature/fork-pr-demo'.
```

## Expected Result
- The repository is forked on GitHub.
- The fork is cloned locally and updated on a feature branch.
- The change is pushed to the fork.
- A pull request is created from the fork branch to the target repository.

## Conclusion
This hands-on demonstrates the standard open-source contribution workflow: fork, clone, branch, commit, push, and create a pull request.
