# Faciliter la gestion des droits d'accès avec les Voters
===========================================================================================

Dans beaucoup de projets où une gestion de droits d'accès est nécessaire, les rôles et contrôles d'accès définis dans le fichier « security.yml » peuvent être suffisants.\
Par exemple, les administrateurs ont le rôle `ROLE_ADMIN`, et les utilisateurs ont le rôle `ROLE_USER`.

Mais dès lors que l'on souhaite affiner un peu plus le contrôle des droits d'accès, ce système devient vite limité.

Prenons l'exemple d'un site qui permet à ses membres enregistrés de publier des articles. Nous avons une entité « Article » qui a une relation vers notre entité User « author ».\
Le comportement que l'on voudrait mettre en place fonctionnerait ainsi: chaque membre peut éditer ou supprimer ses propres articles, uniquement les siens, et les administrateurs ont, eux, accès à ces actions pour tous les articles.

Nous ne pouvons pas vérifier le simple rôle `ROLE_USER` lors du contrôle d'accès, cela autoriserait tous les membres à éditer tous les articles.\
Une solution serait vérifier le propriétaire de l'article dans toutes les actions concernées, mais cela place plus de logique dans les contrôleurs, et du code répété.

Pour implémenter ce contrôle d'accès, nous allons plutôt utiliser le système de Voters de Symfony2. Nous allons utiliser deux nouveau rôles: `ROLE_ARTICLE_EDIT` pour le droit d'édition, et `ROLE_ARTICLE_DELETE` pour la suppression. Le seul code consacré au contrôle des droits dans nos actions devrait être un simple `isGranted`:

    // dans l'action d'édition
    if (false === $securityContext->isGranted('ROLE_ARTICLE_EDIT', $article) {
        throw new AccessDeniedHttpException();
    }

    // dans l'action de suppression
    if (false === $securityContext->isGranted('ROLE_ARTICLE_DELETE', $article) {
        throw new AccessDeniedHttpException();
    }

Commençons par donner systèmatiquement ces droits aux administrateurs en éditant « security.yml »:

    security:
        role_hierarchy:
            ROLE_ADMIN:
                - ROLE_USER
                [...]
                - ROLE_ARTICLE_EDIT
                - ROLE_ARTICLE_DELETE

Pour comprendre ce que nous allons maintenant faire, une première petite explication.\
Un Voter est un service qui sera appelé par la couche de sécurité de Symfony au moment où l'on vérifiera des droits d'accès. A l'issue de son exécution, le Voter peut renvoyer une réponse parmis trois possibilités:

-   `ACCESS_GRANTED` s'il autorise l'accès,
-   `ACCESS_DENIED` s'il refuse l'accès,
-   ou enfin `ACCESS_ABSTAIN` s'il reste neutre.

La politique de sécurité par défaut (c'est configurable) de Symfony veut qu'un accès soit donné à un utilisateur si au moins un voteur renvoie `ACCESS_GRANTED`.

Nous voulons donc que notre voteur renvoie `ACCESS_GRANTED` lorsque l'utilisateur connecté est bien l'auteur de l'article auquel il tente d'accèder, `ACCESS_DENIED` s'il n'en est pas l'auteur, et qu'il s'abstienne de voter avec `ACCESS_ABSTAIN` si les droits testés ne le concernent pas.

Pour le cas des administrateurs, Symfony utilise en interne un `RoleHierarchyVoter` qui traite la hiérarchie de tous les rôles commençant par « `ROLE_` » dans la section `role_hierarchy` du « security.yml ». Dans notre cas, ce voter donnera donc automatiquement `ACCESS_GRANTED` pour nos deux rôles à tous les utilisateurs qui possèdent `ROLE_ADMIN`.

Le code est assez simple:

namespace MyProject\Bundle\MyBundle\Security;

use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class OwnerVoter implements VoterInterface
{
    // Cette méthode permet de définir pour quels rôles le voteur doit être
    // appelé, nous définissons ici que ce voteur sera appelé seulement sur
    // les rôles qui commencent par 'ROLE_ARTICLE_'
    public function supportsAttribute($attribute)
    {
        return 1 === preg_match('/^ROLE_ARTICLE_/', $attribute);
    }

    // Cette méthode est utilisée pour vérifier la classe de l'utilisateur,
    // ce qui ne nous concerne pas dans notre exemple
    public function supportsClass($class)
    {
        return true;
    }

    // La méthode principale qui doit retourner le vote
    public function vote(TokenInterface $token, $object, array $attributes)
    {
        // Par défaut, nous n'intervenons pas dans la décision de vote
        $vote = VoterInterface::ACCESS_ABSTAIN;

        // Nous vérifions tous les rôles à tester...
        foreach ($attributes as $attribute) {
            // ... et nous ignorons ceux qui ne nous concernent pas
            if (false === $this->supportsAttribute($attribute)) {
                continue;
            }

            // pour les rôles qui nous concernent, nous enverrons par défaut
            // un refus, à moins que l'utilisateur soit propriétaire de
            // l'article
            $user = $token->getUser();
            $vote = VoterInterface::ACCESS_DENIED;

            // $object est l'objet passé en paramètre lors de l'appel de
            // "isGranted" dans notre action, c'est donc notre article
            if ($object->getAuthor()->getId() === $user->getId()) {
                $vote = VoterInterface::ACCESS_GRANTED;
            }
        }

        return $vote;
    }
}

C'est tout pour le code de notre voteur ! Il faut maintenant le déclarer dans nos services:

    services:
        owner_voter:
            class: MyProject\Bundle\MyBundle\Security\OwnerVoter
            public: false
            tags:
                - { name: security.voter }

Et voilà ! Nos actions restent propres, et nous avons une vérification automatique sur la propriété des articles qui sera très facile à réutiliser ailleurs dans notre projet.\
Par exemple, si nous voulons ajouter un système de publication, nous voudrons qu'un article pas encore publié ne soit visible que par son auteur. Dans ce cas nous n'aurons qu'à créer par exemple un `ROLE_ARTICLE_PRIVATE_VIEW`, le donner à `ROLE_ADMIN` dans « security.yml », et notre voteur fera automatiquement la vérification pour les utilisateurs membres.