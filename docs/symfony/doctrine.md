---
sidebar: auto
---
# doctrine

## Annotations

### cascade={"remove"} or cascade={"remove"}

1) ORM level - uses cascade={"remove"} in the association - this is a calculation that is done in the UnitOfWork and does not affect the database structure. When you remove an object, the UnitOfWork will iterate over all objects in the association and remove them.

2) Database level - uses onDelete="CASCADE" on the association's joinColumn - this will add On Delete Cascade to the foreign key column in the database: