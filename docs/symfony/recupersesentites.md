---
sidebar: auto
---
# Recuperer ses entités

L'une des principales fonctions de la couche Modèle dans une application MVC, c'est la récupération des données. Récupérer des données n'est pas toujours évident, surtout lorsqu'on veut récupérer seulement certaines données, les classer selon des critères, etc. Tout cela se fait grâce aux *repositories*, que nous étudions dans ce chapitre. Bonne lecture !

### Le rôle des repositories

On s'est déjà rapidement servi de quelques repositories, donc vous devriez sentir leur utilité, mais il est temps de théoriser un peu.

#### Définition

*Un repository centralise tout ce qui touche à la récupération de vos entités.* Concrètement donc, vous ne devez pas faire la moindre requête SQL ailleurs que dans un repository, c'est la règle. On va donc y construire des méthodes pour récupérer une entité par son id, pour récupérer une liste d'entités suivant un critère spécifique, etc. Bref, à chaque fois que vous devez récupérer des entités dans votre base de données, vous utiliserez le repository de l'entité correspondante.

Rappelez-vous, il existe un repository par entité. Cela permet de bien organiser son code. Bien sûr, cela n'empêche pas qu'un repository utilise plusieurs types d'entité, dans le cas d'une jointure par exemple.

Les repositories ne fonctionnent pas par magie, ils utilisent en réalité directement l'EntityManager pour faire leur travail. Vous le verrez, parfois nous ferons directement appel à l'EntityManager depuis des méthodes du repository.

#### Les méthodes de récupération des entités

Depuis un repository, il existe deux moyens de récupérer les entités : en utilisant du DQL et en utilisant le QueryBuilder.

##### Le Doctrine Query Language (DQL)

Le DQL n'est rien d'autre que du SQL adapté à la vision par objets que Doctrine utilise. Il s'agit donc de faire ce qu'on a l'habitude de faire, des requêtes textuelles comme celle-ci par exemple :

```
SELECT a FROM SdzBlogBundle:Article a
```

Vous venez de voir votre première requête DQL. Retenez le principe : avec une requête qui n'est rien d'autre que du texte, on effectue le traitement voulu.

##### Le QueryBuilder

Le QueryBuilder est un moyen plus nouveau. Comme son nom l'indique, il sert à construire une requête, par étape. Si l'intérêt n'est pas évident au début, son utilisation se révèle vraiment pratique ! Voici la même requête que précédemment, mais en utilisant le QueryBuilder :

```
<?php$QueryBuilder  ->select('a')  ->from('SdzBlogBundle:Article', 'a');
```

Un des avantages est qu'il est possible de construire la requête en plusieurs fois. Ainsi, vous pouvez développer une méthode qui rajoute une condition à une requête, par exemple pour sélectionner tous les membres actifs (qui se sont connectés depuis moins d'un mois par exemple). Comme cette condition risque de servir souvent, dans plusieurs requêtes, auparavant vous deviez la réécrire à chaque fois. Avec le QueryBuilder, vous pourrez faire appel à la même méthode, sans réécrire la condition. Pas de panique, on verra des exemples dans la suite du chapitre !

### Les méthodes de récupération de base

#### Définition

