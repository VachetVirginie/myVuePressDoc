# What is <=> (the 'Spaceship' Operator) in PHP 7? 

The `<=>` ("Spaceship") operator will offer combined comparison in that it will :

```
Return 0 if values on either side are equal
Return 1 if the value on the left is greater
Return -1 if the value on the right is greater

```

The rules used by the combined comparison operator are the same as the currently used comparison operators by PHP viz. `<`, `<=`, `==`, `>=` and `>`. Those who are from Perl or Ruby programming background may already be familiar with this new operator proposed for PHP7.

```
   //Comparing Integers

    echo 1 <=> 1; //output  0
    echo 3 <=> 4; //output -1
    echo 4 <=> 3; //output  1

    //String Comparison

    echo "x" <=> "x"; //output  0
    echo "x" <=> "y"; //output -1
    echo "y" <=> "x"; //output  1

```