---
sidebar: auto
---
# Upgrade to Vue3

The Vue 3 upgrade guide
=======================

[#vue](https://dev.to/t/vue) [#javascript](https://dev.to/t/javascript) [#tutorial](https://dev.to/t/tutorial)

[![blacksonic profile image](https://res.cloudinary.com/practicaldev/image/fetch/s--0BqAVVOg--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/190881/0b813a97-0195-4150-8ef3-5eabc4290399.jpg) Gábor Soós ](https://dev.to/blacksonic)  18 mai ・*Updated on 4 juin* ・3 min read

### [Byte-sized Vue 3 (2 Part Series)](https://dev.to/blacksonic/series/6507)

[1 The Vue 3 upgrade guide](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4 "Published May 18") [2 You Might Not Need Vuex with Vue 3](https://dev.to/blacksonic/you-might-not-need-vuex-with-vue-3-52e4 "Published Jul 13")

The release of Vue 3 is just around the corner. We can expect a faster, smaller, more maintainable version with a lot of new exciting features. Mostly these are additions and improvements over the existing API.

Nothing is stopping you from starting your new applications with Vue 3. In this article, I'll show you how to get ahead of the curve and start experimenting with the new API by upgrading your application. If you are interested in an upgraded application, take a look at my TodoMVC application written with the Composition API or the playground that includes every new feature.

![GitHub logo](https://res.cloudinary.com/practicaldev/image/fetch/s--vWogaON8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/github-logo-28d89282e0daa1e2496205e2f218a44c755b0dd6536bbadf5ed5a44a7ca54716.svg) [ blacksonic ](https://github.com/blacksonic) / [todomvc-vue-composition-api](https://github.com/blacksonic/todomvc-vue-composition-api)
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### TodoMVC built with Vue 3 Composition Api and Vuex

![GitHub logo](https://res.cloudinary.com/practicaldev/image/fetch/s--vWogaON8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/github-logo-28d89282e0daa1e2496205e2f218a44c755b0dd6536bbadf5ed5a44a7ca54716.svg) [ blacksonic ](https://github.com/blacksonic) / [vue-3-playground](https://github.com/blacksonic/vue-3-playground)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Vue 3 Playground packed with all the new features

### [](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4#using-the-cli)Using the CLI

I highly recommend using the official CLI for Vue projects. Besides development and deployment tooling, it simplifies the upgrade to a one-line command:\
`vue add vue-next`.

The [Vue Next plugin](https://github.com/vuejs/vue-cli-plugin-vue-next) not only upgrades and installs the new dependencies but modifies the code to be compatible with version three.

### [](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4#dependencies)Dependencies

Installing the plugin upgrades the packages `vue`, `vuex`, `vue-router`, `eslint-plugin-vue` and `@vue/test-utils` to the next major version. Also, a new package named `@vue/compiler-sfc` appears among the development dependencies. What is it good for? It compiles the new Vue single file components into runnable Javascript code.

### [](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4#code-modifications)Code modifications

Let's look at what has changed in the code. The first thing you notice is that the main Vue package no longer has a default export.

[![Entrypoint Upgrade](https://res.cloudinary.com/practicaldev/image/fetch/s--HtGBn4Ne--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/nfpl02ofxn7g1lxe8d4j.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--HtGBn4Ne--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/nfpl02ofxn7g1lxe8d4j.jpg)

The named export `createApp` creates a new Vue application as it did with the constructor in Vue 2. The plugin setup moves to the application instance with the `use` method instead of the constructor's parameter. The `$mount` method loses its dollar sign but behaves the same way.

[![Store Upgrade](https://res.cloudinary.com/practicaldev/image/fetch/s--KpCjhpHk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vq79ud1l0gi7q6abavif.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--KpCjhpHk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/vq79ud1l0gi7q6abavif.jpg)

As you have seen with the application, plugins adopt the factory pattern: no more constructor with the `new` keyword. Instead of calling `new Vuex.Store`, the `createStore` factory method is needed. Passing the store's default export as a plugin is no longer possible.

[![Router Upgrade](https://res.cloudinary.com/practicaldev/image/fetch/s--oH03tU2s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/bkc40nif1sqzb5lcf1ze.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--oH03tU2s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/bkc40nif1sqzb5lcf1ze.jpg)

The router plugin follows the same pattern: `new VueRouter` becomes a call to `createRouter`, and the global plugin setup must be left. In the new version, you always have to define the type of history. You can choose from `createWebHashHistory`, `createMemoryHistory` and `createWebHistory`.

And basically, this is it, the application can be started and runs on the new Vue version. Everything with a single bash command. Anything else should work with the old syntax, as the old APIs are still intact.

### [](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4#size-matters)Size matters

If you check the output size of the `build` command, you can notice a slight drop: 43.75 KiB -> 40.57 KiB. It's the result of leaving the default Vue instance in favor of named exports. Build tools like Webpack and Rollup can do tree-shaking (removing unused code) on named exports, but not on default exports.

### [](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4#without-the-cli)Without the CLI

Without the CLI, you have to upgrade `vue-loader` or `rollup-plugin-vue` to the next major version and add the `@vue/compiler-sfc` package. No more magic here, you have to do everything manually. You have to do code modifications also manually, and there is no tool here that searches the codebase and updates the syntax.

### [](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4#online-playground)Online playground

If you don't want to modify your project but interested in trying out the new version, just try [this online playground](https://github.com/blacksonic/vue-3-playground).

### [](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4#summary)Summary

We've reached the end of the modifications that you have to do during the upgrade process. These modifications are done automatically by the Vue CLI. All you have to do now is to start experimenting with all the new features that Vue 3 offers: the new reactivity system, Composition API, Fragments, Teleport and Suspense.

### [Byte-sized Vue 3 (2 Part Series)](https://dev.to/blacksonic/series/6507)

[1 The Vue 3 upgrade guide](https://dev.to/blacksonic/the-vue-3-upgrade-guide-4dc4 "Published May 18") [2 You Might Not Need Vuex with Vue 3](https://dev.to/blacksonic/you-might-not-need-vuex-with-vue-3-52e4 "Published Jul 13")