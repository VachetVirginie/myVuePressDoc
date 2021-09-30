---
sidebar: auto
---

# Reduce

### Utiliser le paramètre `valeurInitiale`

```
var amis = [
  { "nom": "Quentin", "livres": ["City Hall", "Harry Potter"]},
  { "nom": "Alice", "livres": ["L'Avare", "Les Fleurs du Mal"]}
]

var tousLivres = amis.reduce(function(prev, curr) {
  return [...prev, ...curr.livres];
}, ["Perceval"]);

// tousLivres = ["Perceval", "City Hall", "Harry Potter",
//               "L'Avare", "Les Fleurs du Mal"]
```