![alt text](https://pbs.twimg.com/media/FABiNC7VIAM-ttr?format=png&name=900x900)

ES6 Array methods
=================

Some new array methods are introduced in [ES6](https://www.javatpoint.com/es6), such as **Array.of(), Array.from(),** and many more.

The array methods introduced in ES6 are tabulated below.

| S.no. | Methods | Description | JavaScript Version |
| **1.** | [Array.from()](https://www.javatpoint.com/es6-array-methods#from) | It converts array-like values and iterable values into arrays. | ECMAScript 6 |
| **2.** | [Array.of()](https://www.javatpoint.com/es6-array-methods#of) | It creates an instance from a variable number of arguments instead of the number of arguments or type of arguments. | ECMAScript 6 |
| **3.** | [Array.prototype.copyWithin()](https://www.javatpoint.com/es6-array-methods#copyWithin) | It copies the part of an array to a different location within the same array. | ECMAScript 6 |
| **4.** | [Array.prototype.find()](https://www.javatpoint.com/es6-array-methods#find) | It finds a value from an array, based on the specific criteria that are passed to this method. | ECMAScript 6 |
| **5.** | [Array.prototype.findIndex()](https://www.javatpoint.com/es6-array-methods#findIndex) | The Array.prototype.findIndex() returns the index of the first element of the given array that satisfies the given condition. | ECMAScript 6 |
| **6.** | [Array.prototype.entries()](https://www.javatpoint.com/es6-array-methods#entries) | It returns an array iterator object, which can be used to loop through keys and values of arrays. | ECMAScript 6 |
| **7.** | [Array.prototype.keys()](https://www.javatpoint.com/es6-array-methods#keys) | It returns an array iterator object along with the keys of the array. | ECMAScript 6 |
| **8.** | [Array.prototype.values()](https://www.javatpoint.com/es6-array-methods#values) | it provides the value of each key. | ECMAScript 6 |
| **9.** | [Array.prototype.fill()](https://www.javatpoint.com/es6-array-methods#fill) | It fills the specified array elements with a static value | ECMAScript 6 |

Let us understand these new array methods.

Array.from()
------------

The general function of this method is to enable new array creation from an array-like object. It converts array-like values and iterable values (such as **set** and **map**) into arrays.

**Syntax**

1.  Array.from(object, mapFunction, thisValue)  

Let's understand the parameter values of this function.

**object:** This parameter value is always required. It is the object to convert to an array.

**mapFunction:** It is optional. It is a map function to call on each item of the array.

**thisValue:** It is also optional. It is a value to use as **this** when executing the **mapFunction**.

**Example**

1.  let name = Array.from('javaTpoint')  

3.  console.log(name)  

**Output**

[
  'j', 'a', 'v', 'a',
  'T', 'p', 'o', 'i',
  'n', 't'
]

Array.of()
----------

In ES5, when a single numeric value gets passed in the array constructor, then it will create an array of that size. **Array.of()** is a new way of creating an array which fixes this behavior of ES5.

By using this method, if you are creating an array only with a single numeric value, then it will create an array only with that value instead of creating the array of that size.

**Example**

1.  let name = Array.of(42)  

3.  console.log(name)  
4.  console.log(name.length)  

**Output**

[ 42 ]
1

Array.prototype.copyWithin()
----------------------------

It is an interesting method that is added to the library of array methods in ES6. This method copies the part of an array to a different location within the same array.

It returns the modified array without any modification in its length.

#### Note: Instead of adding more items to the array, this method only overwrites the elements of the original array.

**Syntax**

1.  array.copyWithin(target, start, end)  

Let's understand the parameters of this method.

**target:** It is always required. It is the index position to copy the elements.

**start:** It is an optional parameter. It refers to the index position to start copying the elements. Its default value is 0. If the value of this parameter is negative, then start will be counted from the end.

**end:** It is also an optional parameter. It refers to the index position to stop copying the elements. Its default value is the length of the array.

**Example**

Let's understand the example of this method with various possibilities.

1.  const num = [1,2,3,4,5,6,7,8,9,10];  
2.  const num1 = [1,2,3,4,5,6,7,8,9,10];  
3.  const num2 = [1,2,3,4,5,6,7,8,9,10];  
4.  console.log(num.copyWithin(1,3,5));  
5.  console.log(num1.copyWithin(1,3)); //omitting the parameter end  
6.  console.log(num2.copyWithin(1)); //omitting the parameters start and end  

**Output**

[
  1, 4, 5, 4,  5,
  6, 7, 8, 9, 10
]
[
  1, 4,  5, 6,  7,
  8, 9, 10, 9, 10
]
[
  1, 1, 2, 3, 4,
  5, 6, 7, 8, 9
]

Array.prototype.find()
----------------------

It is another new [function of ES6](https://www.javatpoint.com/es6-functions). It finds a value from an array, based on the specific criteria that are passed to this method. It returns the first element value that satisfies the given condition.

**Syntax**

1.  array.find(callback(currentValue, index, arr),thisValue)  

Let's understand the parameters of this method.

**callback:** It represents the function that executes every element.

**currentValue:**I t is the required parameter. It is the value of the current element.

**index:** it is an optional parameter. It is the array index of the current element.

**arr:** It is also an optional parameter. It is the array on which the find() operated.

**thisValue:** It is optional. It is a value that is used as **this** while using callback.

**Example**

1.  var arr=[5,22,19,25,34];    
2.  var result=arr.find(x=>x>20);    
3.  console.log(result);  

**Output**

22

#### Note: ES6 find() method is not similar to the ES5 filter() method because the filter() method always returns an array of matches (return multiple matches), but find() method always returns the actual statement.

Array.prototype.findIndex()
---------------------------

The Array.prototype.findIndex() method returns the index of the first element of the given array that satisfies the given condition. If no element satisfies the condition, then it returns -1.

**Syntax**

1.  array.findIndex(callback(value,index,arr),thisArg)     

**Example**

1.  var arr=[5,22,19,25,34];    
2.  var result=arr.findIndex(x=>x>20);    
3.  console.log(result)  

**Output**

1

Array.prototype.entries()
-------------------------

This method returns an array iterator object, which can be used to loop through keys and values of arrays.

Entries will return an array of arrays, in which every child array is an array of [index, value].

**Syntax**

1.  array.entries()  

**Example**

1.  var colours = ["Red", "Yellow", "Blue", "Black"];  
2.  var show = colours.entries();  

4.  for (i of show) {  
5.  console.log(i);  
6.  }  

**Output**

[ 0, 'Red' ]
[ 1, 'Yellow' ]
[ 2, 'Blue' ]
[ 3, 'Black' ]

In above example, we can also use the spread operator instead of for...of loop which will give you same result.

1.  var colours = ["Red", "Yellow", "Blue", "Black"];  
2.  var show = colours.entries();  
3.  console.log(...show);  

**Output**

[ 0, 'Red' ] [ 1, 'Yellow' ] [ 2, 'Blue' ] [ 3, 'Black' ]

Array.prototype.keys()
----------------------

This method works similarly to the **Array.entries() method**. As its name implies, it is used to return an array iterator object along with the keys of the array.

**Syntax**

1.  array.keys()  

**Example**

1.  var colours = ["Red", "Yellow", "Blue", "Black"];  
2.  var show = colours.keys();  
3.  console.log(...show);  

**Output**

0 1 2 3

Array.prototype.values()
------------------------

This method is similar to **Array.keys()** and **Array.entries()** except that it provides the value of each key.

**Syntax**

1.  array.values()  

**Example**

1.  var colours = ["Red", "Yellow", "Blue", "Black"];  
2.  var show = colours.values();  
3.  console.log(...show);  

**Output**

Red Yellow Blue Black

Array.prototype.fill()
----------------------

This method fills the specified array elements with a static value. The value can be used to fill a part of an array or to fill the entire array. It modifies the original array.

You can specify the position of the start and end the filling. If not specified, then all elements will be filled.

**Syntax**

1.  array.fill(value, start, end)  

**Parameter Values**

**value:** It is a static value to fill the array. It is always required.

**start:** It is the index to start filling the array. It is optional, and its default value is 0.

**end:** It is the index to stop filling the array. It is also optional, and its default value is the length of the array.

**Example**

1.  var colours = ["Red", "Yellow", "Blue", "Black"];  
2.  var show = colours.fill("Green",2,4);  
3.  console.log(...show);  

**Output**

Red Yellow Green Green

JavaScript Array Methods
------------------------

| S.no. | Methods | Description | JavaScript Version |
| **1.** | [concat()](https://www.javatpoint.com/javascript-array-concat-method) | This method returns a new array object which contains two or more merged arrays. | ECMAScript Version 1 |
| **2.** | [join()](https://www.javatpoint.com/javascript-array-join-method) | This method joins the array elements as a string. |
| **3.** | [pop()](https://www.javatpoint.com/javascript-array-pop-method) | This method is used to remove and return the last element of an array. |
| **4.** | [push()](https://www.javatpoint.com/javascript-array-push-method) | The push() adds one or more elements at the end of an array. |
| **5.** | [reverse()](https://www.javatpoint.com/javascript-array-reverse-method) | This method reverses the elements of the given array. |
| **6.** | [shift()](https://www.javatpoint.com/javascript-array-shift-method) | This method is used to remove and return the first element of an array. |
| **7.** | [slice()](https://www.javatpoint.com/javascript-array-slice-method) | This method returns a new array that contains a copy of the part of the given array. |
| **8.** | [sort()](https://www.javatpoint.com/javascript-array-sort-method) | This method returns the element of the given array in sorted order. |
| **9.** | toString() | This method returns the strings with all array elements separated by commas. |
| **10.** | [unshift()](https://www.javatpoint.com/javascript-array-unshift-method) | The unshift() adds one or more elements at the starting of the given array. |
| **11.** | [splice()](https://www.javatpoint.com/javascript-array-splice-method) | This method adds/removes the elements to/from the given array. |
| **12.** | [every()](https://www.javatpoint.com/javascript-array-every-method) | This method is used to determine whether all the elements of an array satisfy the provided function conditions. | ECMAScript version 5 |
| **13.** | [filter()](https://www.javatpoint.com/javascript-array-filter-method) | This method returns the new array, which contains the elements that pass the provided function conditions. |
| **14.** | [forEach()](https://www.javatpoint.com/javascript-array-foreach-method) | This method invokes the provided function once for each element of an array. |
| **15.** | isArray() | This method determines whether an object is an array or not. It returns true if the object is an array and returns false if not. |
| **16.** | [indexOf()](https://www.javatpoint.com/javascript-array-indexof-method) | It searches the specified element in the given array and returns the index of the first match. |
| **17.** | [lastIndexOf()](https://www.javatpoint.com/javascript-array-lastindexof-method) | It searches the specified element in the given array and returns the index of the last match. |
| **18.** | [map()](https://www.javatpoint.com/javascript-array-map-method) | It calls the specified function for every array element and returns the new array |
| **19.** | reduce() | This method reduces the array to a single value. |
| **20.** | some() | This method returns a Boolean value. Returns true if an array element passes the test else it returns false. | ECMAScript version 3 |

* * * * *