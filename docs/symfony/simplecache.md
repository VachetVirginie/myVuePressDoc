---
sidebar: auto
---
# Utilisation du « Simple Cache »

Depuis sa version 3.1, Symfony dispose d'un [Cache Component](https://symfony.com/doc/current/components/cache.html) permettant comme son nom l'indique de gérer un système de cache assez facilement. Depuis la version 3.3 du framework, une version simplifié est disponible.

C'est un jeu d'enfant de mettre une information en cache, la récupérer et la supprimer

use Symfony\Component\Cache\Simple\FilesystemCache;\
#\
$cache = new FilesystemCache();\
$cache->set('mon.information', 'Je place ce texte en cache'); //mise en cache\
$cache->get('mon.information'); //récupération\
$cache->delete('mon.information'); //suppression

Cela peut être utilisé par exemple pour stocker des paramètres de configuration.\
Afin de permettre à l'utilisateur de notre application de modifier ces paramètres depuis un back-office on les stocke en base de données. Cependant pour ne pas avoir a faire une requête à chaque fois que l'on doit utiliser un des paramètre, on les met en cache.

Voici un cas concret d'utilisation :\
-- Mon utilisateur peut depuis le back-office créer des « Organization » (entité), il leur donne un nom et peux cocher 4 différents bloc d'options possible pour cette « organization ».\
-- J'ai plus tard dans mon application besoin de connaitre la liste des « Organization » ayant telle option.\
Pour des question d'optimisation (moins de requêtes) mais aussi pour des questions pratiques je vais utiliser le système de cache.\
Ci dessous le service « CacheManager » que je vais utiliser :
 ````
namespace AppBundle\Service;

use Doctrine\ORM\EntityManagerInterface;\
use Symfony\Component\Cache\Simple\FilesystemCache;\
use AppBundle\Entity\Organization;

class CacheManager {

    private $em;

    public function __construct(EntityManagerInterface $em) {\
        $this->em = $em;\
    }

    /**\
     * Met à jour les informations en cache.\
     * Stocke un tableau contenant les identifiants des "organization" ouvertes aux différentes options\
     */\
    public function updateOrganizationOptions() {\
        $cache = new FilesystemCache();\
        $entities = $this->em->getRepository(Organization::class)->findAll();\
        $option1 = [];\
        $option2 = [];\
        $option3 = [];\
        $option4 = [];\
        foreach ($entities as $entity) {\
            if ($entity->getOptions1()) {\
                $option1[] = $entity->getId();\
            }\
            if ($entity->getOptions2()) {\
                $option2[] = $entity->getId();\
            }\
            if ($entity->getOptions3()) {\
                $option3[] = $entity->getId();\
            }\
            if ($entity->getOptions4()) {\
                $option4[] = $entity->getId();\
            }\
        }\
        $cache->set('organization.ids.options1', $option1);\
        $cache->set('organization.ids.options2', $option2);\
        $cache->set('organization.ids.options3', $option3);\
        $cache->set('organization.ids.options4', $option4);\
    }

    public static function getOrganizationOptions($num = 1) {\
        $cache = new FilesystemCache();\
        $options = $cache->get('organization.ids.options' . $num);\
        return $options;\
    }

}
 ````


J'utilise ce service pour mettre à jour le cache des options à la création ou la modification d'une « organization ».\
Dans les controllers correspondants c'est fait de la façon suivante :

//traitement classique (si le formulaire posté par l'utilisateur est valide, j'enregistre les données)\
//+\
$CM = $this->get('app.cache.manager');//appel du service\
$CM->updateOrganizationOptions();//mise à jour du cache

N'oubliez pas que si les données peuvent être modifiées depuis plusieurs endroits, vous pouvez utiliser les Event listeners de doctrine pour automatiser le traitement et être sur d'avoir toujours les informations à jour.

Je peux maintenant récupérer ma liste d'organisations ouverte à telle option n'importe ou grâce à ma méthode statique :

CacheManager::getOrganizationOptions(1)

Dans la réalité il s'agissait pour moi de proposer les différents champs correspondants au options dans un formulaire. Formulaire dans lequel on choisissait une organisation dans une liste déroulante, en fonction du choix certaines options apparaissaient donc. Idem pour le contrôle lors de la soumission du formulaire afin de valider l'entité sans passer dans l'organization liée.