Vos repositories héritent de la classe [`Doctrine\ORM\EntityRepository`](https://github.com/doctrine/doctrine2/blob/master/lib/Doctrine/ORM/EntityRepository.php), qui propose déjà quelques méthodes très utiles pour récupérer des entités. Ce sont ces méthodes-là que nous allons voir ici.

#### Les méthodes normales

Il existe quatre méthodes, que voici (tous les exemples sont effectués depuis un contrôleur).

##### `find($id)`

La méthode `find($id)` récupère tout simplement l'entité correspondant à l'id `$id`. Dans le cas de notre `ArticleRepository`, elle retourne une instance d'`Article`. Exemple :

```
<?php$repository = $this->getDoctrine()                   ->getManager()                   ->getRepository('SdzBlogBundle:Article');$article_5 = $repository->find(5);// $article 5 est une instance de Sdz\BlogBundle\Entity\Article
```

##### `findAll()`

La méthode `findAll()` retourne toutes les entités. Le format du retour est un simple `Array`, que vous pouvez parcourir (avec un `foreach` par exemple) pour utiliser les objets qu'il contient. Exemple :

```
<?php$repository = $this->getDoctrine()                   ->getManager()                   ->getRepository('SdzBlogBundle:Article');$listeArticles = $repository->findAll();foreach($listeArticles as $article){  // $article est une instance de Article  echo $article->getContenu();}
```

Ou dans une vue Twig, si l'on a passé la variable `$listeArticles` au template :

```
<ul>  {% for article in listeArticles %}    <li>{{ article.contenu }}</li>  {% endfor %}</ul>
```

##### `findBy()`

La méthode `findBy()` est un peu plus intéressante. Comme `findAll()`, elle permet de retourner une liste d'entités, sauf qu'elle est capable d'effectuer un filtre pour ne retourner que les entités correspondant à un critère. Elle peut aussi trier les entités, et même n'en récupérer qu'un certain nombre (pour une pagination).

La syntaxe est la suivante :

```
<?php$repository->findBy(array $criteres, array $orderBy = null, $limite = null, $offset = null);
```

Voici un exemple d'utilisation :

```
<?php$repository = $this->getDoctrine()                   ->getManager()                   ->getRepository('SdzBlogBundle:Article');$listeArticles = $repository->findBy(array('auteur' => 'winzou'),                                     array('date' => 'desc'),                                     5,                                     0);foreach($listeArticles as $article){  // $article est une instance de Article echo $article->getContenu();}
```

Cet exemple va récupérer toutes les entités ayant comme auteur « winzou » en les classant par date décroissante et en en sélectionnant cinq `(5)` à partir du début `(0)`. Elle retourne un `Array` également. Vous pouvez mettre plusieurs entrées dans le tableau des critères, afin d'appliquer plusieurs filtres.

##### `findOneBy()`

La méthode `findOneBy(array $criteres)` fonctionne sur le même principe que la méthode `findBy()`, sauf qu'elle ne retourne qu'une seule entité. Les arguments `orderBy`, `limit` et `offset` n'existent donc pas. Exemple :

```
<?php$repository = $this->getDoctrine()                   ->getManager()                   ->getRepository('SdzBlogBundle:Article');$article = $repository->findOneBy(array('titre' => 'Mon dernier weekend'));// $article est une instance de Article
```

Ces méthodes permettent de couvrir pas mal de besoins. Mais pour aller plus loin encore, Doctrine nous offre deux autres méthodes magiques.

#### Les méthodes magiques

Vous connaissez le principe des [méthodes magiques](http://php.net/manual/fr/language.oop5.magic.php), comme `__call()` qui émule des méthodes. Ces méthodes émulées n'existent pas dans la classe, elle sont prises en charge par `__call()` qui va exécuter du code en fonction du nom de la méthode appelée.

Voici les deux méthodes gérées par `__call()` dans les repositories.

##### `findByX($valeur)`

Première méthode, en remplaçant « X » par le nom d'une propriété de votre entité. Dans notre cas, pour l'entité `Article`, nous avons donc plusieurs méthodes : `findByTitre()`, `findByDate()`, `findByAuteur()`, `findByContenu()`, etc.

Cette méthode fonctionne comme `findBy()`, sauf que vous ne pouvez mettre qu'un seul critère, celui du nom de la méthode.

Attention, la limite de cette méthode est que vous ne pouvez pas utiliser les arguments pour trier, ni pour mettre une limite.

```
<?php$repository = $this->getDoctrine()                   ->getManager()                   ->getRepository('SdzBlogBundle:Article');$listeArticles = $repository->findByAuteur('winzou');// $listeArticles est un Array qui contient tous les articles écrits par winzou
```

##### `findOneByX($valeur)`

Deuxième méthode, en remplaçant « X » par le nom d'une propriété de votre entité. Dans notre cas, pour l'entité `Article`, nous avons donc plusieurs méthodes : `findOneByTitre()`, `findOneByDate()`, `findOneByAuteur()`, `findOneByContenu()`, etc.

Cette méthode fonctionne comme `findOneBy()`, sauf que vous ne pouvez mettre qu'un seul critère, celui du nom de la méthode.

```
<?php$repository = $this->getDoctrine()                   ->getManager()                   ->getRepository('SdzBlogBundle:Article');$article = $repository->findOneByTitre('Mon dernier weekend');// $article est une instance d'Article
```

Toutes ces méthodes permettent de récupérer vos entités dans la plupart des cas. Simplement, elles montrent rapidement leurs limites lorsqu'on doit faire des jointures, ou effectuer des conditions plus complexes. Pour cela --- et cela nous arrivera très souvent --- il faudra faire nos propres méthodes de récupération.

### Les méthodes de récupération personnelles

#### La théorie

Pour effectuer nos propres méthodes, il faut bien comprendre comment fonctionne Doctrine2 pour effectuer ses requêtes. Il faut notamment distinguer trois types d'objets qui vont nous servir, et qu'il ne faut pas confondre : le QueryBuilder, la Query et les résultats.

##### Le QueryBuilder

On l'a déjà vu rapidement, le QueryBuilder permet de construire une Query, mais il n'est pas une Query !

Pour récupérer un QueryBuilder, on peut utiliser simplement l'EntityManager. En effet, il dispose d'une méthode `createQueryBuilder()` qui nous retournera une instance de QueryBuilder. L'EntityManager est accessible depuis un repository en utilisant l'attribut `_em` d'un repository, soit `<?php $this->_em`. Le code complet pour récupérer un QueryBuilder neuf depuis une méthode d'un repository est donc `<?php $this->_em->createQueryBuilder()`.

Cependant, cette méthode nous retourne un QueryBuilder vide, c'est-à-dire sans rien de prédéfini. C'est dommage, car lorsqu'on récupère un QueryBuilder depuis un repository, c'est que l'on veut faire une requête sur l'entité gérée par ce repository. Donc si l'on pouvait définir la partie `SELECT article FROM SdzBlogBundle:Article` sans trop d'effort, cela serait bien pratique, car ce qui est intéressant, c'est le reste de la requête. Heureusement, le repository contient également une méthode `createQueryBuilder($alias)` qui utilise la méthode de l'EntityManager, mais en définissant pour nous le SELECT et le FROM. Vous pouvez jeter un œil à [cette méthode `createQueryBuilder()`](https://github.com/doctrine/doctrine2/blob/master/lib/Doctrine/ORM/EntityRepository.php#L74) pour comprendre.

L'alias en argument de la méthode est le raccourci que l'on donne à l'entité du repository. On utilise souvent la première lettre du nom de l'entité, dans notre exemple de l'article cela serait donc un « a ».

Beaucoup de théorie, passons donc à la pratique ! Pour bien comprendre la différence QueryBuilder/Query, ainsi que la récupération du QueryBuilder, rien de mieux qu'un exemple. Nous allons recréer la méthode `findAll()` dans notre repository `Article` :

```
<?php// src/Sdz/BlogBundle/Entity/ArticleRepositorynamespace Sdz\BlogBundle\Entity;use Doctrine\ORM\EntityRepository;/** * ArticleRepository * * This class was generated by the Doctrine ORM. Add your own custom * repository methods below. */class ArticleRepository extends EntityRepository{  public function myFindAll()  {    $queryBuilder = $this->createQueryBuilder('a');    // Méthode équivalente, mais plus longue :    $queryBuilder = $this->_em->createQueryBuilder()                              ->select('a')                              ->from($this->_entityName, 'a');      // Dans un repository, $this->_entityName est le namespace de l'entité gérée      // Ici, il vaut donc Sdz\BlogBundle\Entity\Article    // On a fini de construire notre requête    // On récupère la Query à partir du QueryBuilder    $query = $queryBuilder->getQuery();    // On récupère les résultats à partir de la Query    $resultats = $query->getResult();    // On retourne ces résultats    return $resultats;  }}
```

Cette méthode `myFindAll()` retourne exactement le même résultat qu'un `findAll()`, c'est-à-dire un tableau de toutes les entités `Article` dans notre base de données. Vous pouvez le voir, faire une simple requête est très facile. Pour mieux le visualiser, je vous propose la même méthode sans les commentaires et en raccourci :

```
<?phppublic function myFindAll(){  return $this->createQueryBuilder('a')              ->getQuery()              ->getResult();}
```

Simplissime, non ? ![:p](http://fr.openclassrooms.com/bundles/common/images/smiley/langue.png)

Et bien sûr, pour récupérer les résultats depuis un contrôleur, le code est le suivant :

```
<?phppublic function testAction(){  $liste_articles = $this->getDoctrine()                         ->getManager()                         ->getRepository('SdzBlogBundle:Article')                         ->myFindAll();  // Reste de la méthode du contrôleur}
```

Sauf que pour l'instant on a juste récupéré le QueryBuilder, on n'a pas encore joué avec lui. Il dispose de plusieurs méthodes afin de construire notre requête. Il y a une ou plusieurs méthodes par partie de requête : le WHERE, le ORDER BY, le FROM, etc. Elles n'ont rien de compliqué, voyez-le dans les exemples suivants.

Commençons par une méthode équivalente au `find($id)` de base, pour nous permettre de manipuler le `where()` et le `setParameter()`.

```
<?php// Dans un repositorypublic function myFindOne($id){  // On passe par le QueryBuilder vide de l'EntityManager pour l'exemple  $qb = $this->_em->createQueryBuilder();  $qb->select('a')     ->from('SdzBlogBundle:Article', 'a')     ->where('a.id = :id')     ->setParameter('id', $id);    return $qb->getQuery()              ->getResult();}
```

Vous connaissez le principe des paramètres, qui est le même qu'avec PDO. On définit un paramètre dans la requête avec `:nom_du_parametre`, puis on attribue une valeur à ce paramètre avec la méthode `setParameter('nom_du_parametre', $valeur)`.

Voici un autre exemple pour utiliser le `andWhere()` ainsi que le `orderBy()`. Créons une méthode pour récupérer tous les articles écrits par un auteur avant une année donnée :

```
<?php// Depuis un repository public function findByAuteurAndDate($auteur, $annee){  // On utilise le QueryBuilder créé par le repository directement pour gagner du temps  // Plus besoin de faire le select() ni le from() par la suite donc  $qb = $this->createQueryBuilder('a');  $qb->where('a.auteur = :auteur')      ->setParameter('auteur', $auteur)     ->andWhere('a.date < :annee')      ->setParameter('annee', $annee)     ->orderBy('a.date', 'DESC');  return $qb->getQuery()            ->getResult();}
```

Maintenant, voyons un des avantages du QueryBuilder. Vous vous en souvenez, je vous avais parlé d'une méthode pour centraliser une condition par exemple. Voyons donc une application de ce principe, en considérant que la condition « articles postés durant l'année en cours » est une condition dont on va se resservir souvent. Il faut donc en faire une méthode, que voici :

```
<?php// Depuis un repositorypublic function whereCurrentYear(\Doctrine\ORM\QueryBuilder $qb){  $qb->andWhere('a.date BETWEEN :debut AND :fin')      ->setParameter('debut', new \Datetime(date('Y').'-01-01'))  // Date entre le 1er janvier de cette année      ->setParameter('fin',   new \Datetime(date('Y').'-12-31')); // Et le 31 décembre de cette année    return $qb;}
```

Vous notez donc que cette méthode ne traite pas une Query, mais bien uniquement le QueryBuilder. C'est en cela que ce dernier est très pratique, car faire cette méthode sur une requête en texte simple est possible, mais compliqué. Il aurait fallu voir si le WHERE était déjà présent dans la requête, si oui mettre un AND au bon endroit, etc. Bref, pas simple.

Pour utiliser cette méthode, voici la démarche :

```
<?php// Depuis un repositorypublic function myFind(){  $qb = $this->createQueryBuilder('a');  // On peut ajouter ce qu'on veut avant  $qb->where('a.auteur = :auteur')      ->setParameter('auteur', 'winzou');  // On applique notre condition  $qb = $this->whereCurrentYear($qb);  // On peut ajouter ce qu'on veut après  $qb->orderBy('a.date', 'DESC');      return $qb->getQuery()            ->getResult();}
```

Voilà, vous pouvez dorénavant appliquer cette condition à n'importe laquelle de vos requêtes en construction.

Je ne vous ai pas listé toutes les méthodes du QueryBuilder, il en existe bien d'autres. Pour cela, vous devez absolument mettre la page suivante dans vos favoris : [http://www.doctrine-project.org/docs/o [...] -builder.html](http://www.doctrine-project.org/docs/orm/2.1/en/reference/query-builder.html). Ouvrez-la et gardez-la sous la main à chaque fois que vous voulez faire une requête à l'aide du QueryBuilder, c'est la référence !

##### La Query

Vous l'avez vu, la Query est l'objet à partir duquel on extrait les résultats. Il n'y a pas grand-chose à savoir sur cet objet en lui-même, car il ne permet pas grand-chose à part récupérer les résultats. Il sert en fait surtout à la gestion du cache des requêtes. Un prochain chapitre est à venir sur ce cache de requêtes.

Mais détaillons tout de même les différentes façons d'extraire les résultats de la requête. Ces différentes manières sont toutes à maîtriser, car elles concernent chacune un type de requête.

##### `getResult()`

Exécute la requête et retourne un tableau contenant les résultats sous forme d'objets. Vous récupérez ainsi une liste des objets, sur lequels vous pouvez faire des opérations, des modifications, etc.

Même si la requête ne retourne qu'un seul résultat, cette méthode retourne un tableau.

```
<?php$entites = $qb->getQuery()->getResult();foreach($entites as $entite){  // $entite est une instance d'Article pour notre exemple  $entite->getAttribut();}
```

##### `getArrayResult()`

Exécute la requête et retourne un tableau contenant les résultats sous forme de tableaux. Comme avec `getResult()`, vous récupérez un tableau même s'il n'y a qu'un seul résultat. Mais dans ce tableau, vous n'avez pas vos objets d'origine, vous avez des simples tableaux. Cette méthode est utilisée lorsque vous ne voulez que lire vos résultats, sans y apporter de modification. Elle est dans ce cas plus rapide que son homologue `getResult()`.

```
<?php$entites = $qb->getQuery()->getArrayResult();foreach($entites as $entite){  // $entite est un tableau  // Faire $entite->getAttribut() est impossible. Vous devez faire :  $entite['attribut'];}
```

Heureusement, Twig est intelligent : `{{ entite.attribut }}` exécute `$entite->getAttribut()` si `$entite` est un objet, et exécute `$entite['attribut']` sinon. Du point de vue de Twig, vous pouvez utiliser `getResult()` ou `getArrayResult()` indifféremment.

##### `getScalarResult()`

Exécute la requête et retourne un tableau contenant les résultats sous forme de valeurs. Comme avec `getResult()`, vous récupérez un tableau même s'il n'y a qu'un seul résultat.

Mais dans ce tableau, un résultat est une valeur, non un tableau de valeurs (`getArrayResult`) ou un objet de valeurs (`getResult`). Cette méthode est donc utilisée lorsque vous ne sélectionnez qu'une seule valeur dans la requête, par exemple : `SELECT COUNT(*) FROM ...`. Ici, la valeur est la valeur du COUNT.

```
<?php$entites = $qb->getQuery()->getScalarResult();foreach($entites as $valeur){  // $valeur est la valeur de ce qui a été sélectionné : un nombre, un texte, etc.  $valeur;  // Faire $valeur->getAttribut() ou $valeur['attribut'] est impossible}
```

##### `getOneOrNullResult()`

Exécute la requête et retourne un seul résultat, ou `null` si pas de résultat. Cette méthode retourne donc une instance de l'entité (ou `null`) et non un tableau d'entités comme `getResult()`.

Cette méthode déclenche une exception `Doctrine\ORM\NonUniqueResultException` si la requête retourne plus d'un seul résultat. Il faut donc l'utiliser si l'une de vos requêtes n'est pas censée retourner plus d'un résultat : déclencher une erreur plutôt que de laisser courir permet d'anticiper des futurs bugs !

```
<?php$entite = $qb->getQuery()->getOneOrNullResult();// $entite est une instance d'Article dans notre exemple// Ou null si la requête ne contient pas de résultat// Et une exception a été déclenchée si plus d'un résultat
```

##### `getSingleResult()`

Exécute la requête et retourne un seul résultat. Cette méthode est exactement la même que `getOneOrNullResult()`, sauf qu'elle déclenche une exception `Doctrine\ORM\NoResultException` si aucun résultat.

C'est une méthode très utilisée, car faire des requêtes qui ne retournent qu'un unique résultat est très fréquent.

```
<?php$entite = $qb->getQuery()->getSingleResult();// $entite est une instance d'Article dans notre exemple// Une exception a été déclenchée si plus d'un résultat// Une exception a été déclenchée si pas de résultat
```

##### `getSingleScalarResult()`

Exécute la requête et retourne une seule valeur, et déclenche des exceptions si pas de résultat ou plus d'un résultat.

Cette méthode est très utilisée également pour des requêtes du type `SELECT COUNT(*) FROM Article`, qui ne retournent qu'une seule ligne de résutlat, et une seule valeur dans cette ligne.

```
<?php$valeur = $qb->getQuery()->getSingleScalarResult();// $valeur est directement la valeur du COUNT dans la requête exemple// Une exception a été déclenchée si plus d'un résultat// Une exception a été déclenchée si pas de résultat
```

##### `execute()`

Exécute la requête. Cette méthode est utilisée principalement pour exécuter des requêtes qui ne retournent pas de résultats (des `UPDATE`, `INSERT INTO`, etc.).

Cependant, toutes les autres méthodes que nous venons de voir ne sont en fait que des raccourcis vers cette méthode `execute()`, en changeant juste le mode d'hydratation des résultats (objet, tableau, etc.).

```
<?php// Exécute un UPDATE par exemple :$qb->getQuery()->execute();// Voici deux méthodes strictement équivalentes :$resultats = $query->getArrayResult();// Et :$resultats = $query->execute(array(), Query::HYDRATE_ARRAY);// Le premier argument de execute() est un tableau de paramètres// Vous pouvez aussi passer par la méthode setParameter(), au choix// Le deuxième argument de execute() est ladite méthode d'hydratation
```

Pensez donc à bien choisir votre façon de récupérer les résultats à chacune de vos requêtes.

#### Utilisation du Doctrine Query Language (DQL)

Le DQL est une sorte de SQL adapté à l'ORM Doctrine2. Il permet de faire des requêtes un peu à l'ancienne, en écrivant une requête en chaîne de caractères (en opposition au QueryBuilder).

Pour écrire une requête en DQL, il faut donc oublier le QueryBuilder, on utilisera seulement l'objet Query. Et la méthode pour récupérer les résultats sera la même. Le DQL n'a rien de compliqué, et il est [très bien documenté](http://www.doctrine-project.org/docs/orm/2.0/en/reference/dql-doctrine-query-language.html).

##### La théorie

Pour créer une requête en utilisant du DQL, il faut utiliser la méthode `createQuery()` de l'EntityManager :

```
<?php// Depuis un repositorypublic function myFindAllDQL(){  $query = $this->_em->createQuery('SELECT a FROM SdzBlogBundle:Article a');  $resultats = $query->getResult();  return $resultats;}
```

Regardons de plus près la requête DQL en elle-même :

```
SELECT a FROM SdzBlogBundle:Article a
```

Tout d'abord, vous voyez que l'on n'utilise pas de table. On a dit qu'on pensait objet et non plus base de données ! Il faut donc utiliser dans les FROM et les JOIN le nom des entités. Soit en utilisant le nom raccourci comme on l'a fait, soit le namespace complet de l'entité. De plus, il faut toujours donner un alias à l'entité, ici on a mis « a ». On met souvent la première lettre de l'entité, même si ce n'est absolument pas obligatoire.

Ensuite, vous imaginez bien qu'il ne faut pas sélectionner un à un les attributs de nos entités, cela n'aurait pas de sens. Une entité `Article` avec le titre renseigné mais pas la date ? Ce n'est pas logique. C'est pourquoi on sélectionne simplement l'alias, ici « a », ce qui sélectionne en fait tous les attributs d'un article. L'équivalent d'une étoile (*) en SQL donc.

Sachez qu'il est tout de même possible de ne sélectionner qu'une partie d'un objet, en faisant « a.titre » par exemple. Mais vous ne recevez alors qu'un tableau contenant les attributs sélectionnés, et non un objet. Vous ne pouvez donc pas modifier/supprimer/etc. l'objet, puisque c'est un tableau. Cela sert dans des requêtes particulières, mais la plupart du temps on sélectionnera bien tout l'objet.

Faire des requêtes en DQL n'a donc rien de compliqué. Lorsque vous les faites, gardez bien sous la main [la page de la documentation sur le DQL](http://www.doctrine-project.org/docs/orm/2.0/en/reference/dql-doctrine-query-language.html) pour en connaître la syntaxe. En attendant, je peux vous montrer quelques exemples afin que vous ayez une idée globale du DQL.

Pour tester rapidement vos requêtes DQL sans avoir à les implémenter dans une méthode de votre repository, Doctrine2 nous simplifie la vie grâce à la commande `doctrine:query:dql`. Cela vous permet de faire quelques tests afin de construire ou de vérifier vos requêtes, à utiliser sans modération donc ! Je vous invite dès maintenant à exécuter la commande suivante : `php app/console doctrine:query:dql "SELECT a FROM SdzBlogBundle:Article a"`.

##### Exemples

Pour faire une jointure :

```
SELECT a, u FROM Article a JOIN a.utilisateur u WHERE u.age = 25
```

Pour utiliser une fonction SQL :

```
SELECT a FROM Article a WHERE TRIM(a.auteur) = 'winzou'
```

Pour sélectionner seulement un attribut (attention les résultats seront donc sous forme de tableaux et non d'objets) :

```
SELECT a.titre FROM Article a WHERE a.id IN(1, 3, 5)
```

Et bien sûr vous pouvez également utiliser des paramètres :

```
<?phppublic function myFindDQL($id){  $query = $this->_em->createQuery('SELECT a FROM Article a WHERE a.id = :id');  $query->setParameter('id', $id);  return $query->getSingleResult(); // Utilisation de getSingleResult car la requête ne doit retourner qu'un seul résultat}
```

### Utiliser les jointures dans nos requêtes

#### Pourquoi utiliser les jointures ?

Je vous en ai déjà parlé dans le chapitre précédent sur les relations entre entités. Lorsque vous utilisez la syntaxe `<?php $entiteA->getEntiteB()`, Doctrine exécute une requête afin de charger les entités B qui sont liées à l'entité A.

L'objectif est donc d'avoir la maîtrise sur quand charger juste l'entité A, et quand charger l'entité A avec ses entités B liées. Nous avons déjà vu le premier cas, par exemple un `$repositoryA->find($id)` ne récupère qu'une seule entité A sans récupérer les entités liées. Maintenant, voyons comment réaliser le deuxième cas, c'est-à-dire récupérer tout d'un coup avec une jointure, pour éviter une seconde requête par la suite.

Tout d'abord, rappelons le cas d'utilisation principal de ces jointures. C'est surtout lorsque vous bouclez sur une liste d'entités A (par exemple des articles), et que dans cette boucle vous faites `$entiteA->getEntiteB()` (par exemple des commentaires). Avec une requête par itération dans la boucle, vous explosez votre nombre de requêtes sur une seule page ! C'est donc principalement pour éviter cela que nous allons faire des jointures.

#### Comment faire des jointures avec le QueryBuilder ?

Heureusement, c'est très simple ! Voici tout de suite un exemple :

```
<?php// Depuis le repository d'Articlepublic function getArticleAvecCommentaires(){  $qb = $this->createQueryBuilder('a')             ->leftJoin('a.commentaires', 'c')             ->addSelect('c');  return $qb->getQuery()            ->getResult();}
```

L'idée est donc très simple :

-   D'abord on crée une jointure avec la méthode `leftJoin()` (ou `join()` pour faire l'équivalent d'un `INNER JOIN`). Le premier argument de la méthode est l'attribut de l'entité principale (celle qui est dans le `FROM` de la requête) sur lequel faire la jointure. Dans l'exemple, l'entité `Article` possède un attribut `commentaires`. Le deuxième argument de la méthode est l'alias de l'entité jointe.

-   Puis on sélectionne également l'entité jointe, via un `addSelect()`. En effet, un `select()` tout court aurait écrasé le `select('a')` déjà fait par le `createQueryBuilder()`, rappelez-vous.

Attention : on ne peut faire une jointure que si l'entité du `FROM` possède un attribut vers l'entité à joindre ! Cela veut dire que soit l'entité du `FROM` est l'entité propriétaire de la relation, soit la relation est bidirectionnelle.\
Dans notre exemple, la relation entre `Article` et `Commentaire` est une *Many-To-One* avec `Commentaire` le côté *Many*, le côté propriétaire donc. Cela veut dire que pour pouvoir faire la jointure dans ce sens, la relation est bidirectionnelle, afin d'ajouter un attribut `commentaires` dans l'entité inverse `Article`.

Et pourquoi n'a-t-on pas précisé la condition « ON » du JOIN ?

C'est une bonne question. La réponse est très logique, pour cela réfléchissez plutôt à la question suivante : pourquoi est-ce qu'on rajoute un `ON` habituellement dans nos requêtes SQL ? C'est pour que MySQL (ou tout autre SGBDR) puisse savoir sur quelle condition faire la jointure. Or ici, on s'adresse à Doctrine et non directement à MySQL. Et bien entendu, Doctrine connaît déjà tout sur notre association, grâce aux annotations !

Bien sûr, vous pouvez toujours personnaliser la condition de jointure, en rajoutant vos conditions à la suite du `ON` généré par Doctrine, grâce à la syntaxe du `WITH` :

```
<?php$qb->join('a.commentaires', 'c', 'WITH', 'YEAR(c.date) > 2011')
```

Le troisième argument est le type de condition `WITH`, et le quatrième argument est ladite condition.

« WITH » ? C'est quoi cette syntaxe pour faire une jointure ?

En SQL, la différence entre le `ON` et le `WITH` est simple : un `ON`*définit* la condition pour la jointure, alors qu'un `WITH`*ajoute* une condition pour la jointure. Attention, en DQL le `ON` n'existe pas, seul le `WITH` est supporté. Ainsi, la syntaxe précédente avec le `WITH` serait équivalente à la syntaxe SQL suivante à base de `ON` :

```
SELECT * FROM Article a JOIN Commentaire c ON c.article = a.id AND YEAR(c.date) > 2011
```

Grâce au `WITH`, on n'a pas besoin de réécrire la condition par défaut de la jointure, le `c.article = a.id`.

#### Comment utiliser les jointures ?

Réponse : comme d'habitude ! Vous n'avez rien à modifier dans votre code. Si vous utilisez une entité dont vous avez récupéré les entités liées avec une jointure, vous pouvez alors utiliser les getters joyeusement sans craindre de requête supplémentaire. Reprenons l'exemple de la méthode `getArticleAvecCommentaires()` définie précédemment, on pourrait utiliser les résultats comme ceci :

```
<?php// Depuis un contrôleurpublic function listeAction(){  $listeArticles = $this->getDoctrine()                        ->getManager()                        ->getRepository('SdzBlogBundle:Article')                        ->getArticleAvecCommentaires();  foreach($listeArticles as $article)  {    // Ne déclenche pas de requête : les commentaires sont déjà chargés !    // Vous pourriez faire une boucle dessus pour les afficher tous    $article->getCommentaires();  }  // ...}
```

Voici donc comment vous devrez faire la plupart de vos requêtes. En effet, vous aurez souvent besoin d'utiliser des entités liées entre elles, et faire une ou plusieurs jointures s'impose très souvent. ![;)](http://fr.openclassrooms.com/bundles/common/images/smiley/clin.png)

### Application : les entités de notre blog

#### Plan d'attaque

Nous allons ajouter une méthode dans l'ArticleRepository pour récupérer tous les articles qui correspondent à une liste de catégories. La définition de la méthode est donc `<?php getAvecCategories(array $nom_categories) ?>`, que l'on pourra utiliser comme ceci par exemple : `<?php $articleRepository->getAvecCategories(array('Doctrine2', 'Tutoriel')) ?>`.

#### À vous de jouer !

Important : **faites-le vous-mêmes** ! La correction est juste en dessous, je sais, mais si vous ne faites pas *maintenant* l'effort d'y réfléchir par vous-mêmes, cela vous handicapera par la suite !

#### Le code

**`ArticleRepository.php` :**

```
<?php// src/Sdz/BlogBundle/Entity/ArticleRepository.phpnamespace Sdz\BlogBundle\Entity;use Doctrine\ORM\EntityRepository;/** * ArticleRepository * * This class was generated by the Doctrine ORM. Add your own custom * repository methods below. */class ArticleRepository extends EntityRepository{  public function getAvecCategories(array $nom_categories)  {    $qb = $this->createQueryBuilder('a');    // On fait une jointure avec l'entité Categorie, avec pour alias « c »    $qb ->join('a.categories', 'c')        ->where($qb->expr()->in('c.nom', $nom_categories)); // Puis on filtre sur le nom des catégories à l'aide d'un IN    // Enfin, on retourne le résultat    return $qb->getQuery()              ->getResult();  }}
```

Que faire avec ce que retourne cette fonction ?

Comme je l'ai dit précédemment, cette fonction va retourner un tableau d'`Article`. Qu'est-ce que l'on veut en faire ? Les afficher. Donc la première chose à faire est de passer ce tableau à Twig. Ensuite, dans Twig, vous faites un simple `{% for %}` pour afficher les articles. Ce n'est vraiment pas compliqué à utiliser !

Et voilà, vous avez tout le code. Je n'ai qu'une chose à vous dire à ce stade du cours : entraînez-vous ! Amusez-vous à faire des requêtes dans tous les sens dans l'ArticleRepository ou même dans les autres repositories. Jouez avec les relations entre les entités, créez-en d'autres. Bref, cela ne viendra pas tout seul, il va falloir travailler un peu de votre côté. ![;)](http://fr.openclassrooms.com/bundles/common/images/smiley/clin.png)

#### En résumé

-   Le rôle d'un repository est, à l'aide du langage DQL ou du constructeur de requêtes, de récupérer des entités selon des contraintes, des tris, etc.

-   Un repository dispose toujours de quelques méthodes de base, permettant de récupérer de façon très simple les entités.

-   Mais la plupart du temps, il faut créer des méthodes personnelles pour récupérer les entités exactement comme on le veut.

-   Il est indispensable de faire les bonnes jointures afin de limiter au maximum le nombre de requêtes SQL sur vos pages.