## v-if vs v-show

v-if est un « vrai » rendu conditionnel car il garantit que les écouteurs d’évènements et les composants enfants à l’intérieur de la structure conditionnelle sont correctement détruits et recréés lors des permutations.

v-if est également paresseux : si la condition est fausse sur le rendu initial, il ne fera rien (la structure conditionnelle sera rendue quand la condition sera vraie pour la première fois).

En comparaison, v-show est beaucoup plus simple. L’élément est toujours rendu indépendamment de la condition initiale, avec juste une simple permutation basée sur du CSS.

D’une manière générale, v-if a des couts à la permutation plus élevés alors que v-show a des couts au rendu initial plus élevés. Donc préférez v-show si vous avez besoin de permuter quelque chose très souvent et préférez v-if si la condition ne change probablement pas à l’exécution.