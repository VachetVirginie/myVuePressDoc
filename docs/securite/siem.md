---
sidebar: auto
---
# SIEM

Security Information and Event Management


## Qu’est-ce que le SIEM?

- D'un point de vue sécurité des ordinateurs, les software
    de type SIEM ont pour but de combiner la gestion des
    informations de sécurité, et la gestion des
    événements de sécurité.
- Ils fournissent une analyse temps réel de la sécurité et
    gère les alertes générées par le réseau, le matériel et les
    applications.


## Les trois axes du SIEM

- En plus de nous informer des violations de sécurité et des
    situations en temps réel de notre infrastructure, les
    solutions SIEM agissent généralement sur trois tâches
    principales :
       - Agrégation des doonnées
       - Corrélation des données
       - Collection des données


## Agrégation et collection des données

- Une solution SIEM doit être capable de collecter et
    d'agréger les données de plusieurs réseaux et de
    plusieurs équipements au sein d'un même réseau.
- Attention, il n'est pas question uniquement des serveurs
    mais également des firewalls, des IPS (Intrusion
    Prevention Systems), des logiciels antivirus, des logs de
    Windows et de Linux, des routeurs et des **switches...**


## Horodatage des données

- Il est vital d'avoir un horodatage correct des logs.
- Un problème d'horodatage peut causer une confusion
    massive si le même événement est enregistré à deux
    heures différentes sur deux équipements différents.
- Pensez donc à mettre en place une synchronisation du
    temps grâce au protocole NTP.


## Corrélation des données

- Le processus de corrélation des données a pour rôle de
    remarquer les comportements malveillants et les événements
    du réseau en analysant l'ensemble des données agrégées.
- Cela se fait en créant un profil type de l'infrastructure et de
    la façon dont les différents événements apparaissent sur le
    réseau lorsque tout se déroule correctement et de façon
    propre.
- La solution SIEM fait ensuite la comparaison entre ce qu'elle
    obtient lors de l'analyse temps réel du réseau et ce profil type.
    Elle arrive ainsi à déterminer les événements qui n'auraient pas
    dû avoir lieu et se concentre sur eux.


