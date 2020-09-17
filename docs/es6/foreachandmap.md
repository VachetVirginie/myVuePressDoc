---
sidebar: auto
---

# Foreach et map

# Javascript forEach et map : les différences fondamentales
=========================================================

Vous voulez en savoir plus sur les boucles. Vous êtes au bon endroit. Nous allons comparer en javascript, le forEach et la fonction map de [ES6](https://fr.wikipedia.org/wiki/ECMAScript). Pour ma part, je sais déjà ce que je préfère utiliser, il est temps de justifier ou non mon choix.

## Map dans le détail
------------------

La méthode map est apparue dans EcmaScript 6 (ES6). Elle est largement utilisée, notamment dans des frameworks comme ReactJs. Elle va return un nouveau Array tout en exécutant une fonction passée en paramètre. Ceci étant très dur à comprendre de premier abord, je vais illustrer par des exemples :

```
const pokemons = ["Pikachu","Bulbizarre","Salamèche"];

const pokemonsUpdated = pokemons.map((value) => {
    return value + " Updated";
})

//pokemons = ["Pikachu","Bulbizarre","Salamèche"]
//pokemonsUpdated = ["Pikachu Updated","Bulbizarre Updated","Salamèche Updated"]
```

On voit par cet exemple, que map a retourné un nouveau array est la stocker dans pokemonsUpdated. Il s'agit bien de deux Arrays distincs.

## forEach dans le détail
----------------------

La méthode forEach existe depuis toujours, du moins depuis que j'ai commencé le développement. Elle va appellé en argument une fonction qui ne va rien retourner. Il n'y a donc aucun nouvel array de créer. Il va faire muter l'array sur lequel la méthode forEach est appellée.

```
let pokemons = ["Pikachu","Bulbizarre","Salamèche"];

pokemons.forEach((value,index) => {
    return pokemons[index] = value + " Updated";
})

//pokemons = ["Pikachu Updated","Bulbizarre Updated","Salamèche Updated"]
//pokemonsUpdated n'existe pas
```

A noter que si l'on veut dupliquer le tableau nous allons devoir utiliser la déstructuration de tableau en ES6. Si vous voulez en savoir plus je vous recommande mon article sur le sujet. [Cet article traite du forEach beaucoup plus en détails.](http://pierreterrat.com/javascript-foreach,-comment-les-utiliser-de-maniere-efficace?/)

## Test de performance
-------------------

Cela va dépendre du navigateur. En règle générale, en javascript, **forEach** est beaucoup plus lent que **map** (environ 60% plus rapide). Si vous avez des gros volumes de données, il faut donc préférer utiliser map plutôt que **forEach**. Après je vous l'avoue, cela va être plutôt rare. A noter que **for** est aussi beaucoup plus rapide que **forEach**.

## Résultat du match
-----------------

Vous l'aurez compris, je préfère entièrement map de ES6.

Si je résume les différences clées entre les 2 façons de faire :

-   map est plus performant que forEach
-   map permet de gérer l'immutabilité car elle retourne un nouvel array
-   Vous êtes obligé de gérer avec la déstructuration d'array en ES6 pour gérer l'immutabilité du forEach

Si vous avez le choix, n'hésitez plus et utilisez map pour parcourir vos arrays et les modifier.

From : http://pierreterrat.com/javascript-map-foreach/