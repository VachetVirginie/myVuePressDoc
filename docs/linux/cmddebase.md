---
sidebar: auto
---
# CMDdeBase

### Suppression d'un fichier

Ouvrir un [terminal](https://doc.ubuntu-fr.org/terminal "terminal") puis saisir la [commande](https://doc.ubuntu-fr.org/commande_shell "commande_shell"):

-   **Sans** les droits d'administration :

    rm /chemin/fichier1 /chemin/fichier2 /chemin/fichier3

-   **Avec** les droits d'administration :

    sudo rm /chemin/fichier1 /chemin/fichier2 /chemin/fichier3

    puis saisissez votre mot de passe.

### Suppression d'un dossier non vide

-   **Sans** les droits d'administration :

    rm -fr /chemin/repertoire

-   **Avec** les droits d'administration : (ATTENTION DANGER : Ne pas supprimer de dossier système)

    sudo rm -fr /chemin/repertoire

### Suppression d'un dossier

La commande **rm** par défaut ne supprime pas de dossier. Pour supprimer un dossier et son contenu, on utilise l'option **-r**

-   **Sans** les droits d'administration :

    rm -r /chemin/dossier1 /chemin/dossier2 /chemin/dossier3

-   **Avec** les droits d'administration :

    sudo rm -r /chemin/dossier1 /chemin/dossier2 /chemin/dossier3

    puis saisissez votre mot de passe.

Pour supprimer un dossier vide, on utilise plutôt l'option **-d**