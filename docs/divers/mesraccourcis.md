---
sidebar: auto
---
# MesRaccourcis

## Run PhpStorm from terminal as normal user or root
-------------------------------------------------

It's sometimes uneasy to open file explorer and find the PhpStorm executable to run it. For most of the linux system we prefer to run any application directly from terminal as root or as normal user. But unfortunately PhpStorm doesn't provide any installer. So we have to create our own command, create own launcher for our Ubuntu and any other Linux OS.

To run PhpStorm from command line, you need to create a symbolic link of the original executable as a binary. To do that, run the following command to create PhpStorm symbolic link to /usr/bin/phpstorm.

```
sudo ln -s /opt/PhpStorm-121.390/bin/phpstorm.sh /usr/bin/phpstorm
```

In the above code **/opt/PhpStorm-121.390/bin/phpstorm.sh** is your PhpStorm's phpstorm.sh executable file location and **phpstorm** word from `usr/bin/phpstorm` this is the assigned command to run PHPStorm IDE from your terminal.

In the above command, change your directory as per your downloaded version. And /usr/bin/phpstorm you can make it however you want. If you want to run PhpStorm as another name like yourname. You can create that symbolic link to /usr/bin/yourname.

OK, now you have the binary located in bin directory. You can now open PhpStorm from terminal with the following command.

```
$ phpstorm

```
## Creer des aliases Oh My Zsh
-------------------------------------------------


```
alias zshconfig="mate ~/.zshrc"
alias ohmyzsh="mate ~/.oh-my-zsh"
alias n="nano"
alias m="mkdir"
```

## Voir quelles cmd sont les plus utilisées
-------------------------------------------------


```
history |
 awk '{CMD[$2]++;count++;}END { for (a in CMD)print CMD[a] " " CMD[a]/count*100 "% " a;}' | \
 grep -v "./" |
 column -c3 -s " " -t |
 sort -nr |
 nl |
 head -n10
 ```

 ## Selectionner meme elements phpStorm (ctrl + f2 de vscode)

 ````
 selectionner un des elements
 ctrl + d
 ````