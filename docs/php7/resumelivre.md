---
sidebar: auto
---
# Php 7 livre resume


![Php7](https://www.genious-interactive.com/wp-content/uploads/2015/06/php7-1.jpg)


## Déclarations du type de retour 

PHP 7 ajoute un support pour les [déclarations du type de retour](https://www.php.net/manual/fr/functions.returning-values.php#functions.returning-values.type-declaration). Similaires aux [déclarations du type d'argument](https://www.php.net/manual/fr/functions.arguments.php#functions.arguments.type-declaration), les déclarations du type de retour spécifient le type de la valeur qui sera retournée par la fonction. Les mêmes [types](https://www.php.net/manual/fr/functions.arguments.php#functions.arguments.type-declaration.types) qui sont disponibles pour les déclarations du type de retour sont disponibles pour les déclarations du type d'argument.

`<?php

function sommeTableaux(array ...$tableaux): array\
{\
    return array_map(function(array $tableaux): int {\
        return array_sum($tableaux);\
    }, $tableaux);\
}

print_r(sommeTableaux([1,2,3], [4,5,6], [7,8,9]));`


## L'opérateur Null coalescent

L'opérateur Null coalescent (`??`) a été ajouté comme un sucre syntaxique pour les cas de besoin le plus commun d'utiliser une troisième conjonction avec la fonction [isset()](https://www.php.net/manual/fr/function.isset.php). Il retourne le premier opérande s'il existe et n'a pas une valeur **`NULL`**; et retourne le second opérande sinon.

`<?php\
// Récupére la valeur de $_GET['utilisateur'] retourne 'aucun'\
// s'il n'existe pas.\
$identifiant = $_GET['utilisateur'] ?? 'aucun';\
// Ceci est équivalent à :\
$identifiant = isset($_GET['utilisateur']) ? $_GET['utilisateur'] : 'aucun';

// L'opérateur permet de faire du chaînage : Ceci va retourner la première\
// valeur définie respectivement dans $_GET['utilisateur'], $_POST['utilisateur']\
// et 'aucun'.\
$identifiant = $_GET['utilisateur'] ?? $_POST['utilisateur'] ?? 'aucun';\
?>`