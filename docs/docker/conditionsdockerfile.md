---
sidebar: auto
---

# Logique conditionnelle dans Dockerfile

Parfois, lors de l'exécution d'un Dockerfile, vous devez exécuter une logique conditionnelle basée sur une variable ARG. Cela peut être pratique dans l'instance où vous souhaitez exécuter une version de production ou une version de développement ou que vous devez exécuter une étape supplémentaire pour la production, etc.

```
ARG ENV

RUN if [ "$ENV" = "production" ] ; then yarn client:build:prod ; else yarn client:build ; fi
```

Lorsque vous exécutez ceci, vous devez passer l'argument ENV dans le cadre de votre commande de construction de docker:

```
docker build -t node-image .  --build-arg ENV=production
```

Lisez cette réponse de Stackoverflow à ce sujet [ici](https://translate.google.com/website?sl=auto&tl=fr&u=https://stackoverflow.com/questions/43654656/dockerfile-if-else-condition-with-external-arguments) . Il convient de noter que l'utilisation de la logique conditionnelle dans un Dockerfile force le Dockerfile à être construit à chaque fois alors que normalement, si rien ne changeait, il serait mis en cache. Étant donné que cet argument de construction est dynamique, l'étape de construction de Docker ne peut pas être mise en cache. En bref, l'utilisation de la logique conditionnelle dans votre Dockerfile ralentira la construction.