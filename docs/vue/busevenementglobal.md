### introduction

Le modèle de bus d'événements / publication-abonnement est un moyen de faire communiquer entre elles des sections non liées de votre application.

Le [système d'événements utilisé dans les composants Vue](https://www-digitalocean-com.translate.goog/community/tutorials/vuejs-events?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=nui) peut être utilisé dans un modèle de bus d'événements / publication-abonnement.

**Remarque :** ce didacticiel est spécifique à Vue 2. Dans Vue 3, [`$on`, `$off`, et `$once`ont été supprimés](https://translate.google.com/website?sl=auto&tl=fr&nui=1&u=https://v3.vuejs.org/guide/migration/events-api.html%23_3-x-update) . Les bibliothèques externes qui fournissent cette fonctionnalité sont [recommandées](https://translate.google.com/website?sl=auto&tl=fr&nui=1&u=https://v3.vuejs.org/guide/migration/events-api.html%23migration-strategy) .

Dans cet article, vous appliquerez le puissant bus d'événements intégré de Vue.

Conditions préalables
---------------------

Pour terminer ce tutoriel, vous aurez besoin de :

-   Node.js installé localement, ce que vous pouvez faire en suivant [Comment installer Node.js et créer un environnement de développement local](https://www-digitalocean-com.translate.goog/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=nui) .
-   Une certaine familiarité avec la [configuration d'un projet Vue.js](https://translate.google.com/website?sl=auto&tl=fr&nui=1&u=https://vuejs.org/v2/guide/installation.html) et l' [utilisation des composants Vue.js](https://translate.google.com/website?sl=auto&tl=fr&nui=1&u=https://vuejs.org/v2/guide/%23Composing-with-Components) peut être bénéfique.

Ce didacticiel a été vérifié avec Node v15.3.0, `npm`v6.14.9 et `vue`v2.6.11.

Étape 1 - Configuration du projet
---------------------------------

Pour les besoins de ce didacticiel, vous allez construire à partir d'un projet Vue par défaut généré avec `@vue/cli`.

```

 npx @vue/cli create vue-event-bus-example --default

```

Cela configurera un nouveau projet Vue avec les configurations par défaut : `Vue 2`, `babel`, `eslint`.

Accédez au répertoire du projet nouvellement créé :

```

 cd vue-event-bus-example

```

Vous devrez créer le bus d'événements et l'exporter quelque part afin que d'autres modules et composants puissent l'utiliser. Tout d'abord, créez un nouveau fichier. Importez la bibliothèque Vue. Ensuite, exportez-en une instance.

src/event-bus.js

```
import Vue from 'vue';
export const EventBus = new Vue();
```

Pour ce tutoriel, l'instance a été définie sur la variable `EventBus`.

Ce que vous obtenez essentiellement est un composant entièrement découplé du DOM ou du reste de votre application. Tout ce qui existe dessus, ce sont ses méthodes d'instance.

Maintenant que vous avez créé le bus d'événements, vous devez l'importer dans vos composants et appeler les mêmes méthodes que vous utiliseriez si vous passiez des messages entre les composants parent et enfant.

Ensuite, appliquons `EventBus.$emit()`.

Étape 2 - Envoi d'événements
----------------------------

Considérez un scénario avec un composant qui notifie à l'ensemble de l'application le nombre de fois où il a été cliqué chaque fois que quelqu'un clique dessus.

**Remarque :** cet exemple utilise ici un [composant à fichier unique](https://translate.google.com/website?sl=auto&tl=fr&nui=1&u=https://vuejs.org/v2/guide/single-file-components.html) , mais vous pouvez utiliser la méthode de création de composants que vous souhaitez.

Voici comment vous procéderiez pour implémenter cela en utilisant`EventBus.$emit(channel: string, payload1: any, ...)` :

src/components/ClickCountButton.vue

```
<template>
  <button @click="emitGlobalClickEvent()">{{ clickCount }}</button>
</template>

<script>
import { EventBus } from '@/event-bus';

export default {
  data() {
    return {
      clickCount: 0
    }
  },

  methods: {
    emitGlobalClickEvent() {
      this.clickCount++;
      EventBus.$emit('clicked', this.clickCount);
    }
  }
}
</script>
```

Ce code produit un bouton. Cliquer sur le bouton enverrait l'événement sur un canal ( `clicked`) avec une charge utile ( `clickCount`).

Modifiez `App.vue`pour utiliser ce composant.

src/App.vue

```
<template>
  <div id="app">
    <ClickCountButton></ClickCountButton>
  </div>
</template>

<script>
import ClickCountButton from './components/ClickCountButton'

export default {
  name: 'App',
  components: {
    ClickCountButton
  }
}
</script>
```

Ensuite, appliquons `EventBus.$on`.

Étape 3 - Réception d'événements
--------------------------------

Désormais, toute autre partie de votre application peut importer le bus d'événements et écouter sur le `clicked`canal à l'aide de `EventBus.$on(channel: string, callback(payload1,...))`.

Appliquez ceci à votre application en modifiant `App.vue`:

src/App.vue

```
<script>
import { EventBus } from './event-bus';
import ClickCountButton from './components/ClickCountButton'

export default {
  name: 'App',
  components: {
    ClickCountButton
  }
}

const clickHandler = function(clickCount) {
  console.log(`The button has been clicked ${clickCount} times!`)
}

EventBus.$on('clicked', clickHandler);
</script>
```

Ce code crée un écouteur d'événement `clicked`et enregistre un message sur la console avec le nombre de fois où le bouton a été cliqué.

**Remarque :** si vous souhaitez uniquement écouter la première émission d'un événement, vous pouvez utiliser `EventBus.$once(channel: string, callback(payload1,...))`.

Ensuite, appliquons `EventBus.$off`.

Étape 4 - Suppression des écouteurs d'événement
-----------------------------------------------

Vous pouvez désinscrire le gestionnaire du `clicked`canal en utilisant `EventBus.$off(channel: string, callback(payload1,...))`.

Appliquez ceci à votre application en modifiant `App.vue`:

src/App.vue

```
<script>
import { EventBus } from './event-bus';
import ClickCountButton from './components/ClickCountButton'

export default {
  name: 'App',
  components: {
    ClickCountButton
  }
}

const clickHandler = function(clickCount) {
  console.log(`The button has been clicked ${clickCount} times!`)
}

EventBus.$on('clicked', clickHandler);

EventBus.$off('clicked', clickHandler);
</script>
```

En fournissant un événement et un rappel, `EventBus.$off`ne supprimera que l'écouteur pour ce rappel spécifique.

**Remarque :** vous pouvez également supprimer tous les écouteurs pour un événement particulier en utilisant `EventBus.$off('clicked')`sans argument de rappel.

Et si vous avez vraiment besoin de supprimer chaque écouteur de `EventBus`, quel que soit le canal, vous pouvez appeler `EventBus.$off()`sans aucun argument.

Maintenant, vous avez utilisé `.$emit`, `.$on`, et `.$off`.

Conclusion
----------

Dans ce didacticiel, vous avez utilisé le puissant bus d'événements intégré de Vue pour écouter un `clicked`événement et enregistrer un message avec le nombre de clics. Ceci a été réalisé en utilisant `.$emit`, `.$on`, et `.$off`.