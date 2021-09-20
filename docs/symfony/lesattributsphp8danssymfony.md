Les attributs PHP 8 dans Symfony
================================

Utilisation des attributs PHP 8 à la place des annotations.

1.  Les attributs PHP 8
2.  Annotation vs. Attributs
3.  Dans Symfony
4.  Les contraintes de validation
5.  Doctrine
6.  Conclusion

## Les attributs PHP 8
---------------------------------------------------------------------------------------------------------

Avec sa 8ème version, PHP a introduit une nouveauté assez attendue : [les attributs](https://www.php.net/manual/fr/language.attributes.overview.php).

Cette fonctionnalité permet de définir des métadonnées dans votre code. Ces méta données peuvent ensuite être lues grâce à l'[API de Reflection](https://www.php.net/manual/fr/book.reflection.php) de PHP.

Concrêtement, **les attributs répondent aux mêmes besoins et s'utilisent globalement de la même façon que les annotations**, mais en natif.

## Annotation vs. Attributs
------------------------------------------------------------------------------------------------------------------

**Quelles sont donc les différences entre les annotations et les attributs ?**

Les annotations commencent par `@` et se place dans un docblock. [Un parser écrit en PHP](https://www.doctrine-project.org/projects/doctrine-annotations/en/1.10/index.html) lit ces annotations en parsant le fichier `.php` pour en extraire les méta données.

```
use App\MetaData\Foobar;

class Foo
{
  /**
   * @Foobar
   */
  private string $foobar
}
```

Les attributs ont une syntaxe un peu différente mais s'utilisent de la même façon au détail près qu'il s'agit d'une **fonctionnalité native de PHP**. Il n'y a donc pas besoin de parser tiers, les attributs sont interprétés par PHP en même temps que le reste du code.

```
use App\MetaData\Foobar;

class Foo
{
  #[Foobar]
  private string $foobar
}
```

## Dans Symfony
-------------------------------------------------------------------------------------------

Dans un projet Symfony, il y a plusieurs endroits où vous pouvez avoir à écrire des annotations. Vous pouvez les utilisez pour [déclarer une route](https://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/routing.html), pour configurer [la conversion de paramètres](https://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/converters.html), pour décrire une [règle de sécurité](https://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/security.html) ou pour configurer [des contraintes de validations](https://symfony.com/doc/current/validation.html) par exemple. Si vous utilisez [Doctrine](https://www.doctrine-project.org/) vous pouvez également les utiliser pour déclarer votre mapping d'ORM.

Et bien il est désormais possible **d'utiliser des attributs à la place des annotations** pour faire tout cela, ou presque.

De façon générale, dans Symfony, il est assez aisé de migrer des annotations vers les attributs car souvent **les classes utilisées pour décrire les annotations sont les mêmes que pour les attributs**.

Certain outils comme [Rector permettent de migrer automatiquement les annotations vers des attributs](https://getrector.org/blog/2020/11/30/smooth-upgrade-to-php-8-in-diffs#12-symfony-annotations-to-attributes).

## Dans les contrôleurs

Dans les contrôleurs, globalement y a pas grand chose qui change, vous pouvez utiliser les annotations existantes en attributs avec quasiment la même syntaxe :

```
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
  #[Route('/', methods: ['GET'], name: "homepage")]
  public function homepage()
  {
  }

  #[Route('/foobar/{foo_id}/{bar_id}')]
  #[ParamConverter('foo', options: ['mapping' => ['foo_id' => 'id']])]
  #[ParamConverter('bar', options: ['mapping' => ['bar_id' => 'id']])]
  public function foobar(Foo $foo, Bar $bar)
  {
  }

  #[Route('/article/{article_slug}')]
  #[Entity('article', expr: 'repository.findOneBySlug(article_slug)')]
  public function article(Article $article)
  {
  }

  #[IsGranted('ROLE_ADMIN')]
  public function admin()
  {
  }

  #[Security("is_granted('ROLE_ADMIN') and is_granted('ROLE_SUPER_ADMIN')")]
  public function dashboard()
  {
  }
}
```

Pour plus de détails, reportez vous aux différentes documentations qui intêgrent désormais, en plus des exemples d'anotations, leurs équivalents avec les attributs.

![Les attributs PHP dans Symfony](https://www.elao.com/images/posts/2021/php-attributes-symfony/symfony-attributes-doc.png "Les attributs PHP dans Symfony")

## Les contraintes de validation
-----------------------------------------------------------------------------------------------------------------------------

Comme pour le reste des annotations fournies par Symfony, vous pouvez réutiliser la plupart des contraintes de validations en attributs :

```
use Symfony\Component\Validator\Constraints as Assert;

class Foobar
{
  #[Assert\NotBlank]
  #[Assert\Type('string')]
  #[Assert\Length(min: 2, max: 40)]
  private string $name;
}
```

Ça se gâte lorsque vous souhaitez utiliser des contraintes de validations imbriquées comme avec [AtLeastOneOf](https://symfony.com/doc/current/reference/constraints/AtLeastOneOf.html), [All](https://symfony.com/doc/current/reference/constraints/All.html) ou [Collection](https://symfony.com/doc/current/reference/constraints/Collection.html) par exemple.

```
use Symfony\Component\Validator\Constraints as Assert;

class Foobar
{
  /**
   * @Assert\All({
   *   @Assert\NotBlank,
   *   @Assert\Length(min=3)
   * })
   */
  protected $things = [];

  /**
   * @Assert\Collection(fields={
   *   "email"={
   *     @Assert\NotBlank,
   *     @Assert\Email
   *   },
   *   "description"={
   *     @Assert\NotBlank,
   *     @Assert\Length(min=10, max=255, message="Lorem ipsum")
   *   }
   * })
   */
  protected $contact;
}
```

En effet, **les attributs PHP ne peuvent pas s'imbriquer**, il n'est donc pas possible de reproduire cette configuration avec les attributs.

[Une issue est ouverte sur le GitHub de Symfony](https://github.com/symfony/symfony/issues/38503) sur ce sujet. La conclusion est qu'il faut **attendre une évolution des attributs dans une prochaine version de PHP** pour pouvoir instancier des objets dans les attributs et utiliser une syntaxe de ce style :

```
use Symfony\Component\Validator\Constraints as Assert;

class Foobar
{
  #[Assert\Collection(fields: [
    'email' => [
      new Assert\NotBlank,
      new Assert\Email,
    ],
    'description' => [
      new Assert\NotBlank,
      new Assert\Length(min: 10, max: 255, message: "Lorem ipsum")
    ]
  ]]
  protected $contact;
}
```

En attendant, la solution la plus simple pour ce genre de cas est de créer une contrainte custom. Ceci a été rendu très simple depuis l'ajout de la contrainte [`Compound`](https://symfony.com/doc/current/reference/constraints/Compound.html).

En PHP, pas de limitation, vous pouvez imbriquer les contraintes comme vous le souhaitez :

```
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraints as Assert\Assert;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class Contact extends Compound
{
  protected function getConstraints(array $options): array
  {
    return [
      new Assert\Collection([
        'fields' => [
          'email' => [
            new Assert\NotBlank(),
            new Assert\Email(),
          ],
          'description' => [
            new Assert\NotBlank(),
            new Assert\Length(['min' => 10, 'max' => 255, 'message' => "Lorem ipsum"]),
          ],
        ],
      ]),
    ];
  }
}
```

Attention à bien configurer votre contrainte en tant qu'attribute `#[\Attribute()]` et la bonne combinaison de constantes.

Vous pouvez ensuite ajouter votre contrainte en tant qu'attribut :

```
use App\Validator\Constraints;

class Foobar
{
  #[Constraints/Contact]
  protected $contact;
}
```

Cette solution, bien que nécessitant de créer une classe, vous permet de regrouper vos contraintes dans un ensemble réutilisable. Si vous vous essayez au DDD c'est une solution intéressante car elle permet de lier un concept métier à ce groupe de contraintes.

## Doctrine
-----------------------------------------------------------------------------------

Plus récemment est sortie [Doctrine 2.9](https://www.doctrine-project.org/2021/05/24/orm2.9.html) proposant le mapping via les attributs.

```
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping AS ORM;

#[ORM\Entity(repositoryClass: PostRepository::class)]
class Foobar
{
  #[ORM\Column(type: Types::INTEGER)]
  #[ORM\Id, ORM\GeneratedValue(strategy: 'AUTO')]
  private ?int $id;

  #[ORM\Column(type: Types::BOOLEAN)]
  private bool $active = false;

  #[ORM\Column(type: Types::SIMPLE_ARRAY)]
  private array $contents = [];

  #[ORM\ManyToOne(targetEntity: User::class)]
  public $owner;
}
```

Comme Symfony, Doctrine réutilise les mêmes classes que pour leur annotations pour leur attributs.

Doctrine fait également face à l'impossibilité d'imbriquer les attributs comme cela était fait avec les annotations `@JoinTable` ou `@JoinColumns` mais a résolu cela en créant de nouveaux attributs à placer au même niveau.

Avec les annotations (imbriquées) :

```
class Post
{
  /**
   * @ManyToMany(targetEntity="Tag")
   * @JoinTable(name="post_tags",
   *   joinColumns={
   *     @JoinColumn(name="post_id", referencedColumnName="id")
   *   },
   *   inverseJoinColumns={
   *     @JoinColumn(name="tag_id", referencedColumnName="id")
   *   }
   * )
   */
   public Collection $tags;
}
```

Avec les attributs (au même niveau) :

```
class Post
{
  #[ORM\ManyToMany(targetEntity: Tag::class)]
  #[ORM\JoinTable(name: "post_tags")]
  #[ORM\JoinColumn(name: "post_id", referencedColumnName: "id")]
  #[ORM\InverseJoinColumn(name: "tag_id", referencedColumnName: "id")]
  public Collection $tags;
}
```

## Conclusion
---------------------------------------------------------------------------------------

Les attributs offrent une nouvelle alternative aux annotations. Natifs, ils sont plus rapides et ne nécessitent pas de code tier pour être interprété.