---
sidebar: auto
---
# Projet Footix

Api pour creer un  site de paris sur des matchs de ligue 1.

1. Generer projet depuis https://github.com/api-platform/api-platform/generate
2. Modifier docker-compose.yml : changement port apiPlatform: 81 au lieu de 80:
    ports:
      - target: 81
        published: 81
        protocol: tcp
3. Lancer 
````
docker-compose up -d 
````
4. -Racine projet: https://localhost/
   -Api: https://localhost:8443/
   -Admin: https://localhost/admin#/greetings

5. Creation premiere entite
````
docker-compose exec php bin/console make:entity --api-resource
````
6. MAj bdd
````docker-compose exec php bin/console doctrine:schema:update --force
````

7. Ajout Alice Fixtures
````
docker-compose exec php composer require --dev alice
````

8. Creation Fixture Teams

9. Remplissage de la base
````
docker-compose exec php bin/console hautelook:fixtures:load
````

10. Creation Entite match

11. Creation MakeFile pour gagner du temps
````

start: ## Start project
	# Running in detached mode.
	docker-compose up -d --remove-orphans --no-recreate
	# Start crons.
	docker-compose exec php crond
	# Start Mercure subscribers
	docker-compose exec -d php bin/console ngtv:mercure:subscribe

stop: ## Stop project
	docker-compose stop

add-fixtures: ## reset bdd and add fixtures
	docker-compose exec php bin/console hautelook:fixtures:load -n --purge-with-truncate

delcache: ## clear cache
	docker-compose exec php rm -rf var/cache

db-reset: ## update bdd
	docker-compose exec php bin/console doctrine:schema:update --force

add-entity:
	docker-compose exec php bin/console make:entity --api-resource

````


12. Creation Bet entity et modification des entitées User et Match pour ajouter les paris.

13. Ajout des fixtures pour pouvoir tester

14. Front dans client en NextJs pour administrer simplement

