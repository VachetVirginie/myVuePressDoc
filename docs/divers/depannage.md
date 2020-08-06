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

Reinstaller quand ça ne marche plus:

````
docker-compose stop php
docker-compose rm php
rm -rf api/vendor
docker-compose up -d --build php

````