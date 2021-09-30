JavaScript Numeric Separator
============================

**Summary**: in this tutorial, you'll how to use the JavaScript numeric separator to make the numeric literals more readable.

Introduction to the JavaScript numeric separator
------------------------------------------------

The numeric separator allows you to create a visual separation between groups of digits by using underscores (_) as separators.

For example, the following number is very difficult to read especially when it contains long digit repetitions:

`const budget = 1000000000;`

Code language: JavaScript (javascript)

Is this a billion or a hundred millions?

The numeric separator fixes this readablity issue as follows:

`const budget = 1_000_000_000;`

Code language: JavaScript (javascript)

As you can see, the number is now very easy interpret.

JavaScript allows you to use numeric separators for both integers and floating-point. For example:

`let amount = 120_201_123.05; // 120,201,123.05
let expense = 123_4500; // 123.45
let fee = 12345_00; // 12,345`

Code language: JavaScript (javascript)

Note that in JavaScript, all number are floating-point.

Also, you can use the numeric separators for factional and exponent parts. For example:

`let amount = 0.000_001; // 1 millionth`

Code language: JavaScript (javascript)

It's important to notice that you can use the numeric separator for BigInt literal, binary literal, octal literal, and hex literal. For example:

`// BigInt
const max = 9_223_372_036_854_775_807n;

// binary
let nibbles = 0b1011_0101_0101;

// octal
let val = 0o1234_5670;

// hex
let message = 0xD0_E0_F0;`

Code language: JavaScript (javascript)

Summary
-------

-   Use underscores (_) as the numeric separators to create a visual separation between group of digits.