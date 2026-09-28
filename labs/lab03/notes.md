<!-- a place to write notes -->


<!-- Experiments
 Type coercion:

'5' + 3 - Produced '53'. This is because we started with a string, which made the default operation for + to be concatenation, which then coerced the 3 to become type string. 
'5' - 3 - Produced the number 2. This is because there is no overload for minus, as it only works with numbers, so the string 5 was coerced into a number 5.

'5' == 5 - Produced true. This is because == checks for equivalency with coerceion, and will convert between datatypes when checking. 
'5' === 5 - Produced false, because === checks if they're identical, same definition 

0 == false - Produced true. Reason: 0 and false can be coerced from each other.
0 === false - Produced false. Reason: 0 has a number datatype, while false is a boolean datatype, so they are not identical

Bonus: I tried setting a variable to a boolean (let falseVar = (1<0)) and the console returned undefined, but correctly assigned the boolean false to the variable. 
falseVar does === false. 

null == undefined - Returned true. Reason: both null and undefined represent the absence of a value, and so can be coerced from each other. (Null is intentional emptiness while undefined is unintentional.)
null === undefined - Returned false. Reason: the two are defined (ha) differently, which leads to different behaviors in different circumstances



Types:

typeof 'hello' - Returned 'string'.     Reason: 'hello' is a string
typeof 42 - Returned 'number'.          Reason: 42 is a number
typeof true - Returned 'boolean'.       Reason: true is a boolean
typeof undefined - Returned 'undefined'. Reason: undefined is one of the primitive datatypes in JavaScript, which is represented by undefined
typeof null - Returned 'object'         Reason: apparently the type tag for objects is 000, and null gets 0x00, so null gets interpreted as an object
typeof [] - Returned 'object'           Reason: an array is an object type, so any specific array is an object
typeof {} - Returned 'object'           Reason: curly braces indicate creation of an object when used in the context of a variable
Note: typeof null returns 'object' — this is a well-known JavaScript quirk, not a feature.

Strings:

'  hello world  '.trim()
'hello world'.includes('world')
'hello world'.toUpperCase()
'hello world'.replace('world', 'JavaScript')
'hello'.length
Record all results in lab -->