# Git-HOL1 - Git Installation, Configuration, Repository Creation and First Commit

**Cognizant Digital Nurture 5.0 - Java FSE Mandatory Hands-on**

## Objective
Set up Git on the local machine, configure user identity, create a repository, and make the first commit.

## Prerequisites
- Git installed on the system.
- A terminal window.
- A working folder for practice.

## Step-by-step Procedure
1. Verify Git installation.
2. Configure the user name and email address.
3. Create a new project folder.
4. Initialize the folder as a Git repository.
5. Create a first file.
6. Stage the file and create the first commit.
7. Verify the repository history.

## Commands
```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
mkdir Git-HOL1-Demo
cd Git-HOL1-Demo
git init
echo Git HOL 1 > README.md
git status
git add README.md
git commit -m "Initial commit for Git-HOL1"
git log --oneline
```

## Sample Terminal Output
```bash
$ git --version
git version 2.45.1

$ git init
Initialized empty Git repository in D:/deepskilling/Git/Git-HOL1-Demo/.git/

$ git status
On branch main

No commits yet

Untracked files:
  README.md

$ git commit -m "Initial commit for Git-HOL1"
[main (root-commit) a1b2c3d] Initial commit for Git-HOL1
 1 file changed, 1 insertion(+)
 create mode 100644 README.md

$ git log --oneline
a1b2c3d Initial commit for Git-HOL1
```

## Expected Result
- Git is installed and configured correctly.
- The folder is initialized as a Git repository.
- The first file is committed successfully.
- `git log` shows the initial commit.

## Conclusion
This hands-on demonstrates the complete starting workflow for Git: installation verification, user configuration, repository creation, staging, committing, and history review.
