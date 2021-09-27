---
sidebar: auto
---
# Mes cmd utiles

## Get working directory up to date.
up = 
````
git pull --rebase --prune $@ && git submodule update --init --recursive
````

## Fix pb rebase (pr de collegues avec les miennes)
1. Git pull de master
1. git reset --soft HEAD~1
1. git stash
1. git rebase master
1. git stash pop
1. git commit -am "message"
1. git push origin HEAD --force

## git-clean 
- Remove untracked files from the working tree
Step 1 is to show what will be deleted by using the -n option:

### Print out the list of files which will be removed (dry run)
git clean -n
Clean Step - beware: this will delete files:

### Delete the files from the repository
git clean -f

- To remove directories, run git clean -f -d or git clean -fd
- To remove ignored files, run git clean -f -X or git clean -fX
- To remove ignored and non-ignored files, run git clean -f -x or git clean -fx
- Note the case difference on the X for the two latter commands.

If clean.requireForce is set to "true" (the default) in your configuration, one needs to specify -f otherwise nothing will actually happen.

## Desindexer fichiers 

```
git rm -r --cached .
git add .
git commit -m "Untracked files issue resolved to fix .gitignore"
```
## Savoir sur quelle branche on se trouve

```
git branch --show-current
```

## Simple Way to remove untracked files

To remove all untracked files, The simple way is to add all of them first and reset the repo as below
```
git add --all
git reset --hard HEAD
```

## Delete all merged local branches

````
git branch --merged | egrep -v "(^\*|master|dev)" | xargs git branch -d
````