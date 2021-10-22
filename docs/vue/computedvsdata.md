Valeurs "computed" et "data" dans vuejs
=======================================

Mettre en place des data
------------------------

Le code ci-dessous permet de créer une **data** qui sera utilisable dans un template de **vuejs**. Elle a pour nom testData et comme valeur la chaîne de caractère "data".

![vuejs2-utiliser-data](https://www.azur-web.com/img/vuejs-1.jpg)

### Résultat de l'utilisation de data

![vuejs2-utiliser-data-resultat](https://www.azur-web.com/img/resultat-vuejs-1.jpg)

Utiliser les propriétés computed
--------------------------------

Maintenant nous allons utiliser le même code mais cette fois-ci nous ajouterons une valeur dans **computed**.

![vuejs2-utiliser-data](https://www.azur-web.com/img/vuejs-2.jpg)

### Résultat de l'utilisation de computed

![vuejs2-utiliser-data-resultat](https://www.azur-web.com/img/resultat-vuejs-2.jpg)

À première vue, mis à part la manière de les déclarer, on a l'impression qu'il n'y a pas de différences. Mais ce n'est pas le cas il y a bien des différences entre data et computed.

Différence entre data et computed
---------------------------------

Dans la logique (script) si j'essaye de modifier la valeur dans la partie data cela fonctionnera. Mais impossible d'utiliser la même méthode pour modifier les données dans computed car cela ne fonctionnera pas. L'exemple ci-dessous nous le prouve.

![vuejs2-modifier-data-computed](https://www.azur-web.com/img/vuejs-3.jpg)

J'utilise ici `mounted` qui exécute le code Javascript de son bloc lorsque "la vue est chargée". Comme on le voit dans le résultat plus bas `testData` est modifié mais pas `testComputed`

![vuejs2-modifier-data-computed-resultat](https://www.azur-web.com/img/resultat-vuejs-3.jpg)

Mais alors qu'elle est l'intéret des computed?

Pourquoi utiliser computed?
---------------------------

### Utiliser le contenu d'une "variable" dans une autre "variable"

Imaginez que dans une data nous souhaitions utiliser la valeur d'une autre data.

![vuejs2-utiliser-autre-data](https://www.azur-web.com/img/vuejs-4.jpg)

Est-ce que `testDataCopy` va fonctionner?

![vuejs2-utiliser-autre-data-resultat](https://www.azur-web.com/img/resultat-vuejs-4.jpg)

Et bien non. Mais cela fonctionnera grâce à computed.

![vuejs2-utiliser-autre-data-computed](https://www.azur-web.com/img/vuejs-5.jpg) ![vuejs2-utiliser-autre-data-computed-resultat](https://www.azur-web.com/img/resultat-vuejs-5.jpg)

Nous voyons donc un premier bénéfice d'utiliser computed. C'est la possibilité de copier une ou plusieurs valeurs localisées dans data.

### Ne pas réexécuter le résultat lorsque ce n'est pas nécéssaire

L'autre particularité de computed dans vuejs est que contrairement aux fonctions dans methods et les valeurs dans data, son contenu n'est pas réexécuté à chaque fois. Si une des valeurs de computed change il réexécute sinon non.

D'autres différences
--------------------

Il y a certainement d'autres différences entre data et computed qui n'ont pas été traité dans cet article.