---
sidebar: auto
---
# Installation ZSH: 

Zsh est une alternative à bash. Ce dernier présente de nombreux avantages :

    Autocomplétion des commandes
    Correction des commandes saisies
    Historique des commandes
    Historique partagé entre les différentes consoles ouvertes
    Support avancé de Git

    sur les dernières versions de macOS zsh est le shell par défaut

Installation

Pour cela, il faut ouvrir le terminal et installer Homebrew si ce n’est pas déjà fait. Homebrew est un gestionnaire de paquets sous macOS tout comme apt sous Linux.

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

ou

echo | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

Il faudra taper Entrée, ensuite notre mot de passe utilisateur afin qu’il l’installe. Il faudra attendre un moment surtout si on n’a pas les CLT (Command Line Tools) pour Xcode d’installé.

Plus de détails sur l’installation de Homebrew sur ce lien https://docs.brew.sh/

    Après avoir installé Homebrew, nous pouvons vérifier cela en faisant un brew -v qui nous retournera la version installée.

    brew -v

install-zsh-macos-2

    On va maintenant avec la commande brew installer zsh et zsh-completions

brew install zsh zsh-completions

Maintenant que zsh est installé nous allons passer à Oh My Zsh, un framework qui permet de personnaliser son Shell grâce aux thèmes et aux plugins.

    sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

Voilà, on a maintenant tout ce qu’il nous faut. Il suffit ensuite de changer l’interpréteur par défaut et mettre zsh.

chsh -s /bin/zsh

Relancez le terminal et zsh est opérationnel !

On peut aussi rajouter des plugins et modifier le thème par défaut (robbyrussel). Plus de détails sur ce lien https://github.com/robbyrussell/oh-my-zsh/wiki
install-zsh-macos
Intégration de zsh sur le terminal de VS Code

J’utilise VS Code comme IDE et j’ai souvent besoin d’un terminal sans pour autant changer de bureau. Avec VS Code on a la possibilité d’avoir un terminal intégré, sauf que par défaut il est sur du bash. Voici comment le mettre sur zsh.

Il faut se rendre sur Code > Preferences > Settings > Open settings.json et mettre zsh au lieu de bash.
vscode-zsh-terminal-integration

Après avoir relancé VS Code on voit bien que le terminal est sur du zsh avec la prise en compte de git sur ce projet.
vscode-zsh-terminal-integration-1

# Add agnoster theme:
![Image for post](https://miro.medium.com/max/60/1*a56Zo8tlEaleWieobAtY9g.png?q=20)

![Image for post](https://miro.medium.com/max/1348/1*a56Zo8tlEaleWieobAtY9g.png)

Preview

Prerequisites
=============

-   **Mac Terminal** (preinstalled)
-   **ZSH** (preinstalled)
-   **Oh-My-Zsh\
    **Refer to the [full installation guide](https://github.com/robbyrussell/oh-my-zsh) for more details.

Install Oh-My-ZSH (cf dessus)

-   **Ubuntu Mono Derivative Powerline Font\
    **[Download Fonts](https://github.com/powerline/fonts/archive/master.zip)

Installation
============

Now that we have identified our pre-requisites, let's get started:

1.  Download the font archive, and unzip it. Go to *fonts-master/UbuntuMono/* and install each of the four TTFs: simply double-click and let Font Book install them for you.
2.  Open Terminal, then navigate to *Terminal Preferences > Profiles > Font* and click the Change button.
3.  Select *Ubuntu Mono derivative Powerline* and set the font size to your liking.
4.  Close preferences, and quit Terminal.
5.  If you haven't already done so, install Oh-My-ZSH.
6.  Now let's configure your ZSH theme settings:

Edit the ZSH Configuration:
````
cd ~
nano .zshrc
````

8\. There we will update our theme. You can find "ZSH_THEME=" toward the top of the file:

Set the ZSH Theme
````
ZSH_THEME="agnoster"
````
9.  Save you changes (CTRL-X if you're using Nano, continue editing forever if you're using Vi or Vim).

10\. Quit and restart Terminal.