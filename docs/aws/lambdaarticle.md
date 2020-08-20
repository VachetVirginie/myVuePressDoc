---
sidebar: auto
---
# lambdaarticle


Le cloud computing (ou « système infonuagique » en québécois ✨)
---------------------------------------------------------------

Aaaah, le cloud. Cela fait maintenant de nombreuses années qu'on en entend parler. A tel point que ce buzz word ne veut désormais plus dire grand chose.

Pour comprendre rapidement ce qu'est le cloud, nous pouvons catégoriser les nombreux services cloud qui existent. Ce ne sont d'ailleurs pas les acronymes qui manquent pour définir ces catégories. Ainsi, on distingue habituellement ces 4 types de services :

### IaaS (Infrastructure as a Service)

Avec ce type de service, le fournisseur met à disposition des machines virtuelles sur lesquelles vous avez la main pour installer l'OS de votre choix et faire tourner tous les logiciels que vous souhaitez.

La plupart des hébergeurs fournissent ce genre de service : OVH avec sa gamme Public Cloud, Amazon avec EC2, Google et son Compute Engine, etc.

L'avantage avec ces offres est que vous pouvez configurer votre instance comme bon vous semble. En contrepartie de cette flexibilité, il vous revient de configurer l'OS et vos services comme il faut : serveur HTTP, bases de données, applicatif, backups. C'est également à vous d'appliquer toutes les mises à jour des différents logiciels installés. De plus, avec ce type d'offre, par défaut, votre infrastructure ne s'adaptera pas automatiquement à la charge de trafic.

Pour résumer, c'est à vous de tout configurer comme il faut, le fournisseur ne s'occupant que de la partie « hardware » (même si elle est virtualisée).

### PaaS (Platform as a Service)

Avec ce type de service, toute la partie infrastructure, OS et outils est gérée par le fournisseur. Vous n'avez pas à gérer les mises à jours, configurer le serveur HTTP ou gérer les backups.

En règle générale, vous aurez seulement besoin de définir comment fonctionne votre application et les « services » dont elle a besoin, comme par exemple :

-   comment exécuter votre application (langage, web root, dépendances à installer, etc) ;
-   la (ou les) base(s) de données utilisée(s) ;
-   le taille du filesystem.

Il ne vous reste plus qu'à envoyer votre code (souvent via un simple `git push`) et le code sera utilisable en production, dans le cloud, après quelques secondes/minutes. Vous l'aurez compris, l'intérêt de ce genre d'offre, c'est de se concentrer sur la partie applicative (votre code PHP donc) et de ne plus avoir à gérer la partie Ops.

Parmis ceux qui fournissent ce genre de service, on peut citer notamment :

-   Clever Cloud, que nous remercions au passage car ils sponsorisent l'hébergement de [Secret Santa](https://secret-santa.team) ;
-   Heroku ;
-   Symfony Cloud, spécialisé pour l'hébergement d'application Symfony ;
-   Platform.sh ;
-   Google App Engine.

### FaaS (Function as a Service)

Ce type de cloud est assez similaire au PaaS dans la mesure où il permet également une approche « serverless » : la partie « matérielle », l'OS et les différents outils sont toujours gérés par le fournisseur.

En revanche, là où Faas et PaaS se différencient, c'est sur la manière d'exécuter votre code. Alors que le PaaS fonctionne globalement comme une infrastructure classique -- un serveur HTTP répond à votre requête en appelant votre application -- il en est tout autrement pour une Fonction.

En effet, avec les fonctions en tant que service, le processus qui exécute votre application n'a pas besoin de rester en vie quand il ne sert pas. Autrement dit, le fournisseur se charge de démarrer le « serveur » quand c'est nécessaire et de le couper quand il n'y a plus besoin. L'avantage ? Vous n'êtes facturés que pour les ressources réellement consommées (par exemple le temps d'exécution), contrairement à un serveur plus classique dont vous paierez le même montant tous les mois, qu'il soit beaucoup utilisé ou pas du tout. Le FaaS est donc un allié parfait dans beaucoup de cas d'utilisations qui ne nécessitent pas de frontend :

-   application micro-service ;
-   API ;
-   IoT ;
-   webhook ;
-   traitement par batch ;
-   worker (AMQP ou non).

Autre avantage non négligeable : la plateforme se charge de démarrer autant de processus que nécessaire pour s'adapter à la charge de trafic actuelle, sans que vous n'ayez rien à faire.

