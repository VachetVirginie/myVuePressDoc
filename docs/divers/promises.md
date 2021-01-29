---
sidebar: auto
---
# Promises

Promesses dans Node.js
----------------------

### introduction

JavaScript est *monothread* , ce qui signifie que tout, y compris les événements, s'exécute sur le même thread. Si le thread n'est pas libre, l'exécution du code est retardée jusqu'à ce qu'elle le soit. Cela peut être un goulot d'étranglement pour notre application car cela peut vraiment causer de sérieux problèmes de performances.

Il existe différentes manières de surmonter cette limitation. Dans cet article, nous allons explorer la manière moderne de gérer les tâches asynchrones dans JavaScript - `Promise`s.

### Callbacks et Callback Hell

Si vous êtes un développeur JavaScript, vous avez probablement entendu parler de *rappels* , s'ils ne sont pas utilisés :

```
function hello() {
    console.log('Hello World!');
}

setTimeout(hello, 5000);

```

Ce code exécute une fonction `setTimeout()`, qui attend le temps défini (en millisecondes), qui lui sont transmis en tant que second argument `5000`. Une fois le temps écoulé, ce n'est qu'alors qu'il exécute la fonction `hello`, qui lui est transmise comme premier paramètre.

La fonction est un exemple de *fonction d'ordre supérieur* et la fonction qui lui est transmise est appelée un *rappel* - une fonction qui doit être exécutée après qu'une autre fonction a fini de s'exécuter.

Disons que nous avons envoyé une demande à une API pour renvoyer les photos les plus appréciées de notre compte. Nous devrons probablement attendre la réponse car l'API / le service peut effectuer des calculs avant de renvoyer la réponse.

Cela peut potentiellement prendre beaucoup de temps et nous ne voulons pas geler le thread pendant que nous attendons la réponse. Au lieu de cela, nous allons créer un rappel qui sera notifié lorsque la réponse arrive.

Jusque-là, le reste du code est en cours d'exécution, comme la présentation de messages et de notifications.

Si vous avez déjà travaillé avec des rappels, il est possible que vous ayez vécu l' [enfer des rappels](https://dvimo6qwfo3atr5fucw47pl4pm--stackabuse-com.translate.goog/avoiding-callback-hell-in-node-js/) :

```
doSomething(function(x) {
    console.log(x);
    doSomethingMore(x, function(y) {
        console.log(y);
        doRestOfTheThings(y, function(z) {
            console.log(z);
        });
    });
});

```

Imaginez un cas où nous demandons au serveur d'obtenir plusieurs ressources - une personne, ses amis et les messages de ses amis, les commentaires pour les messages de chaque ami, les réponses, etc.

La gestion de ces dépendances imbriquées peut rapidement devenir incontrôlable.

Nous pouvons éviter les enfers de rappel et gérer les appels asynchrones en utilisant `Promise`s.

### Créer une promesse

`Promise`s, comme son nom l'indique, est la fonction "donnant son mot" qu'une valeur sera renvoyée ultérieurement. C'est un proxy pour une valeur qui pourrait ne pas être retournée, si la fonction dont nous attendons une réponse ne livre pas.

Au lieu de renvoyer des valeurs concrètes, ces fonctions asynchrones renvoient un `Promise`objet qui, à un moment donné, sera rempli ou non.

Le plus souvent, lors du codage, nous consommerons des `Promise`s plutôt que de les créer. Ce sont les bibliothèques / frameworks qui créent des `Promise`s pour les clients à consommer.

Pourtant, il est bon de comprendre ce qui se passe derrière la création d'un `Promise`:

```
let promise = new Promise(function(resolve, reject) {
    // Some imaginary 2000 ms timeout simulating a db call
    setTimeout(()=> {
        if (/* if promise can be fulfilled */) {
            resolve({msg: 'It works', data: 'some data'});
        } else {
            // If promise can not be fulfilled due to some errors like network failure
            reject(new Error({msg: 'It does not work'}));
        }
    }, 2000);
});

```

