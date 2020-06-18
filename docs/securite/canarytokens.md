---
sidebar: auto
---
# canarytokens

Canary Tokens -- Un outil pour savoir si on vous espionne
========================================================

[@Korben  ---  11 mai 2016](https://korben.info/author/korben)

Êtes-vous espionné ? Quelqu'un lit-il vos emails ? Êtes-vous certain que personne d'autre que vous n'accède à votre Dropbox ? Comment être sûr que personne ne consulte les documents que vous stockez sur votre ordinateur ?

Pas simple !

Et pourtant, il existe une solution : **[Canary Tokens](http://canarytokens.org/generate)**.

Pour ceux qui ne connaitraient pas encore le concept du canari, je vous l'explique en quelques mots. Un canari est un marqueur (un lien, un mot, un token, une phrase, une image...etc.) que vous mettez quelque part sur la toile et auquel vous ne touchez plus sauf si vous êtes compromis d'une manière ou d'une autre.

Imaginons par exemple que je vous propose de télécharger et utiliser un outil de chiffrement de mon cru. Vous avez confiance en cet outil, mais si quelqu'un me force à y mettre une backdoor, vous ne le saurez pas, car j'aurai probablement signé un papier qui m'oblige à me taire à ce sujet. Ça se passe surtout comme ça aux États-Unis comme on l'a vu dans l'affaire Lavabit et bien d'autres.

Mais j'avais prévu le coup... J'avais mis en place un canari sur l'une des pages de mon site qui disait par exemple : « Ma couleur préférée est le jaune ». Ça faisait des années que cette phrase n'avait pas bougé, la plupart des gens autour de moi connaissent l'existence de ce canari, et lorsque mon outil a été compromis, j'ai alors pris soin de supprimer ou modifier cette phrase anodine.

Ceux qui surveillent ce canari sont alors informés qu'il y a un souci. De mon côté, je n'ai rien communiqué, mais le message a quand même réussi à passer.

Voilà en gros ce qu'est un Canari. Un moyen d'alerter les gens quand on ne peut pas le faire.

Dans le cas du service Canary Tokens, c'est un peu différent. Vous entrez votre adresse email, un titre à votre canari et le site vous génère un token (identifiant unique) que vous pouvez alors placer sous la forme d'un lien dans un de vos emails, ou alors récupérer sous la forme de fichiers (Word, PDF) ....

[![Screenshot 2016-05-11 09.08.40](https://korben.info/app/uploads/2016/05/screenshot-2016-05-11-09.08.40.jpg)](https://korben.info/app/uploads/2016/05/screenshot-2016-05-11-09.08.40.jpg)

...qui lorsqu'ils seront ouverts, vous enverrons directement un message d'alerte dans votre boite mail.

[![Screenshot 2016-05-11 09.12.07](https://korben.info/app/uploads/2016/05/screenshot-2016-05-11-09.12.07-650x302.png)](https://korben.info/app/uploads/2016/05/screenshot-2016-05-11-09.12.07.png)

Vous pouvez aussi l'utiliser comme marqueur DNS ou MYSQL, ainsi en cas de lookup dans votre réseau ou d'un update, select, insert ou delete à un certain endroit de votre base de données, vous recevrez une alerte.

[![Screenshot 2016-05-11 09.27.38](https://korben.info/app/uploads/2016/05/screenshot-2016-05-11-09.27.38-650x822.jpg)](https://korben.info/app/uploads/2016/05/screenshot-2016-05-11-09.27.38.jpg)

Même chose si quelqu'un parcours vos partages réseau sans autorisation avec un répertoire spécialement conçu pour vous alerter s'il est accédé depuis une machine Windows (grâce à un desktop.ini piégé).

Bref, ce n'est pas spécialement nouveau comme concept, mais c'est top pour les plus paranos ou ceux qui ont des soupçons. Évidemment, le point faible de ce truc, c'est l'URL du canari. Si canarytokens.com est bloqué par votre espion, les alertes ne se déclencheront pas.

Par contre, la bonne nouvelle c'est que vous pouvez vous même héberger le script de CanaryTokens sur votre propre serveur grâce [à cette image Docker](https://github.com/thinkst/canarytokens-docker) (ou carrément les [sources](https://github.com/thinkst/canarytokens)). Ainsi vous aurez votre propre sous domaine ou domaine réservé à vos Canaris Tokens pour surprendre plus facilement d'éventuels curieux.

Une explication technique plus détaillée sur Canary Tokens [est dispo ici](http://blog.thinkst.com/p/canarytokensorg-quick-free-detection.html).