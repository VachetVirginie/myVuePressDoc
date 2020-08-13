---
sidebar: auto
---
# depannage

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


## Pedro

### Reinstaller quand le container php ne marche plus:

````
docker-compose stop php
docker-compose rm php
rm -rf api/vendor
docker-compose up -d --build php

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


### Git

 ## Choisir l'editeur 
 
 #### Vim par default
 
 ````
git config --global core.editor vim
````
 #### Nano par default
 
 ````
git config --global core.editor nano
 ````