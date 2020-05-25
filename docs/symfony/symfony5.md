---
sidebar: auto
---
# symfony5.md

## Symfony 5

### Initialiser le projet

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ symfony new projectName --version=5.0
$ cd projectName
```

### Lancer un serveur web local
```sh
$ symfony server:start -d
```
Le serveur a démarré sur le premier port disponible (à partir de 8000).
Pour gagner du temps, vous pouvez ouvrir le site web dans un navigateur
à partir de la ligne de commande :
```sh
$ symfony open:local
```
### Ajouter une favicon
Pour éviter que nos logs ne se remplissent de messages d’erreur 404 à
cause d’une favicon manquante, ajoutons-en une maintenant :
```sh
$ php -r "copy('https://symfony.com/favicon.ico', 'public/favicon.ico');"
$ git add public/
$ git commit -m'Add a favicon'
```
