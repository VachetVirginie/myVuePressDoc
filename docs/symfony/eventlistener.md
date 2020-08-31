---
sidebar: auto
---
# Automatiser des actions avec les « Event listeners » de doctrine

Le framework Symfony couplé à l'ORM doctrine permet de créer des « Event Listeners », c'est à dire connaitre dés qu'il y'a un événement (création/modification/suppression) sur une entité. C'est un outil très intéressant pour automatiser des actions quand certaines propriétés d'une entité sont mis à jour.

Prenons un exemple concret : Dans les semaines précédentes, nous avons vu comment [récupérer les coordonnées d'une adresse grâce à l'API google map](https://numa-bord.com/miniblog/php-google-map-api-recuperer-coordonees-gps-depuis-adresse-format-humain/). Afin de limiter les appels à l'API google map (payants si un certain quota et dépassé) nous allons enregistrer ces coordonnées en base de données pour pouvoir les réutiliser directement. Il nous faut cependant les enregistrer/mettre à jour à chaque fois qu'une adresse est crée ou modifiée. C'est ici que nous faisons intervenir les Event Listener.

Commençons par configurer nos listeners dans les services (fichiers services.yml du dossier /app/config/) de symfony.
````
services:\
   #...\
    #LISTENER DOCTRINE#\
    app.listener.doctrineevent:\
        class: AppBundle\EventListener\DoctrineEvent\
        tags:\
            - { name: doctrine.event_listener, event: prePersist, lazy: true }\
            - { name: doctrine.event_listener, event: preUpdate, lazy: true }
````


La configuration indique que nous allons écouter les événements « PrePersist » et « PreUpdate ». Ce qui permettra d'effectuer notre action lors de la création d'une adresse et lors de sa modification. Créons la classe qui va gérer tout ça. Comme indiqué il s'agit du fichier : AppBundle\EventListener\DoctrineEvent

Pour appréhender la suite, consultez les commentaires dans le code
````
namespace AppBundle\EventListener;

use Doctrine\Common\EventSubscriber;\
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;\
//les adresses de nos utilisateur sont stockés dans une entité "Contact"\
use AppBundle\Entity\Contact;

class DoctrineEvent implements EventSubscriber {

    public function getSubscribedEvents() {\
        return [array](http://www.php.net/array)('prePersist', 'preUpdate');//les événements écoutés\
    }

    public function prePersist(LifecycleEventArgs $args) {\
        $entity = $args->getEntity();\
        //Si c'est bien une entité Contact qui va être "persisté"\
        if ($entity instanceof Contact) {\
            $entity->updateGmapData();//on met à jour les coordonnées via l'appel à google map\
        }\
    }

    public function preUpdate(LifecycleEventArgs $args) {\
        $entity = $args->getEntity();\
        $changeset = $args->getEntityManager()->getUnitOfWork()->getEntityChangeSet($entity);\
        //Si c'est bien une entité Contact qui va être modifié\
        if ($entity instanceof Contact) {\
            //Si il y'a eu une mise a jour sur les propriétés en relation avec l'adresse (ici "address", "city" et "postalCode")\
            if ([array_key_exists](http://www.php.net/array_key_exists)("address", $changeset) || [array_key_exists](http://www.php.net/array_key_exists)("city", $changeset) || [array_key_exists](http://www.php.net/array_key_exists)("postalCode", $changeset)) {\
                $entity->updateGmapData();//on met à jour les coordonnées via l'appel à google map\
            }\
        }\
    }

}
````

De cette manière nos coordonnées seront toujours à jour. Il manque pour que l'exemple soit complet la fonction « updateGmapData() » de notre entité Contact. Cela ne concerne pas le sujet des Event Listener, mais je vous en met un exemple qui utilise bien sur la fonction « geocodeAddress() » détaillé [ici](https://numa-bord.com/miniblog/php-google-map-api-recuperer-coordonees-gps-depuis-adresse-format-humain/)
````
    public function updateGmapData() {\
        $data = \AppBundle\Utils\GmapApi::geocodeAddress($this->getAddress() . ' ' . $this->getZipcode() . ' ' . $this->getCity());\
        $this->setGmapLat($data['lat']);\
        $this->setGmapLng($data['lng']);\
        $this->setGmapAddress($data['address']);\
        $this->setGmapPostalCode($data['postal_code']);\
        $this->setGmapCity($data['city']);\
        $this->setGmapDepartment($data['department']);\
        $this->setGmapRegion($data['region']);\
        $this->setGmapCountry($data['country']);\
    }
````
