---
sidebar: auto
---
# outils


## Creer une clef bootable avec Etcher

Etcher est le logiciel de référence sur GNU/Linux pour flasher une image ISO sur une clé USB. Simple et efficace  !

    Installez Etcher à partir du Terminal :

````
echo "deb https://deb.etcher.io stable etcher" | sudo tee /etc/apt/sources.list.d/balena-etcher.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 379CE192D401AB61
sudo apt update
sudo apt install etcher-electron

````

### How To Install The zsh autosuggestions Plugin in Oh My Zsh In MacOS

zsh-autosuggestions suggests commands as you type based on history and completions.

## To install :
1.Clone this repository somewhere on your machine. This guide will assume ~/.zsh/zsh-autosuggestions:
git clone https://github.com/zsh-users/zsh-auto... ~/.zsh/zsh-autosuggestions

2.Add the following to your .zshrc:
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

3.Start a new terminal session.


### Ne plus avoir à rentrer ses identifiants git : 

1.
```` 
 sudo nano ~/.gitconfig  
```` 

2.
```` 
[user]
        email = mymail@yop.com
        name = myName
        password = myPassword
[credential]
        helper = cache
````

