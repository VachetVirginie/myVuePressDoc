---
sidebar: auto
---
# depannage

## Erreur GIT après mise à jour de Mac OS High Sierra (xcrun: error: invalid active developer path)

````
xcode-select --install
````

## Rtsp
Afin de pouvoir utiliser la commande make rtsp-start vous devez avoir ffmpeg sur votre machine. Le cas échéant brew install ffmpeg sera votre ami.

## Pedro trouver erreur  500 sur maquette
````
cd Public
cd Pedro
docker exec -it pedro_php_1 sh
cd var
ls
````
aller dans repertoire où se situe le probleme 
````
ls
si pas de rep
ls -l 
````
si vide

````
cd ..
cd log/
ls
````
Il ne reste plus qu'a checker les logs ;)

## Desactiver l'enregistrement video

Ajouter 
````
ENABLE_RECORDING=0
````
dans api/.env.local

## Installer sur le front
````
 dc exec frontend yarn add 
````

## Delete .DS_STORE files in current folder and all subfolders from command line

````
find . -name ".DS_Store" -print -delete  
````

##  Ubuntu

Que faire lorsque votre Linux démarre en mode BusyBox ?
===========================================================================================================================================================

![](https://www.extrem-network.com/wp-content/uploads/2018/10/Linux-logo-without-version-number-banner-sized.jpg)

Il peut arriver, suite à une mise à jour du noyau Unix ou d'une mauvaise manipulation, que votre distribution Linux redémarre en mode BusyBox avec un écran semblable à cela :

BusyBox v1.18.5 (Ubuntu 1:1.18.5-1ubuntu4) built-in shell (ash)
Enter 'help' for a list of built-in commands.

(initramfs)

Il s'agit d'un logiciel qui fournit plusieurs outils Unix à la manière d'un couteau suisse en ligne de commande. L'ensemble des commandes est [disponible ici](https://www.busybox.net/downloads/BusyBox.html#commands) ou directement en tapant ***help***. Un des cas fréquemment rencontré est un problème dans la structure du système de fichier. Pour vérifier cela vous pouvez commencer par entrer la commande ***exit*** afin d'afficher des informations à l'écran :

BusyBox v1.18.5 (Ubuntu 1:1.18.5-1ubuntu4) built-in shell (ash)
Enter 'help' for a list of built-in commands.

(initramfs) exit

/dev/sda1: UNEXPECTED INCONSISTENCY; RUN fsck MANUALLY.
(i.e., without -a or -p options)
fsck exited with status code 4.
The root filesystem on /dev/sda1 requires a manual fsck.

La commande indique que la partition /dev/sda1 (dans notre example) nécessite de lancer la commande ***fsck*** qui se chargera de vérifier et réparer les fichiers systèmes :

BusyBox v1.18.5 (Ubuntu 1:1.18.5-1ubuntu4) built-in shell (ash)
Enter 'help' for a list of built-in commands.

(initramfs) fsck /dev/sda1

fsck from util-linux 2.27.1
e2fsck 1.42.13 (17-May-2015)
/dev/sda1 contains a file system with errors, check forced.

Répondez (y) à toutes les questions. Une fois la commande terminée, redémarrer le système :

BusyBox v1.18.5 (Ubuntu 1:1.18.5-1ubuntu4) built-in shell (ash)
Enter 'help' for a list of built-in commands.

(initramfs) reboot

La distribution Linux devrait alors redémarrer correctement.

## Git

 ### Choisir l'editeur 
 
 #### Vim par default
 
 ````
git config --global core.editor vim
````
 #### Nano par default
 
 ````
git config --global core.editor nano
 ````
## Boo

### Mode prod sur Boo
1. creer un fichier .env.local dans /api
1. dupliquer le .env
1. remplacer env par prod
⚠️ pas de fixtures possible en prod (normol)

## Pedro 

### Pipotron Five:
```
make back-ssh
bin/console ngtv:five-sessions:pipotron 3117 13 10 0
```
### Prod sur Pedro
```
dc -f docker-compose.yml up -d --build
```
Checker sur quelle version on est:
```
make back-ssh
echo ${APP_ENV}
```
Pour revenir en dev:
```
dc up -d --build
```

### Five

Pour tests videos:

- verifier les matchs timecode
- verifier le sport du terrain 
- le status

### Api

En cas d'erreur 500 sur l'api:

- se connecter en ssh au container api
- aller dans var/log
- ```` tail -f dev.log ````
- checker le log pour trouver d'où vient l erreur

### Relancer crons
- dans Pedro:
````
make back-ssh
````
````
 crond
```` 

### Relancer export videos

- Ds Pedro:
````
make back-ssh
````
````
bin/console ngtv:sessions:export
````

### Reinstaller quand le container php ne marche plus:

````
docker-compose stop php
docker-compose rm php
rm -rf api/vendor
docker-compose up -d --build php

````
### Si videos en export_deleted mais pas remontees sur site:
- Dans Pedro
- 
````
make back-ssh
````
-
````
cd var/postOffice
````

- ls pour verifier si des fichiers sont presents

- si c'est le cas:
````
bin/console ngtv:post-ftp
````

### Quand on réinstall le projet depuis git

Penser à rajouter les .env d'api et frontend sinon les cmd symfony ne fonctionnent plus.


### Docker-compose.override.yaml

Permet de modifier mes ports sans impacter ceux du projet.

.. _docker_compose_override_yml_how_does_it_work:

How does docker-compose.override.yml work?
==========================================

When you run ``docker-compose up``, it searches for a file named ``docker-compose.yml`` and reads
all configured services, networks, volumes etc to create your Docker stack. If you also
additionally have a file named ``docker-compose.override.yml`` this will be read as well and used
as an override file to complement. It works in the following order:

1. All definitions from ``docker-compose.yml`` will be used
2. All definitions that are also defined in ``docker-compose.override.yml`` will automatically
   overwrite the settings from ``docker-compose.yml``
3. All definitions only available in ``docker-compose.override.yml`` will be added additionally.

For starting up your Docker Compose stack there are no additional steps or command line arguments
required. If both files exist, they will be read automatically.

## Docker 

### ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?

If it's at a non-standard location, specify the URL with the DOCKER_HOST environment variable.
make: *** [Makefile:40: start] Error 1

Solution:
````
sudo chmod 666 /var/run/docker.sock
````
## NPM

### Installation
  Pour installer node et npm, il suffit de taper une des commande suivante.
    
  
   Pour les systèmes Linux Debian et Ubuntu
   ````
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    
    sudo apt install -y nodejs
   ````


## Yarn

### Installation

To install the Yarn package manager, run:

````
     curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
     echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
     sudo apt-get update && sudo apt-get install yarn
````    