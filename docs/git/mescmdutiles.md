---
sidebar: auto
---
# Mes cmd utiles

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