Parmis les plus célèbres fournisseurs de FaaS, on notera :

-   AWS Lambda d'Amazon ;
-   Microsoft et son Azure Functions ;
-   Google avec Cloud Functions.

### SaaS (Software as a Service) et XaaS (Everything as a Service)

Enfin, dans ces catégories, on retrouve plutôt des produits finaux qui sont mis à votre disposition directement, sans rien avoir à installer ou mettre à jour, rien à héberger et encore à moins à développer. Le Saas fournit la plupart du temps un logiciel utilisable en ligne, directement depuis un navigateur web. Le XaaS, quant à lui, est une catégorie un peu fourre-tout qui regroupe une quantité grandissante de sous-catégorie de service cloud :

-   Data as a Service : base de données gérée par un fournisseur ;
-   Storage as a Service : stockage de fichiers géré par un fournisseur ;
-   Identity as a Service : identités numériques (annuaires, SSO, WebSSO) gérées par un fournisseur ;
-   etc.

Nous ne nous intéresserons pas plus longtemps à ces types de services puisqu'ils ne sont pas faits pour exécuter votre code.

Maintenant que nous avons fait le tour des différentes catégories de cloud, c'est bien avec la catégorie Function as a Service que nous allons continuer cet article, et notamment avec l'offre AWS Lambda d'Amazon.

Bref, parlons lambda
--------------------

L'offre AWS Lambda, disponible depuis 2014, est l'une des plateformes FaaS les plus connues pour faire tourner des fonctions dans le cloud. Mais au fait, c'est quoi une fonction ?

### Fonction ? Lambda ?

Lorsque nous parlons de fonction dans le cloud, il s'agit de l'application qui sera exécutée pour répondre à un événement. On peut vraiment faire le parallèle avec une fonction que l'on trouverait dans notre code : c'est une brique qui va recevoir un événement en entrée et qui devra retourner une réponse en sortie.

On utilise le terme de fonction plutôt que d'application car le but recherché est souvent d'avoir une tâche assez atomique. L'intérêt d'une fonction ne faisant qu'une seule chose est qu'elle soit plutôt légère et rapide à exécuter et qu'elle puisse être lancée en parallèle de manière optimale.

Enfin, le terme lambda peut-être vu comme un synonyme de fonction bien qu'en général, il s'agisse en particulier du service de FaaS d'Amazon AWS.

### Bref

