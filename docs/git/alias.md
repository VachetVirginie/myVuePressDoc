# Alias

color
        ui = true

alias
Commons
    co = checkout
    cob = checkout -b
    st = status -s
    c = commit
    cm = commit
    cam = commit -am
    br = branch
        
 Get working directory up to date.
    up = !git pull --rebase --prune $@ && git submodule update --init --recursive

 Clean merged branch.
    deletedone = !git branch --merged | grep -v \"\\*\" | grep -v master | xargs -n 1 git branch -d
    dd = !git deletedone

 Show aliases.
    aliases = !git config --get-regexp 'alias.*' | colrm 1 6 | sed 's/[ ]/ = /'
