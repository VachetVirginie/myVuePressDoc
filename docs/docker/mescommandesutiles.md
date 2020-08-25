---
sidebar: auto
---

# mescommandesutiles

## Vider le cache:
````
dc exec php rm -rf var/cache
````

## Creer/modifier entité:
````
dc exec php bin/console make:entity nomEntite
````

## Forcer reinstallation d'un container:
````
docker-compose up -d --force-recreate db
````

## Reinstaller avec maj 
````
docker-compose stop
docker-compose rm
docker-compose pull
docker-compose up -d --build
````

