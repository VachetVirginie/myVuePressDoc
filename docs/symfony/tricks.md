---
sidebar: auto
---
# tricks.md

## Typer format string

utiliser: (moins gourmand)

````
$matchTimecodeFormated = str_replace('.', "\\\\\\\\\\\\'", (string) round(($fiveSessionEvent->getMatchTimecode()) / 60, 2));

````
Au lieu de :

````
$matchTimecodeFormated = str_replace('.', "\\\\\\\\\\\\'", strval (round(($fiveSessionEvent->getMatchTimecode()) / 60, 2)));

````
