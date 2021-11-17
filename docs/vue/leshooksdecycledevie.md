# Comprendre les hooks de cycle de vie Vue.js

Ce schéma, tiré de [la documentation officielle de Vue.js](https://vuejs.org/v2/guide/instance#Lifecycle-Diagram), représente le cycle de vie de l'instance Vue.js :

![Schéma du cycle de vie de Vue.js](https://imgur.com/XLvznbh.png)

Comprendre les hooks de création (initialisation)
-------------------------------------------------

Les *hooks de création* sont les tous premiers à s'exécuter dans votre composant. Ils vous permettent de réaliser des actions avant même que votre composant n'ait été ajouté au DOM. Contrairement aux autres, les hooks de création sont également exécutés lorsque le rendu est généré côté serveur.

Vous pouvez les utiliser pour configurer certains éléments dans votre composant, que le rendu soit généré côté client ou côté serveur.

À l'intérieur des hooks de création, vous n'aurez pas accès au DOM ou à l'élément de compilation cible (`this.$el`).

### `beforeCreate`

Le hook `beforeCreate` s'exécute au moment même de l'initalisation de votre composant. `data` n'a pas été activé et les `events` n'ont pas encore été configurés :

ExampleComponent.vue

```
<script>
export default {
  beforeCreate() {
    console.log('At this point, events and lifecycle have been initialized.')
  }
}
</script>
```

Dans cet exemple, lorsque le hook `beforeCreate` est exécuté, ce fragment de code consigne le message suivant : `Initialisation des événements et du cycle de vie`.

### `created`

Le hook `created` vous permet d'accéder aux `data` et `events` qui sont actifs. La compilation ou le rendu des modèles et du DOM virtuel n'ont pas encore été déclenchés :

ExampleComponent.vue

```
<template>
  <div ref="example-element">{{ propertyComputed }}</div>
</template>

<script>
export default {
  data() {
    return {
      property: 'Example property.'
    }
  },

  computed: {
    propertyComputed() {
      return this.property
    }
  },

  created() {
    console.log('At this point, this.property is now reactive and propertyComputed will update.')
    this.property = 'Example property updated.'
  }
}
</script>
```

Dans cet exemple, le fragment de code consigne que `property` est une `Example property`. Lorsque le hook `created` est exécuté, le message suivant est enregistré : `this.property est maintenant réactive et propertyComputed sera mise à jour.` Ensuite, la valeur sous `property` est remplacée par `Example property updated`.

Plus tard dans le cycle de vie, `{{propertyComputed }}` indiquera `Example property updated` au lieu de `Example property`.

Au cours de cette étape, vous avez examiné quelques exemples de hooks de création. Vous êtes maintenant prêt à passer à la prochaine étape du cycle de vie, la compilation de hooks.

Comprendre les hooks de compilation (insertion DOM)
---------------------------------------------------

Les *hooks de compilation* sont ceux qui sont généralement les plus utilisés. Ils vous permettent d'accéder à votre composant immédiatement avant et après avoir généré le premier rendu. Cependant, ils ne sont pas exécutés lors du rendu côté serveur.

Vous pouvez utiliser les hooks de compilation pour accéder ou modifier le DOM de votre composant immédiatement avant ou après avoir généré le rendu initial.

N'utilisez pas de hooks de compilation pour récupérer des données sur votre composant lors de son initialisation.

**Remarque :** pour cela, utilisez plutôt `created` (ou `created` et `activated` pour les composants `keep-alive`), surtout si vous avez besoin de ces données pour le rendu côté serveur.

### `beforeMount`

Le hook `beforeMount` s'exécute juste avant l'occurrence du rendu initial et une fois que les fonctions du modèle ou du rendu aient été compilées :

ExampleComponent.vue

```
<script>
export default {
  beforeMount() {
    console.log(`At this point, vm.$el has not been created yet.`)
  }
}
</script>
```

Dans cet exemple, lorsque le hook `beforeMount` est exécuté, ce fragment de code enregistrera le message suivant : `vm.$el n'a pas encore été créé`.

### `mounted`

Le hook `mounted` vous permet d'avoir un total accès au composant réactif, aux modèles et au DOM rendu (via `this.$el`).

Utilisez `mounted` pour modifier le DOM, notamment lors de l'intégration de bibliothèque hors `Vue` :

ExampleComponent.vue

```
<template>
  <div ref="example-element">Example component.</div>
</template>

<script>
export default {
  mounted() {
    console.log(`At this point, vm.$el has been created and el has been replaced.`);
    console.log(this.$el.textContent) // Example component.
  }
}
</script>
```

Dans notre exemple, lorsque le hook `mounted` est exécuté, ce fragment de code consigne le message suivant : `Crée vm.$el pour remplacer el`. Le message Ceci est `un exemple de texte` (`this.$el.textContent`) sera également enregistré.

Au cours de cette section, vous avez exploré les cas d'utilisation de hooks de compilation. À l'étape suivante, vous allez aborder quelques exemples de hooks de mise à jour.

Comprendre les hooks de mise à jour (Diff et Re-render)
-------------------------------------------------------

Les *Updating hooks* se déclenchnt à chaque fois qu'une propriété réactive utilisée par votre composant change ou que quelque chose d'autre vous pousse à le re-render. Ils vous permettent de vous hooker au cycle *watch-compute-render* de votre composant.

Vous pouvez utiliser les hooks de mise à jour pour savoir à quel moment le rendu du composant est de nouveau déclenché, éventuellement en vue d'un débogage ou d'un profilage.

N'utilisez pas la mise à jour de hooks pour déterminer à quel moment une propriété réactive de votre composant change. Utilisez plutôt [computed properties](https://www.digitalocean.com/community/tutorials/vuejs-computed-properties) ou [watchers](https://vuejs.org/v2/api/#watch).

### `beforeUpdate`

Le hook `beforeUpdate` s'exécute une fois que les données de votre composant changent et que le cycle de mise à jour commence, juste avant que le DOM n'ait été patché et n'ait généré un re-render.

Utilisez `beforeUpdate` pour consulter le nouvel état de toute donnée réactive de votre composant avant que le rendu soit effectivement généré :

ExampleComponent.vue

```
<template>
  <div ref="example-element">{{counter}}</div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },

  created() {
    setInterval(() => {
      this.counter++
    }, 1000)
  },

  beforeUpdate() {
    console.log(`At this point, Virtual DOM has not re-rendered or patched yet.`)
    // Logs the counter value every second, before the DOM updates.
    console.log(this.counter)
  }
}
</script>
```

Tout d'abord, sous `counte`r, ce fragment de code enregistrera `0`. Lorsque le hook `created` est exécuté, la `valeur` du counter incrémentera toutes les `1 000` ms. Lorsque le hook `beforeUpdate` est exécuté, ce fragment de code enregistrera le message suivant : `DOM virtuel pas encore été rendu ou patché.` et un numéro sera enregistré sous `counter`.

### `updated`

L'exécution du hook `updated` se fait à chaque fois que les données concernant votre composant sont modifiées et que le DOM déclenche un re-render.

Utilisez `updated` pour accéder au DOM une fois qu'une propriété ait été modifiée :

ExampleComponent.vue

```
<template>
  <div ref="example-element">{{counter}}</div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },

  created() {
    setInterval(() => {
      this.counter++
    }, 1000)
  },

  updated() {
    console.log(`At this point, Virtual DOM has re-rendered and patched.`)
    // Fired every second, should always be true
    console.log(+this.$refs['example-element'].textContent === this.counter)
  }
}
</script>
```

Tout d'abord, sous `counter`, ce fragment de code enregistrera `0`. Lorsque le hook `created` est exécuté, la valeur du `counter` incrémentera toutes les `1 000` ms. Lorsque le hook `updated` est exécuté, ce fragment de code consigne le message suivant : `Nouveau rendu et patch du DOM virtuel`. Et, étant donné que la valeur du rendu est égale à la valeur actuelle, la valeur booléenne de `true` est consignée.

Maintenant que vous en savez davantage sur l'utilisation des hooks de mise à jour, nous pouvons aborder les hooks de destruction.

Comprendre les hooks de destruction (Démontage)
-----------------------------------------------

Les *hooks de destruction* vous permettent d'effectuer des actions lorsque votre composant est détruit. Vous pouvez par exemple procéder à son nettoyage ou à l'envoi d'analyses. Ils se déclenchent au moment où votre composant est détruit et supprimé du DOM.

### `beforeDestroy`

Le déclenchement de `beforeDestroy` se fait juste avant le démontage. Votre composant sera toujours présent et totalement fonctionnel.

Utilisez `beforeDestroy` pour nettoyer des événements ou des abonnements réactifs :

ExampleComponent.vue

```
<script>
export default {
  data() {
    return {
      exampleLeakyProperty: 'This represents a property that will leak memory if not cleaned up.'
    }
  },

  beforeDestroy() {
    console.log(`At this point, watchers, child components, and event listeners have not been teared down yet.`)
    // Perform the teardown procedure for exampleLeakyProperty.
    // (In this case, effectively nothing)
    this.exampleLeakyProperty = null
    delete this.exampleLeakyProperty
  }
}
</script>
```

Ce fragment de code consignera tout d'abord `exampleLeakyProperty`. Lorsque le hook `beforeDestroy` est exécuté, ce fragment de code enregistrera le message suivant : `Les observateurs, composants enfants et écouteurs d'événements n'ont pas encore été éliminés.` Ensuite, `exampleLeakyProperty` est supprimé.

### `destroyed`

Une fois que vous aurez atteint votre hooker `destroyed`, il ne vous restera pratiquement plus rien à faire sur votre composant. Tout ce qui y était rattaché a été détruit.

Utilisez `destroyed` pour procéder à un nettoyage de dernière minute ou signaler à un serveur distant que le composant a été détruit :

ExampleComponent.vue

```
<script>
import ExampleAnalyticsService from './example-analytics-service'

export default {
  destroyed() {
    console.log(`At this point, watchers, child components, and event listeners have been torn down.`)
    console.log(this)
    ExampleAnalyticsService.informService('Component destroyed.')
  }
}
</script>
```

Dans un premier temps, ce fragment de code importera `ExampleAnalyticsService`. Lorsque le hook `beforeDestroy` est exécuté, ce fragment de code consignera le message suivant : `Supprime les observateurs, composants enfant et écouteurs d'événements`. Ce qui reste du composant sera consigné dans la console et `ExampleAnalyticsService` transmettra le message suivant :`Détruit`.

Voilà, vous êtes arrivé à la fin votre révision générale sur les hooks de cycle de vie Vue.js.

Autres hooks
------------

Il existe deux autres hooks : `activated` et `deactivated`. Ils sont dédiés aux composants `keep-alive`, un sujet qui n'entre pas dans le cadre de cet article.

Il vous suffit de savoir qu'ils vous permettent de détecter à quel moment un composant enveloppé dans une balise `<keep-alive></keep-alive>` est activé ou désactivé. Vous pouvez les utiliser pour récupérer les données de votre composant ou gérer les changements d'état, car ils se comportent effectivement comme `created` et `beforeDestroy` sans avoir à reconstruire un composant dans son intégralité.

--