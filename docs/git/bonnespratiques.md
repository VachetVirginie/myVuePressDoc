---
sidebar: auto
---
# Bonnes pratiques

Nommer les branches
-------------------

En dehors des branches **develop** et **master**, comment nommer nos autres branches ?

Rien de bien sorcier, nous allons simplement indiquer le type de la branche suivi du nom de celle-ci, optionnellement nous pouvons ajouter le numéro du ticket. Le tout doit être séparé par le caractère slash "/" :

<type>/<name>/<issue_ID>

|

1

 |

<type>/<name>/<issue_ID>

 |

### Les types de branches

Le type d'une branche doit être clair afin de comprendre le but de celle-ci. Voici une liste non exhaustive des types de branches :

-   **feature**: Ajout d'une nouvelle fonctionnalité;
-   **bugfix**: Correction d'un bug;
-   **hotfix**: Correction d'un bug critique;
-   **chore**: Nettoyage du code;
-   **experiment**: Expérimentation de fonctionnalités.

### Le nom de la branche

Le nom de la branche décrit succinctement le but de celle-ci. Certaines règles doivent être respectées :

-   Le nom doit faire moins de 50 caractères;
-   Le nom doit respecter la convention kebab-case (les mots doivent être en minuscule et liés par des tirets "-");

### Le numéro de ticket

