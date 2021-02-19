---
sidebar: auto
---
# DBAL Type Array

## [Array types](https://drkbubxzyekcxtfxlangftihdi--www-doctrine-project-org.translate.goog/projects/doctrine-dbal/en/latest/reference/types.html#array-types)

Types that map array data in different variations such as simple arrays, real arrays or JSON format arrays.

## [array](https://drkbubxzyekcxtfxlangftihdi--www-doctrine-project-org.translate.goog/projects/doctrine-dbal/en/latest/reference/types.html#array)

Maps and converts array data based on PHP serialization. If you need to store an exact representation of your array data, you should consider using this type as it uses serialization to represent an exact copy of your array as string in the database. Values retrieved from the database are always converted to PHP's `array` type using deserialization or `null` if no data is present.


This type will always be mapped to the database vendor's `text` type internally as there is no way of storing a PHP array representation natively in the database. Furthermore this type requires an SQL column comment hint so that it can be reverse engineered from the database. Doctrine cannot map back this type properly on vendors not supporting column comments and will fall back to `text` type instead.


## [simple_array](https://drkbubxzyekcxtfxlangftihdi--www-doctrine-project-org.translate.goog/projects/doctrine-dbal/en/latest/reference/types.html#simple-array)

Maps and converts array data based on PHP comma delimited imploding and exploding. If you know that the data to be stored always is a scalar value based one-dimensional array, you should consider using this type as it uses simple PHP imploding and exploding techniques to serialize and deserialize your data. Values retrieved from the database are always converted to PHP's `array` type using comma delimited `explode()` or `null` if no data is present.

This type will always be mapped to the database vendor's `text` type internally as there is no way of storing a PHP array representation natively in the database. Furthermore this type requires an SQL column comment hint so that it can be reverse engineered from the database. Doctrine cannot map back this type properly on vendors not supporting column comments and will fall back to `text` type instead.

You should never rely on a specific PHP type like `boolean`, `integer`, `float` or `null` when retrieving values from the database as the `explode()` deserialization technique used by this type converts every single array item to `string`. This basically means that every array item other than `string` will lose its type awareness.


## [json](https://drkbubxzyekcxtfxlangftihdi--www-doctrine-project-org.translate.goog/projects/doctrine-dbal/en/latest/reference/types.html#json)

Maps and converts array data based on PHP's JSON encoding functions. If you know that the data to be stored always is in a valid UTF-8 encoded JSON format string, you should consider using this type. Values retrieved from the database are always converted to PHP's `array` or `null` types using PHP's `json_decode()` function.

Some vendors have a native JSON type and Doctrine will use it if possible and otherwise silently fall back to the vendor's `text` type to ensure the most efficient storage requirements. If the vendor does not have a native JSON type, this type requires an SQL column comment hint so that it can be reverse engineered from the database. Doctrine cannot map back this type properly on vendors not supporting column comments and will fall back to `text` type instead.

You should never rely on the order of your JSON object keys, as some vendors like MySQL sort the keys of its native JSON type using an internal order which is also subject to change.


## [json_array](https://drkbubxzyekcxtfxlangftihdi--www-doctrine-project-org.translate.goog/projects/doctrine-dbal/en/latest/reference/types.html#json-array)


This type is deprecated since 2.6, you should use `json` instead.


Maps and converts array data based on PHP's JSON encoding functions. If you know that the data to be stored always is in a valid UTF-8 encoded JSON format string, you should consider using this type. Values retrieved from the database are always converted to PHP's `array` type using PHP's `json_decode()` function.


Some vendors have a native JSON type and Doctrine will use it if possible and otherwise silently fall back to the vendor's `text` type to ensure the most efficient storage requirements. If the vendor does not have a native JSON type, this type requires an SQL column comment hint so that it can be reverse engineered from the database. Doctrine cannot map back this type properly on vendors not supporting column comments and will fall back to `text` type instead.
