---
sidebar: auto
---
# Makefile
````
phpunit: ## Run PHPUnit
	docker-compose exec php rm -f database.sqlite
	docker-compose exec php bin/console doctrine:schema:update --force --quiet --env=test
	docker-compose exec php bin/console cache:clear --quiet --env=test
	docker-compose exec php ./vendor/bin/simple-phpunit
````