Et si configurer son application pour l'exécuter sous forme de lambda était aussi simple qu'un `composer require` ? Ce n'est en tout cas pas loin d'être réalité, grâce au travail acharné de [Matthieu Napoli](https://twitter.com/matthieunapoli). Depuis quelques années maintenant, il développe [Bref](https://bref.sh/), un outil permettant d'executer assez simplement du code PHP en serverless dans des lambdas Amazon. Il a mis l'accent aussi bien sur la facilité d'utilisation Bref que sur la mise à disposition d'une documentation complète. Je ne peux d'ailleurs que vous conseiller de lire la [documentation qui explique ce qu'est Bref](https://bref.sh/docs/). Il maintient même [une newsletter](https://serverless-php.news/) pour se tenir informé des dernières nouveautés dans le monde du serverless et de PHP.

Pour résumer, Bref se présente à la fois comme un package Composer, un plugin pour le [framework Serverless](https://serverless.com/) (un outil permettant, entre autre, de déployer du code dans le cloud) et des environnements d'exécutions de PHP pour AWS Lambda.

### Runtimes PHP

AWS Lambda est de plus en plus utilisé, y compris dans le monde PHP, alors même que la plateforme ne supporte pas nativement notre langage. Et pourtant, PHP est l'un des meilleurs langages pour faire du serverless. En effet, il a été pensé dès ses débuts pour fonctionner en « fire and forget », c'est à dire qu'entre chaque requête reçue, PHP est complètement réinitialisé et ne conserve aucune donnée. Et ce mode de fonctionnement est exactement similaire à celui d'une lambda.

Et heureusement pour nous, Amazon fournit la possibilité d'utiliser des environnements custom, sans compromis sur la rapidité de démarrage ni lors de l'exécution de votre fonction. C'est pour cette raison que Bref fournit 3 runtimes PHP pour exécuter votre code.

Le premier runtime, appelé simplement « fonction », est le plus simple. Il consiste à exécuter du code PHP sous la forme d'une fonction PHP recevant le payload de l'évènement en paramètre :

```
<?php

use Bref\Context\Context;

require __DIR__ . '/vendor/autoload.php';

return function ($event, Context $context) {
    return /* un contenu serializable en JSON */
};

```

Bref fournit un deuxième runtime, appelé lui « HTTP ». Son nom vous aura mis sur la piste, il permet de faire tourner une application HTTP comme si elle était dans une infrastructure classique. Cela signifie que votre lambda pourra tout à fait être une application Symfony ou Laravel ! Elle recevra les données sous forme d'une requête HTTP et devra retourner une réponse HTTP.

Enfin, dernier runtime à disposition, celui nommé « console ». Il vous permettra d'invoquer des applications CLI basées sur Symfony, Silly ou Laravel Artisan. Par exemple, depuis votre projet en local, vous pourrez invoquer votre lambda grâce à Bref :

`vendor/bin/bref cli <function-name> -- <command>`

`<function-name>` étant le nom de votre lambda et `<command>` la commande que votre application devra lancer.

### World-wide

Pour ma part, j'ai eu l'occasion de manipuler des lambdas pour la première fois pour un outil de monitoring que nous avons développé en interne. Ce n'était pas tant la partie FaaS qui m'intéressait que la possibilité de faire exécuter des checks depuis différentes régions du monde.

En effet, avec AWS Lambda, nous avons le choix de déployer notre code dans une [vingtaine de régions](https://docs.aws.amazon.com/fr_fr/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions). Pratique dans mon cas pour s'assurer qu'un site fonctionne correctement partout dans le monde.

### Le coût, un sujet complexe

Dernier point à aborder avant de rentrer dans la partie un peu plus technique, celui du coût. Comme nous l'avons vu dans le premier chapitre, la facturation qui se fait en fonction des ressources réellement consommées est l'un des avantages du serverless. Mais par définition, cela signifie que vous ne pouvez pas prévoir à l'avance combien va vous coûter votre fonction. Le montant variera principalement en fonction du nombre d'exécutions et de la durée d'exécution de chaque invocation.

Mais cela coûte-t-il moins cher de faire de tourner du code dans une fonction que dans une infrastructure plus classique ? Il n'y a pas de réponse magique. Vous trouverez autant d'articles sur internet expliquant que les lambda ont permis à des personnes d'économiser beaucoup d'argent et avoir un système plus rapide, que des articles expliquant tout le contraire. [Amazon fournit d'ailleurs une documentation et un estimateur](https://aws.amazon.com/fr/lambda/pricing/) pour avoir une idée du montant que pourrait vous coûter votre fonction. Bon à savoir, Amazon fournit un plan gratuit qui inclut 1 million d'invocations gratuites par mois et 400 000 Go-secondes de temps de calcul par mois. Ce qui vous laisse donc pas mal de marge pour tester, le prix d'une Go-seconde étant le prix pour exécuter une fonction qui dure 1 seconde en lui fournissant 1 Go de mémoire.

Pour avoir un ordre d'idée, sur mon application de monitoring, une cinquantaine d'urls sont surveillées, dont une quinzaine sont monitorées toutes les minutes avec des checks effectués dans 2 régions du monde (donc 2 lambdas) :

60 min x 24 h x 30 j x 2 lambdas x 15 urls = 1 296 000 appels / mois

Même si je suis encore sous les 400 000 Go-secondes, je dépasse donc légèrement du free tiers sur le nombre d'invocations. Cependant, la facture reste en dessous de... 10 centimes par mois. Rien d'insurmontable pour le moment donc 😛. N'hésitez pas à regarder [le simulateur que propose Bref](https://cost-calculator.bref.sh/) pour avoir un ordre d'idée sur le montant que pourrait vous coûter l'utilisation d'une lambda.

De plus, Amazon propose un [système de budget et d'alerte](https://console.aws.amazon.com/billing/home#/budgets) pour vous prévenir quand vous atteignez un certain pourcentage de votre budget. Pratique pour éviter les surprises.

Après toute cette théorie, il est maintenant temps d'être un peu plus concret. Prêt pour enfin voir un peu de code ?

Cloudfinement
-------------

Durant ce confinement dû à l'épidémie de COVID-19, les usages internet des particuliers ont nettement augmenté, notamment à cause de l'usage intensif des plateformes vidéo, telles que Amazon Prime et Netflix, ou des visios-conférences. Même si tout se passe globalement bien pour nos chers Fournisseurs d'Accès à Internet, il n'est pas rare de constater de grosses baisses de débit par moment, surtout chez ceux ne possédant pas la fibre. Je vous propose donc que nous développions une petite application nous permettant de vérifier qu'un site marche correctement ou non. En exécutant cette application dans une lambda, cela nous permettra de vérifier que le site fonctionne ou non depuis une autre connexion que la vôtre, confirmant ainsi si le problème se trouve seulement sur votre ligne ou si tout le monde le subit.

### Notre application

Commençons par la partie la plus classique, à savoir la création de notre application :

```
symfony new cloudfinement --full

```

Notre code restera volontairement très simple, le but de cet exemple n'étant pas de s'étendre sur la partie applicative. Voici donc les 2 fichiers à rajouter, à savoir un controller et son template associé :

```
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home(Request $request)
    {
        $url = null;
        $error = false;
        $message = null;

        if ($url = $request->query->get('url')) {
            $client = HttpClient::create();
            try {
                $response = $client->request('GET', $url, [
                    'max_duration' => 1,
                ]);

                if (!$response->getContent()) {
                    $error = true;
                    $message = 'Did not receive any content';
                } else {
                    $error = false;
                }
            } catch (\Throwable $e) {
                $error = true;
                $message = $e->getMessage();
            }
        }

        return $this->render('home.html.twig', [
            'url' => $url,
            'error' => $error,
            'message' => $message,
        ]);
    }
}

```

```
{% extends 'base.html.twig' %}

{% block body %}
   <h1>Cloudfinement</h1>

   <p>Check if a url is down / slow for everyone or just for you:</p>

   <form method="get">
       <label for="url">
           Url to check
       </label>
       <input id="url" type="url" name="url" value="{{ url|default('https://')}}">

       <button type="submit">Vérifier</button>
   </form>

   {% if url %}
       <div style="margin-top: 20px; color: {{ error ? 'red' : 'green' }};">
           {% if error %}
               <h2>Looks like you are not alone</h2>

               <p>
                   {{ message }}
               </p>
           {% else %}
               <h2>Everything looks good from here</h2>

               <p>If you've got some problem with this website, it may just be your connection</p>
           {% endif %}
       </div>
   {% endif %}
{% endblock %}

```

Expliquons rapidement ce que fait ce code. Nous affichons un formulaire avec un champ permettant de saisir une URL. Une fois ce formulaire soumis, nous allons utiliser le client HTTP fourni dans Symfony pour appeler l'URL en question.

Si l'URL cible répond en moins d'une seconde et avec un code HTTP valide (2XX ou 3XX), alors nous affichons que tout est ok :

Sinon, on affiche le message d'erreur :

### Configurer Bref, AWS et Serverless

Encore une fois, la documentation de Bref est assez complète et précise [toutes les étapes nécessaires](https://bref.sh/docs/installation.html). Pour résumer, vous devez :

-   Créer un compte sur [Amazon AWS](https://aws.amazon.com/) (vous devrez saisir une carte bleue, même si vous n'utilisez que le plan gratuit)

-   Installer le framework Serverless (sur lequel se base Bref) : `npm install -g serverless`

-   Créer les clés d'accès à AWS [comme expliqué en image dans la documentation de Bref](https://bref.sh/docs/installation/aws-keys.html)

-   Configurer Serverless avec vos clés : `serverless config credentials --provider aws --key <key> --secret <secret>`

-   Installer Bref `composer require bref/bref`

-   Configurer Bref `vendor/bin/bref init`

Dans cette commande interactive, il va falloir répondre aux questions posées. Dans notre cas, seul le type de fonction désirée nous est demandé. Cela permet à Bref de choisir le bon runtime à utiliser. Et comme nous sommes partis avec une application HTTP en Symfony, il nous faudra répondre « HTTP application ».

2 fichiers ont été créés :

-   serverless.yml
-   index.php

Symfony fournissant déjà un front controlleur (`public/index.php`), nous pouvons supprimer celui généré par Bref et modifier le handler dans la config `serverless.yml` :

```
 functions:
     api:
-        handler: index.php
+        handler: public/index.php

```

```
rm index.php

```

Nous allons aussi modifier la région vers laquelle notre code sera envoyé. Parce que j'ai déjà des lambdas déployées sur mon compte pour 2 régions européennes, je choisis, pour cet exemple, d'utiliser la région AWS nommée `eu-west-2`, [située à Londres](https://docs.aws.amazon.com/fr_fr/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions). Modifions encore notre fichier `serverless.yml` :

```
 provider:
     name: aws
-    region: us-east-1
+    region: eu-west-2

```

### Derniers préparatifs avant le lancement

Au risque de me répéter, il ne faut pas hésiter à consulter toute la documentation de Bref. Il y a notamment [une page dédiée pour le déploiement d'application Symfony](https://bref.sh/docs/frameworks/symfony.html).

Une chose importante à expliquer pour comprendre cette étape, c'est la façon dont l'outil Serverless déploie une application. En effet, celui-ci va d'abord construire une archive à partir de votre application locale puis l'envoyer à AWS. Mais avant de construire cette archive, nous allons devoir préparer notre application locale pour ne pas envoyer de choses inutiles dans la lambda (cache et log Symfony, node_modules, tests, etc).

Première chose à faire, nous allons supprimer les dépendances de dev. On en profite, au passage, pour optimiser l'autoloader généré par Composer :

```
APP_ENV=prod composer install --prefer-dist --optimize-autoloader --no-dev

```

Note : la variable `APP_ENV` est nécessaire pour que les commandes Symfony (notamment le `cache:clear`) soit executée en mode prod, sinon Symfony tournera en mode dev (cf votre fichier .env) et cela provoquera des erreurs à cause de dépendances manquantes.

Ensuite, nous allons dire à Serverless d'ignorer notre dossier `var` (Bref ajoute déjà de quoi ignorer les dossiers `node_modules` et `tests`) :

```
 package:
     exclude:
+        - '.idea/**'
         - 'node_modules/**'
         - 'tests/**'
+        - 'var/**'

```

[N'hésitez pas à exclure tout fichier](https://bref.sh/docs/environment/serverless-yml.html#exclusions) qui ne servirait pas en production, comme de la documentation ou le dossier de votre IDE par exemple.

Nous allons également configurer les variables d'environnement nécessaires à notre application :

```
 provider:
     name: aws
     region: eu-west-2
     runtime: provided
+    environment:
+        # Symfony environment variables
+        APP_ENV: prod

```

Enfin, nous devons apporter une ultime modification à notre application Symfony. En effet, mise à part le dossier `/tmp`, le filesystem de notre lambda sera en lecture seule. Symfony ne pourra donc pas écrire dans son dossier `var`. Deux choix s'offrent alors à nous :

-   soit déplacer les dossiers de log et de cache dans `/tmp` ;
-   soit faire en sorte de pré-générer le cache à l'avance (avec la commande `bin/console cache:warmup`) et de configurer Symfony/Monolog pour envoyer les logs ailleurs.

C'est la première solution que nous choisirons ici. Et pour ce faire, rien de plus simple. Il suffit de surcharger deux méthodes dans le Kernel :

```
+    public function getLogDir()
+    {
+        // When on the lambda only /tmp is writeable
+        if (getenv('LAMBDA_TASK_ROOT') !== false) {
+            return '/tmp/log/';
+        }
+
+        return parent::getLogDir();
+    }
+
+    public function getCacheDir()
+    {
+        // When on the lambda only /tmp is writeable
+        if (getenv('LAMBDA_TASK_ROOT') !== false) {
+            return '/tmp/cache/'.$this->environment;
+        }
+
+        return parent::getCacheDir();
+    }

```

C'est parti, nous ne sommes plus qu'à une commande de pouvoir utiliser notre lambda. 🙌🏻

### Direction : les nuages

Comme promis, voici la dernière commande à exécuter :

```
serverless deploy

```

Et c'est tout !

Serverless va se charger de packager votre application, l'envoyer dans l'infrastructure d'AWS et configurer votre lambda comme il faut. Pour vous simplifier la tâche, il vous affiche également, à la fin, les endpoints sur lesquels votre lambda sera accessible. Vous pouvez donc maintenant ouvrir le premier endpoint (celui sans proxy) dans votre navigateur et commencer à jouer avec votre application.

Alors ? Heureux d'être enfin propriétaire de votre première fonction dans le cloud ?

Si vous souhaitez comprendre un peu plus ce qu'il se passe lors du déploiement de votre lambda, n'hésitez pas à... [consulter la documentation de bref](https://bref.sh/docs/deploy.html#cloudformation-stacks) expliquant un peu plus en détails comment Serverless utilise différents services d'AWS pour uploader le package et configurer la lambda. D'ailleurs, vous constaterez un nouveau dossier nommé `.serverless` à la racine de votre projet. C'est dedans que le framework Serverless construit le package et stocke différents fichiers de configuration. Vous pourrez donc ajouter ce dossier dans votre .gitignore, son contenu étant recréé à chaque déploiement.

Alors évidemment, déployer une telle application avec Symfony dans une lambda n'est probablement pas la solution la plus adaptée. On aurait tout aussi bien pu envoyer un unique script PHP. Mais cet exemple aura au moins eu le mérite de vous montrer comment configurer et déployer une application Symfony dans une lambda Amazon. Si votre application nécessite une base de données ou fournit des fichiers statiques via AWS S3, la lambda sera un peu plus complexe à mettre en place. Mais [encore une fois](https://bref.sh/docs/environment/database.html), Matthieu Napoli a ajouté de [nombreuses documentations](https://bref.sh/docs/environment/custom-domains.html#custom-domains-for-static-files-on-s3) sur comment réaliser cela, donc vous ne devriez pas avoir de mauvaises surprises.

Protips
-------

Avant de conclure cet article, je voudrais vous partager quelques astuces récoltées lors de mes propres expériences ou de mes lectures.

### Ajouter une lambda dans une application existante

Si vous souhaitez ajouter une lambda pour certaines tâches à un projet existant, il est plus simple de faire une application à part dans son propre dossier. Vous pourrez y stocker le composer.json avec les outils dont vous avez besoin, notamment Bref, ainsi que le code à exécuter dans la lambda.

Si votre fonction a besoin de code provenant de votre application, vous pourrez importer votre application en dépendance. Prenons cette arborescence en exemple :

```
project/
    application/
        src/
        composer.json
    lambda/
        index.php
        composer.json

```

Assurez-vous d'abord que le composer.json de votre application contient un nom de package, par exemple « nom-du-projet/application ». Ensuite, vous pouvez utiliser le système de [repository local de composer](https://getcomposer.org/doc/05-repositories.md#path) pour définir des dépendances dont le package se trouve en local. Dans le composer.json de votre lambda, rajoutez :

```
{
    "type": "project",
    "require": {
        "bref/bref": "^0.5.0",
        "nom-du-projet/application": "*@dev"
    },
    "repositories": [
        {
            "type": "path",
            "url": "../application"
        }
    ]
}

```

Après un `composer install`, vous pourrez profiter dans votre lambda du code déjà existant dans votre application. En revanche, pensez à bien exclure les fichiers de votre application qui seront inutiles pour votre lambda :

```
package:
    exclude:
        - vendor/nom-du-projet/application/assets/**
        - vendor/nom-du-projet/application/node_modules/**
        - vendor/nom-du-projet/application/public/**
        - vendor/nom-du-projet/application/tests/**
        - vendor/nom-du-projet/application/var/**
        - vendor/nom-du-projet/application/vendor/**

```

### Appeler une lambda depuis son code PHP

Dans notre exemple, nous avons déployé une lambda de type « application HTTP ». Si le but de notre lambda était de réaliser un traitement particulier, nous aurions pu choisir un runtime de type « function » et l'appeler de manière programmatique. Cela se fait assez facilement en PHP avec le sdk officiel d'AWS :

```
composer require aws/aws-sdk-php

```

```
    use Aws\Lambda\LambdaClient;

    $lambdaClient = new LambdaClient([
        'version' => 'latest',
        'region' => $_SERVER['AWS_REGION],
        'credentials' => [
            'key' => $_SERVER['AWS_KEY'],
            'secret' => $_SERVER['AWS_SECRET_KEY'],
        ],
    ]);
    $awsResult = $lambdaClient->invoke([
        'FunctionName' => $_SERVER['AWS_LAMBDA_FUNCTION_NAME'],
        'InvocationType' => 'RequestResponse',
        'LogType' => 'None',
        'Payload' => json_encode($payload),
    ]);

```

La documentation de Bref présente quelques informations supplémentaires pour [invoquer vos fonctions](https://bref.sh/docs/runtimes/function.html#invocation).

### Performance

Redémarrer la lambda et PHP de zéro entre chaque requête n'est évidemment pas la manière la plus performante d'exécuter notre code. Le temps de boot des lambdas avec les runtimes de Bref tourne aux alentours de 250 ms en moyenne [d'après la documentation](https://bref.sh/docs/environment/performances.html#optimizing-cold-starts). Ce démarrage à froid, ou « cold start » dans la langue de Shakespeare, peut-être optimisé voire supprimé :

Diminuer le nombre de fichiers packagés (grâce à la directive `exclude`, comme expliqué dans l'exemple) permet d'améliorer la vitesse de boot de votre lambda.

AWS attend plusieurs minutes d'inactivité (entre 10 et 60 minutes d'après ce que j'ai pu lire sur internet) avant de couper votre lambda. Vous pouvez donc éviter au maximum les cold starts en faisant en sorte de maintenir votre lambda réveillée (en la pinguant à intervalle régulier par exemple).

### Oublier d'exclure certains fichiers

Si la taille du package est trop grande, le déploiement peut échouer avec le message suivant :

```
An error occurred: ApiLambdaFunction - Unzipped size must be smaller than 146578616 bytes (Service: AWSLambdaInternal; Status Code: 400; Error Code: InvalidParameterValueException; Request ID: 6ccd1416-634a-400a-93e9-aea0237b70be).

```

Cela arrive notamment si vous oubliez d'exclure des fichiers trop volumineux et souvent inutiles, comme du cache, une base de données sqlite, des fichiers CSV, etc. Faites le ménage et/ou ajoutez les chemins à exclure puis retentez le déploiement.

### Surveiller le coût

Devoir enregistrer une carte bleue lors de la création du compte AWS alors que l'on a aucune idée du montant que cela nous coûtera à la fin du mois, et ce malgré le plan gratuit d'Amazon, est la partie qui m'a le plus inquiété quand j'ai commencé à jouer avec les lambdas.

La première chose que j'ai faite a été de définir un budget dans mon compte AWS. J'ai enregistré un montant de 1$ pour être alerté par email dès que le budget est atteint. Et je me suis aussi ajouté un reminder dans Slack tous les lundis pour aller vérifier manuellement, dans la console AWS, que le montant de ma facture ne s'était pas envolé. Je vous l'ai dit que j'étais pas rassuré ? 😅

Au final, AWS fournit par défaut des alertes quand les quotas du plan gratuit atteignent 85%, donc vous devriez être alerté sans avoir besoin d'être aussi parano que moi.

### Éviter les factures inutiles

Avoir une infrastructure qui s'adapte automatiquement au trafic s'avère très pratique. Mais ça peut aussi être une source de surprises dans les factures. Attaque DDOS, erreur de programmation, ces événements peuvent parfois [coûter très cher](https://medium.com/@asankha/lambda-programming-errors-that-could-cost-you-thousands-of-dollars-a-day-265dfac354f).

Quelques petits conseils pour essayer d'éviter les problèmes :

-   surveiller l'évolution du coût de votre lambda ;
-   surveiller le nombre d'invocations de votre lambda ;
-   garder à jour les moyens de contact (email notamment) de votre compte AWS, histoire de toujours recevoir toutes les alertes envoyées par Amazon ;
-   mettre un cloudflare ou protection équivalente devant votre lambda ;
-   limiter le nombre de lambdas qu'il est possible d'exécuter en parallèle ;
-   supprimer la lambda lorsqu'elle n'est plus utile.

Pour conclure
-------------

J'espère vous avoir permis, si vous n'avez encore jamais eu l'occasion de toucher à du FaaS, de découvrir le cloud de manière un peu plus concrète et d'avoir une meilleure idée de son fonctionnement. J'espère également vous avoir montré à quel point il est devenu simple d'utiliser des lambdas en PHP, notamment grâce à Bref et sa documentation plus que complète. 🤓

Enfin, je tiens à remercier Matthieu Napoli pour le super travail fourni, depuis un bon moment, pour démocratiser cette technologie, notamment au sein de la communauté PHP.

Quelques sources utilisées pour cet article et des lectures pour aller plus loin :

-   <https://bref.sh/docs/>
-   <https://dashbird.io/blog/aws-lambda-pricing-model-explained/>
-   <https://www.xtivia.com/compare-faas-paas-saas/>
-   <https://mnapoli.fr/serverless-php-faq/>
-   <https://kinsta.com/fr/blog/php-serverless/>
-   <https://www.theodo.fr/digital-et-strategie/serverless-faas-une-revolution>