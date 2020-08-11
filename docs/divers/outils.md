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

