---
sidebar: auto
---

# mes commandes utiles

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
## Docker-compose up failing because "port is already allocated"

Running ````docker-compose down ```` to clean up containers and networks, then ````docker-compose up```` again and see if that fixes things.