Le constructeur de promesse reçoit un argument - un rappel. Le rappel peut être une fonction normale ou une fonction fléchée. Le rappel prend deux paramètres - `resolve`et `reject`. Les deux sont des références de fonction. Le rappel est également appelé exécuteur.

L'exécuteur s'exécute immédiatement lorsqu'une promesse est créée. La promesse est résolue en appelant `resolve()`si la promesse est remplie et rejetée en appelant `reject()`si elle ne peut pas être remplie.

Les deux `resolve()`et `reject()`prend un argument - `boolean`, `string`, `number`, `array`, ou `object`.

### Tenir une promesse

Par le biais d'une API, disons que nous avons demandé des données au serveur et que nous ne savons pas quand elles seront renvoyées - si elles le seront. Ceci est un exemple parfait de quand nous utiliserions un `Promise`pour nous aider.

En supposant que la méthode du serveur qui gère notre appel retourne a `Promise`, nous pouvons le consommer:

```
promise.then((result) => {
    console.log("Success", result);
}).catch((error) => {
    console.log("Error", error);
})

```

Comme nous pouvons le voir, nous avons enchaîné deux méthodes - `then()`et `catch()`. Ce ne sont là que quelques-unes des diverses méthodes fournies par l' `Promise`objet.

`then()`est exécuté lorsque les choses se passent bien, c'est-à-dire que la promesse est remplie par la `resolve()`méthode. Et si la promesse a été rejetée, la `catch()`méthode sera appelée avec l'erreur envoyée à `reject`.

### Enchaîner les promesses

Si nous avons une séquence de tâches asynchrones l'une après l'autre qui doivent être exécutées - plus il y a d'imbrication, plus le code devient confus.

Cela nous conduit à l'enfer des rappels, qui peut facilement être évité en enchaînant plusieurs `then()`méthodes sur un seul `Promise`résultat d:

```
promise.then(function(result) {
    // Register user
    return {account: 'blahblahblah'};
}).then(function(result) {
    // Auto login
    return {session: 'sjhgssgsg16775vhg765'};
}).then(function(result) {
    // Present WhatsNew and some options
    return {whatsnew: {}, options: {}};
}).then(function(result) {
    // Remember the user Choices
    return {msg: 'All done'};
});

```

Comme nous pouvons le voir, le résultat est passé à travers la chaîne de `then()`gestionnaires:

-   L' `promise`objet initial se résout
-   Ensuite, le `then()`gestionnaire est appelé pour enregistrer l'utilisateur
-   La valeur qu'elle renvoie est transmise au `then()`gestionnaire suivant pour connecter automatiquement l'utilisateur
-   ...etc

En outre, le `then(handler)`peut créer et retourner une promesse.

**Remarque:** Bien que techniquement, nous *puissions* faire quelque chose comme l'exemple précédent, cela peut réduire le point de chaînage. Bien que cette technique puisse être utile lorsque vous devez éventuellement appeler des méthodes asynchrones:

```
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve({msg: 'To do some more job'}), 1000);
});

promise.then(function(result) {
    return {data: 'some data'};
});

promise.then(function(result) {
    return {data: 'some other data'};
});

promise.then(function(result) {
    return {data: 'some more data'};
});

```

Ce que nous faisons ici, c'est simplement ajouter plusieurs gestionnaires à une promesse, qui traitent tous de manière `result`indépendante. Ils ne se transmettent pas le résultat dans la séquence.

De cette façon, tous les gestionnaires obtiennent le même résultat - le résultat de cette promesse - `{msg: 'To do some more job'}`.

### Conclusion

`Promise`s, comme son nom l'indique, est la fonction "donnant son mot" qu'une valeur sera renvoyée plus tard. C'est un proxy pour une valeur qui pourrait ne pas être retournée, si la fonction dont nous attendons une réponse ne livre pas.

Au lieu de renvoyer des valeurs concrètes, ces fonctions asynchrones renvoient un `Promise`objet qui, à un moment donné, sera rempli ou non.

Si vous avez travaillé avec des callbacks, vous devez apprécier la sémantique claire et nette de `Promise`s.

En tant que développeur Node / JavaScript, nous traiterons plus souvent des promesses. Après tout, c'est un monde asynchrone, plein de surprises.