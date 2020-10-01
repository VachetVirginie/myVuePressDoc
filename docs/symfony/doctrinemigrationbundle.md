---
sidebar: auto
---
# doctrine migration bundle

[Lien vers la doc](https://symfony.com/doc/master/bundles/DoctrineMigrationsBundle/index.html) 

Dans mon cas:

## Modification de l'entité:
```
dc exec php bin/console doctrine:migration:diff 
```
## Migration des modifications enregistrées:
```
dc exec php bin/console doctrine:migration:migrate
```
## Maj de ma bdd:
```
make back-db-reset
```