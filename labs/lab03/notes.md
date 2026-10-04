Console Experiments

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



Type exercises:

typeof 'hello' - Returned 'string'.     Reason: 'hello' is a string
typeof 42 - Returned 'number'.          Reason: 42 is a number
typeof true - Returned 'boolean'.       Reason: true is a boolean
typeof undefined - Returned 'undefined'. Reason: undefined is one of the primitive datatypes in JavaScript, which is represented by undefined
typeof null - Returned 'object'         Reason: apparently the type tag for objects is 000, and null gets 0x00, so null gets interpreted as an object
typeof [] - Returned 'object'           Reason: an array is an object type, so any specific array is an object
typeof {} - Returned 'object'           Reason: curly braces indicate creation of an object when used in the context of a variable
Note: typeof null returns 'object' — this is a well-known JavaScript quirk, not a feature.




String exercises:

'  hello world  '.trim() - returned 'hello world'   Reason: .trim() removed leading and trailing whitespace

'hello world'.includes('world') - returned true     Reason: .includes() returns a boolean based on if the string given includes the substring or not

'hello world'.toUpperCase() - returned 'HELLO WORLD'    Reason: .toUpperCase() takes the string and returns the same string with all letters in uppercase

'hello world'.replace('world', 'JavaScript') - returned 'hello JavaScript'  Reason: .replace() takes the string given and replaces the *first* instance of the first parameter with the second parameter, regardless of whitespace. You can call .replace again to replace the second instance of the word.

'hello'.length - returned 5     Reason: hello is 5 characters long



Javascript debug exercises

Line 12
Uncaught ReferenceError: nextYeer is not defined
The error was listed at 12.80, so I went to the 12th line, 80th column, which landed on nextYeer inside of the return message. 
I changed nextYeer to nextYear, which was already declared, which fixed the problem. 

Line 16
Uncaught ReferenceError: mesage is not defined
The error in console said 16.13, which I took to mean 16th line, 13th column. This landed on the word mesage inside a function. 
I changed mesage to message, because that was previously declared, which fixed it. 

Line 18 
No error was shown in the console, but strict equality was not used despite the JavaScript saying it was. This was fixed by changing the operator to ===.
I could have changed the words to match the operator, but I chose to do it this way because we've been encouraged to always use ===.
Worth noting that I could see the line the console.log was on, which could let me more easily figure out where the error was coming from.