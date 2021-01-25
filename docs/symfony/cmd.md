---
sidebar: auto
---
# cmd

## install composer packages

if you just did a `git pull`, and are getting weird errors about missing classes, you probably need to do this:

```
composer install
```

## add a new composer package to the project

if you found a package online that you want to use:

```
composer require NAME_OF_PACKAGE_HERE
```

## remove a composer package from the project

```
composer remove NAME_OF_PACKAGE_HERE
```

## create an entity class, or add new columns to an existing one

don't waste your time creating these from scratch. this command is super-easy to use, and even writes all the getters and setters for you:

```
php bin/console make:entity
```

## Migration

```
dc exec php bin/console doctrine:migration:diff
```
```
dc exec php bin/console doctrine:migration:migrate
```

## update database from entity classes

when you're done making changes to entity classes, do this. also: if you just did a `git pull`, and are getting weird DB errors, you probably need to do this:

```
php bin/console doctrine:schema:update --force
```

## create a new controller

it's probably better to copy-paste an existing controller (since it may extend some custom base controller class), but:

```
php bin/console make:controller
```

## create a new command

to make a script you can run via `php bin/console ...`:

```
php bin/console make:command
```

Lancer CMD NGTV

```jsx
php bin/console ngtv:ec1-sessions:duplicate
```

Lancer server

```jsx
symfony server:start
```