### Changements dans les casts de nombres[]

Commençons ce tour des nouveautés en douceur ![:)] .

Lorsque vous passez une chaîne de caractères en paramètre d'une fonction qui attend un nombre, PHP tente de tout convertir en nombre. En PHP 7, si cette chaîne n'était pas convertible, la fonction recevait 0.

Avec PHP 8 si la chaîne de caractère est effectivement un nombre, elle est convertie, sinon vous obtiendrez une exception.

```
function foo(int $i) {

}

foo('2 et autre chose'); // throw TypeError
foo('2'); // fonctionne toujours si vous n'avez pas spécifié le strict types

```

### Les unions de types[]

Clairement l'une des nouvelles fonctionnalités qui me plaît le plus ! Dans les dernières versions de PHP nous avons vu arriver le typage strict, mais lorsqu'on prend plusieurs types potentiels en paramètres il nous faut toujours re-vérifier le type car on ne peut pas réclamer cela à PHP. Dans cette nouvelle version de PHP on pourra donc faire des unions de type et s'éviter cette tâche.

Voici un exemple d'interface fonctionnant avec l'union de types :

```
interface ContainsNumberInterface
{
    public function setNumber(int|float $number);
    public function getNumber(): int|float;
}

```

### Le type mixed[]

C'est un nouveau type qui vient s'ajouter aux types natifs existant dans PHP. Il a fait longtemps débat car d'un côté inutile, puisqu'il n'oblige à rien lors de l'utilisation d'une fonction ou d'un attribut. Mais PHP 8 rajoute ce type. Voyez là l'obligation de tout typer explicitement ![;)](https://zestedesavoir.com/static/smileys/svg/clin.svg) .

```
class Something
{
    public mixed $userData;
}

```

Note: il a été décidé d'utiliser mixed et non pas `any` comme on peut voir dans d'autres langages car la communauté PHP entière s'accorde à utiliser ce wording pour spécifier un "multi-type" en documentation.

### Les expressions match[]

Plus rapide à écrire, mais aussi plus rapide à exécuter qu'un switch, les expressions match ressemblent tout de même grandement à un switch :

-   Elles retournent directement quelque chose
-   Elles font une comparaison stricte contrairement au switch

En voici un exemple illustratif :

```
// En utilisant un switch
switch(8.0) {
  case "8.0":
    $result = "Oh non !";
    break;
  case 8.0:
    $result = "Ce que j'espère";
    break;
}
echo $result; // Affiche "Oh non !"

echo match (8.0) {
    "8.0" => "Oh non !",
    8.0 => "Ce que j'espère",
}; // Affiche "Ce que j'espère"

```

### Les arguments nommés[]

Certaines fonctions ont une longue liste d'arguments optionnels, et devoir spécifier les arguments intermédiaires n'est pas toujours utile ou peut même porter à confusion ! PHP 8 nous propose donc cette nouvelle fonctionnalité : les arguments nommés.

Voici un exemple :

```
<?php
$items = [1, 2, 'foo'];
array_filter(array: $items, callback: function ($item) { return is_int($item); });

```

### Les attributs[]

A partir de maintenant on s'accordera pour dire "propriété" de classe et "attribut" pour ce qui va suivre d'accord ? ![;)](https://zestedesavoir.com/static/smileys/svg/clin.svg)

En PHP on a l'habitude d'avoir des commentaires contenant des annotations. Heureusement l'API de réflexion de PHP nous permet de simplifier le processus de parsing des annotations en commentaires... Mais ça n'était pas assez au goût général, et ça fait d'ailleurs depuis PHP 5.4 (environ) que les discussions sont ouvertes au sujet de faire quelque chose de "plus intégré à PHP". (pour les annotations Symfony et la plupart des frameworks utilisent un package nommé `doctrine/annotations`)

Nous y voici donc, on peut à présent utiliser les **attributs** pour remplacer les annotations. Voyons comment on peut déclarer un attribut.

```
#[Attribute]
class Column
{
    public string $name;

    public function __construct(string $name = null)
    {
        $this->name = $name;
    }
}

```

Voici un exemple d'utilisation de notre attribut. (Bientôt nos entités doctrine ressembleront à cela !)

```
final class User
{
    #[ORM\Id()]
    #[ORM\Column("id")]
    private int $id;
}

```

Et pour finir on utilise l'API de réflexion de PHP:

```
$reflectionClass = new ReflectionClass(User::class);
$attributes = $reflectionClass->getMethods()[0]->getAttributes(Column::class); // ✨

```

Note : Les attributs doivent être supportées par votre librairie, PHP ne fera pas la conversion automatiquement entre annotation et attributs.

#### Normes valeurs par defaut:

| Type   |      Default      | 
|----------|:-------------:|
| string |  '' | $1600 |
| dateTimeInterface |    null   |
| array | [] |
| int | 0 |
| bool | false |

### Nouveautés sur le throw[]

Dans un premier temps, la clause throw est devenue une expression. C'est tout bête, mais ça permet par exemple de rendre le code suivant valide:

```
$value = $nullableValue ?? throw new InvalidArgumentException();

```

Et une petite modification a été faite sur le catch: le nom de variable est maintenant optionnel si vous n'avez pas besoin de cette dernière.

```
try {
    throw new TypeError();
} catch (TypeError) {
    echo 'oups erreur de type';
}

```

### L'opérateur « Null Safe »[]

C'est l'une des fonctionnalités qui m'attire le plus: elle permet de sortir de ce qu'on appelle communément le « [null hell](https://afilina.com/null-hell) ».

Concrètement, vous allez pouvoir remplacer ce code:

```
$country =  null;

if ($session !== null) {
    $user = $session->user;

    if ($user !== null) {
        $address = $user->getAddress();

        if ($address !== null) {
            $country = $address->country;
        }
    }
}

```

Par celui-ci:

```
$country = $session?->user?->getAddress()?->country;

```

N'oubliez cependant pas que moins vous aurez de `null`, mieux vous vous porterez psychologiquement !

### Promotion des propriétés du constructeur[]

Cette fonctionnalité est en réalité une nouvelle façon de déclarer les propriétés de classe: PHP nous permet de les déclarer directement dans le constructeur, cela dans le but d'éviter le code redondant que l'on voit habituellement dans les classes.

Voici un exemple avant la nouvelle fonctionnalité :

```
class User
{
    private string $name;
    private string $email;

    public function __construct(string $name, string $email)
    {
        $this->name = $name;
        $this->email = $email;
    }
}

```

Et après :

```
class User
{
    public function __construct(
        private string $name,
        private string $email
    ) {}
}

```