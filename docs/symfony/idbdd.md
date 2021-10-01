
Prendre INT, UUI ou ULID pour un index de base de Données ?
===========================================================

* * * * *

Prendre INT, UUI ou ULID pour un index de base de Données ?
===========================================================

-   Introduction
-   Définition
-   Les valeurs par défaut
-   Problème avec SERIAL
-   Comment UUID résout ces défis ?
-   Problèmes avec l'UUID
-   ULID: le meilleur des deux saveurs ensemble
-   Quand ne pas utiliser ULID?
-   Conclusion

[]  Introduction
----------------------------------------------------------------------------------------------------------------------------

Il existe plusieurs façons de définir les ID ou index incrémentaux dans les bases de données.

La méthode traditionnelle utilise id INT et est incrémenté par le SGBD, mais il existe d'autres moyens, avec leurs avantages et leurs inconvénients. Cela va dépendre des besoins.

[]Définition
-----------------------------------------------------------------------------------------------------------------------------

Le **type de données** le plus courant est pour id est INT. Dans votre gestionnaire de base, vous pouvez le définir comme

`CREATE TABLE table_name(id SERIAL);`

Il existe 3 pseudo-types en série.

-   PETIT SÉRIE: 2 octets (1 à 32 767)
-   EN SÉRIE: 4 octets (1 à 2 147 483 647)
-   BIGSÉRIE: 8 octets (1 à 922,337,2036,854,775,807)\
[UUID](https://fr.wikipedia.org/wiki/Universally_unique_identifier) signifie **Universal Unique Identifier** défini par la [RFC 4122](https://tools.ietf.org/html/rfc4122) et d'autres normes connexes. Les UUID sont des identifiants de 16 octets / 32 chiffres hexadécimaux (avec 4 s pour la séparation) générés par un algorithme qui le rendent unique dans l'univers connu en utilisant le même algorithme. Certains systèmes font référence à l'UUID en tant que **GUID (identificateur global unique)**. Voici quelques exemples de valeurs UUID:

`40e6215d-b5c6-4896-987c-f30f3678f608\
6ecd8c99-4036-403d-bf84-cf8400f67836\
3f333df6-90a4-4fda-8dd3-9485d27cee36`

Vous pouvez voir son hexadécimal 32 bits séparé par des tirets. Pour stocker id en tant que type de données uuid, c'est uuid qui a été introduit dans PostgreSQL 9.4. Il existe plusieurs algorithmes pour le générer. Vous devez également installer certaines extensions telles que *uuid-oospou pgcrypto*. postgreSQL 9.5 recommande d'utiliser *pgcrypto. gen_random_uuid()* .La fonction est utilisée pour générer uuid.

`CREATE EXTENSION pgcrypto;\
CREATE TABLE table_name (\
id UUID PRIMARY KEY DEFAULT gen_random_uuid()\
);`

[ULID](https://fr.wiktionary.org/wiki/ULID) signifie **Identificateur Tri Lexicographique Unique Universel**. Ils sont composés de deux nombres codés en base32; un horodatage UNIX suivi d'un nombre aléatoire.

`01AN4Z07BY 79KA1307SR9X4MV3\
|----------| |----------------|\
Timestamp Randomness\
48bits 80bits`

Pour obtenir cette extension sur PostgreSQL, essayez *pg_ulid* . Il existe également d'autres packages qui peuvent être étudiés.

`>SELECT ulid(); -- 01C1P15MBWYBWDG2WYRG08VCFR`

Le type de données peut être utilisé en binaire ou en texte.

`CREATE EXTENSION *pg_ulid;*\
CREATE TABLE table_name (id binary PRIMARY KEY DEFAULT ulid());`

[]Les valeurs par défaut
-----------------------------------------------------------------------------------------------------------------------------------------------------

Serial / Cela génère des identifiants en séquence par défaut, incrémentales. Par exemple, si vous avez une table `user` insérez des valeurs.

`INSERT INTO users(name) VALUES('Toto');\
INSERT INTO users(id, name) VALUES(DEFAULT, 'Bob');`

Il insérera deux enregistrements avec les valeurs 1 et 2

`id | name\
----+--------\
1 | Alice\
2 | Bob\
(2 rows)`

Maintenant, si nous utilisons **uuid** à la place, cela générera un hexadécimal aléatoire.

`id | name\
---------------------------------------+--------\
0d60a85e-0b90-4482-a14c-108aea2557aa | Alice\
39240e9f-ae09-4e95-9fd0-a712035c8ad7 | Bob\
(2 rows)`

Notez que ces UUID ne sont **pas du texte mais sont des types natifs**.

Vient ensuite ULID qui est un texte ou un binaire

`id | name\
-----------------------------+--------\
01DGTGVPBFE12HMKC0667JSWFM | Alice\
01DGTGXRS35VGTW5KXFN157HCV | Bob`

[] Problème avec SERIAL
-------------------------------------------------------------------------------------------------------------------------------------------------

1.  Lorsque vous utilisez un système distribué dans une solution scalée, vous allez bien sûr rencontrer des problèmes lorsque les mêmes identifiants seront générés par deux instances.
2.  Pour les modèles jeunes, il est pratique mais **peu évolutif**.
3.  Cela peut nécessiter un aller-retour pour une demande d'écriture et les performances sont donc lentes
4.  Un ID est **facile à deviner** pour une ressource donnée, et peut être que celle ci ne lui appartient pas, il faudra revérifier la **sécurité d'accès à la donnée**.
5.  Cela peut également desservir le système, car en créant une ressource, vous pourriez voir le nombre d'éléments dans cette table. En créant un compte utilisateur, vous apercevez `/profile/75`, cela signifie que vous donnez l'information qu'il n'y a QUE 75 entrées dans la base. Cela peut renseigner des concurrents, et/ou être une faille de sécurité.

[]Comment UUID résout ces défis ?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Avec un système distribué, l'algorithme génère un hexadécimal 32 bits aléatoire qui aura une très très faible probabilité de conflit avec une autre instance
2.  Il est évolutif. Ce sont des nombres de 128 bits, généralement exprimés en 32 hexadécimaux
3.  Un aller-retour vers un hit Db peut être évité car l'identifiant peut être déterminé avant la création réelle de l'enregistrement. Cela améliore les performances pour les demandes d'écriture
4.  En raison du **caractère aléatoire**, il est difficile de deviner d'autres identifiants et le nombre maximal d'enregistrements dans le système

[] Problèmes avec l'UUID
--------------------------------------------------------------------------------------------------------------------------------------------------

1.  Cet index n'est pas **triable**, car les chiffres et lettres sont aléatoires. Si vous ne stockez pas la création d'un enregistrement, il est difficile de deviner quel enregistrement est créé en premier

3.  Vous allez devoir effectuer une indexation sur une colonne supplémentaire, et vous perdez l'utilité de cet index, en tout cas pour le tri.

5.  Lorsque vous allez utiliser une LIMIT en SQL ou pour de la pagination, vous allez avoir des soucis. Il est probable qu'il affiche un enregistrement plusieurs fois sur différentes pages, ou même qu'un enregistrement ne soit pas du tout affiché. Il se comporte en fait un peu comme lorsque les enregistrements sont récupérés dans un ordre random

"

[] ULID: le meilleur des deux saveurs ensemble
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Étant donné que la première partie de uuid est un horodatage, il peut être facilement trié
2.  **La deuxième partie aléatoire le rend idéal pour le système distribué sur plusieurs instances**
3.  **Aucune indexation supplémentaire n'est requise** et aucune sortie originale lorsque vous souhaitez utiliser la pagination
4.  Toujours évolutif comme UUID
5.  Aucun coup DB aller-retour n'est requis.
6.  Difficile de deviner, voire impossible les identifiants d'une ressource. (Au moins manuellement)

[]Quand ne pas utiliser **ULID**?
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  Lorsque vous ne souhaitez pas afficher l'horodatage. (Bien qu'encodé)
2.  Le tri peut ne pas fonctionner qu'en quelques millisecondes.

[]Conclusion
------------------------------------------------------------------------------------------------------------------------

En fait, cela depend surtout de vos besoins en termes de développement. La migration d'un système à un autre est faisable donc vous gardez toujours cette possibilité si vous souhaitez changer de système.

**Symfony** quant à lui, a décidé de faire le pas, d'intégrer uuid et ulid au sein de ses types [doctrine](https://symfony.com/doc/current/doctrine.html) dont le composant est [ici](https://symfony.com/doc/current/components/uid.html), et disponible également en [contrainte](https://symfony.com/doc/current/reference/constraints/Ulid.html). Selon vos besoins, **Efficience IT** intègre un système ou un autre, n'hésitez pas à nous [contacter](https://www.itefficience.com/contact) en cas de besoin d'accompagnement ou d'expertise sur ces sujets."