Pour le suivi de vos tickets, que ce soit sur [Github](https://github.com/), [Gitlab](https://about.gitlab.com/) ou tout autre outil comme [JIRA](https://www.atlassian.com/fr/software/jira) par exemple, il peut être utile d'ajouter le numéro de ceux-ci dans le nom de vos branches. Il est ainsi possible par exemple de fermer automatiquement vos tickets lorsque la branche sera "merger".

### Quelques exemples

Voyons quelques exemples de noms de branches pour mieux comprendre :

feature/add-users-controller hotfix/profile-page-error/621 experiment/try-api-key chore/remove-deprecated-method/924

|

1

2

3

4

5

6

7

 |

feature/add-users-controller

hotfix/profile-page-error/621

experiment/try-api-key

chore/remove-deprecated-method/924

 |

Nommer les messages de commits
------------------------------

Le message d'un commit doit être clair et concis, il doit indiquer ce qui a été modifié et la raison de cette modification. La convention de nommage la plus utilisée est la "[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)".

L'avantage de respecter cette convention, outre le fait de rendre plus compréhensibles vos commits, est de permettre de respecter la sémantique de versions ([SemVer](https://semver.org/)) et d'automatiser certaines tâches (comme la génération d'un fichier Changelog par exemple).

### Format des messages

Le format du message est le suivant :

<type>(<scope>): <subject> <BLANK LINE> <body> <BLANK LINE> <footer>

|

1

2

3

4

5

 |

<type>(<scope>): <subject>

<BLANK LINE>

<body>

<BLANK LINE>

<footer>

 |

Voyons plus en détail chacune des parties du message. 

#### Le type

Le type du commit décrit l'origine du changement. Il peut prendre différentes valeurs :

-   **feat**: Ajout d'une nouvelle fonctionnalité;
-   **fix**: Correction d'un bug;
-   **build**: Changement lié au système de build ou qui concerne les dépendances (npm, grunt, gulp, webpack, etc.).
-   **ci**: Changement concernant le système d'intégration et de déploiement continu (Jenkins, Travis, Ansible, gitlabCI, etc.)
-   **docs**: Ajout ou modification de documentation (README, JSdoc, etc.);
-   **perf**: Amélioration des performances;
-   **refactor**: Modification n'ajoutant pas de fonctionnalités ni de correction de bug (renommage d'une variable, suppression de code redondant, simplification du code, etc.);
-   **style**: Changement lié au style du code (indentation, point virgule, etc.);
-   **test**: Ajout ou modification de tests;
-   **revert**: Annulation d'un précédent commit;
-   **chore**: Toute autre modification (mise à jour de version par exemple).

Pour chacun des types, vous pouvez également utiliser un système d'emoji comme [gitmoji](https://gitmoji.carloscuesta.me/).

#### Le scope

Cet élément facultatif indique simplement le contexte du commit. Il s'agit des composants de notre projet, voici une liste non exhaustive :

-   controller;
-   route;
-   middleware;
-   view;
-   config;
-   service;
-   etc.

#### Le sujet

Le sujet décrit succinctement la modification. Certaines règles doivent être respectées :

-   Le sujet doit faire moins de 50 caractères;
-   Les verbes doivent être à l'impératif (add, update, change, remove, etc.);
-   La première lettre ne doit pas être en majuscule;
-   Le sujet ne doit pas se terminer par un point.

#### Le corps du message

Le corps du message, qui est optionnel, doit contenir les raisons de la modification ou tout simplement donner plus détails sur le commit. Il peut également indiquer les changements importants (breaking changes). Celui-ci doit faire moins de 100 caractères.

#### Le footer

Le footer est également facultatif, celui-ci est surtout utilisé pour faire référence aux tickets (issue) de Github ou Gitlab par exemple que le commit règle ou aux changements importants (breaking changes). Celui-ci doit faire moins de 100 caractères.

#### Quelques exemples

Nous allons voir quelques exemples pour mieux comprendre. Les messages des commits qui vont suivre seront en anglais, mais le principe est exactement le même si vous écrivez vos messages de commit en français.

##### Commit simple (sans corps ni footer)

feat(controller): add post's controller

|

1

 |

feat(controller): add post's controller

 |

docs(route): add swagger documentation

|

1

 |

docs(route): add swagger documentation

 |

##### commit avec un corps

fix(controller): use the correct HTTP code Use the HTTP error 403 instead of 401 if the user is authenticated.

|

1

2

3

 |

fix(controller): use the correct HTTP code

Use the HTTP error 403 instead of 401 if the user is authenticated.

 |

##### commit complet (corps et footer)

refactor(repository): remove deprecated method BREAKING CHANGE: findById and findByPrimary methods have been removed. Closes #78

|

1

2

3

4

5

 |

refactor(repository): remove deprecated method

BREAKING CHANGE: findById and findByPrimary methods have been removed.

Closes #78

 |

### Comment respecter la convention ?

Afin de nous assurer du respect de la convention, nous allons utiliser les hooks de Git. Pour faire simple, les hooks permettent d'effectuer certaines actions lorsqu'un événement spécifique se produit (par exemple un commit, un pull, un merge, etc.). Le souci des hooks est leurs partages avec l'ensemble de l'équipe. Pour faciliter l'ajout et le partage de ceux-ci, nous allons utiliser la librairie [husky](https://www.npmjs.com/package/husky) :

npm install husky --save-dev

|

1

 |

npm install husky --save-dev

 |

Il y a énormément de choses intéressantes à faire avec cette librairie, on en reparlera d'ailleurs dans un prochain article.

Pour notre cas ce qui nous intéresse c'est de s'assurer du respect de la convention, nous allons pour cela installer la librairie [commitlint](https://commitlint.js.org/#/reference-cli) et la configuration de notre convention:

npm install @commitlint/cli @commitlint/config-conventional --save-dev

|

1

 |

npm install @commitlint/cli @commitlint/config-conventional --save-dev

 |

Créons ensuite un fichier `commitlint.config.js` pour indiquer que nous souhaitons utiliser la convention "[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)" :

module.exports = { extends: ['@commitlint/config-conventional'] };

|

1

2

3

 |

module.exports  =  {

  extends:  ['@commitlint/config-conventional']

};

 |

Ajoutons maintenant notre hook Git via [husky](https://www.npmjs.com/package/husky) directement dans notre fichier `package.json` :

{ /* ...*/ "husky": { "hooks": { "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" } } }

|

1

2

3

4

5

6

7

8

 |

{

  /* ...*/

  "husky":  {

    "hooks":  {

      "commit-msg":  "commitlint -E HUSKY_GIT_PARAMS"

    }

  }

}

 |

Testons pour s'assurer que cela fonctionne :

git commit -m "this commit will fail" husky > commit-msg (node v13.12.0) ⧗ input: this commit will fail ✖ subject may not be empty [subject-empty] ✖ type may not be empty [type-empty] ✖ found 2 problems, 0 warnings ⓘ Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint husky > commit-msg hook failed (add --no-verify to bypass)

|

1

2

3

4

5

6

7

8

9

10

 |

git commit -m "this commit will fail"

husky > commit-msg (node v13.12.0)

⧗   input: this commit will fail

✖   subject may not be empty [subject-empty]

✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings

ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky > commit-msg hook failed (add --no-verify to bypass)

 |

Et voilà ! Impossible de commit si le message ne respecte pas la convention.

### Automatisation

Respecter cette convention de commit permet également d'automatiser certaines tâches comme la génération d'un fichier changelog ou encore de mettre à jour le numéro de version en respectant la sémantique [SemVer](https://semver.org/).

Pour cela rien de plus simple, il suffit d'installer la librairie [`standard-version` :](https://www.npmjs.com/package/standard-version)

npm install standard-version --save-dev

|

1

 |

npm install standard-version --save-dev

 |

Et d'ajouter une commande dans le fichier `package.json` :

{ /*...*/, "scripts": { "release": "standard-version" } }

|

1

2

3

4

5

6

 |

{

  /*...*/,

  "scripts":  {

    "release":  "standard-version"

  }

}

 |

Il ne reste plus qu'à lancer cette commande via `npm run release`.

npm run release > standard-version √ bumping version in package.json from 1.0.0 to 1.0.1 √ bumping version in package-lock.json from 1.0.0 to 1.0.1 √ created CHANGELOG.md √ outputting changes to CHANGELOG.md √ committing package-lock.json and package.json and CHANGELOG.md √ tagging release v1.0.1 i Run `git push --follow-tags origin master && npm publish` to publish

|

1

2

3

4

5

6

7

8

9

 |

npm run release

> standard-version

√ bumping version in package.json from 1.0.0 to 1.0.1

√ bumping version in package-lock.json from 1.0.0 to 1.0.1

√ created CHANGELOG.md

√ outputting changes to CHANGELOG.md

√ committing package-lock.json and package.json and CHANGELOG.md

√ tagging release v1.0.1

i Run `git push --follow-tags origin master && npm publish` to publish

 |

Et c'est tout ! Cette commande effectue les tâches suivantes :

-   Incrémentation du numéro de version dans le fichier `package.json` et `package-lock.json`;
-   Création du fichier `CHANGELOG.md`;
-   Commit des fichiers `package.json`, `package-lock.json` et `CHANGELOG.md;`
-   Création du tag de version.

Nous pouvons maintenant push notre projet sur son dépôt git ou sur [npm](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

Vous pouvez également utiliser la librairie [`semantic-release`](https://github.com/semantic-release/semantic-release) si vous souhaitez intégrer cette automatisation à vos outils d'intégration continue.
