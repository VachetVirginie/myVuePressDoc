---
sidebar: auto
---
# annotations

## Pagination 

### Activer pagination

````
<?php
// api/src/Entity/Book.php

use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource(attributes={"pagination_items_per_page"=30})
 */
class Book
{
    // ...
}
````

### Desactiver Pagination

````
<?php
// api/src/Entity/Book.php

use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource(attributes={"pagination_enabled"=false})
 */
class Book
{
    // ...
}
````


