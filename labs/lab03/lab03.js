// Lab 03 – Console Exercises and Small Programs
// Implement each function below. Do not delete the test calls at the bottom.

// ─── Exercise 1: Greeting ─────────────────────────────────────────────────
// Returns "Hello, [name]! Welcome to WEB 1430."
// If name is empty or only whitespace, returns "Hello, stranger!"

function greet(name) {
  if (name.trim() === '') {
    return 'Hello, stranger!';
  }
  return `Hello, ${name}! Welcome to WEB 1430.`
}

console.log(greet('Jordan'));   // Expected: "Hello, Jordan! Welcome to WEB 1430."
console.log(greet('  '));       // Expected: "Hello, stranger!"
console.log(greet(''));         // Expected: "Hello, stranger!"

// ─── Exercise 2: Celsius to Fahrenheit ───────────────────────────────────
// Formula: (celsius * 9/5) + 32
// Returns a string formatted to one decimal place: "72.5°F"
// Hint: number.toFixed(1) returns a string with one decimal place.

function toFahrenheit(celsius) {
  return ((celsius* 9/5) + 32).toFixed(1)
}

console.log(toFahrenheit(0));     // Expected: "32.0°F"
console.log(toFahrenheit(100));   // Expected: "212.0°F"
console.log(toFahrenheit(-40));   // Expected: "-40.0°F"

// ─── Exercise 3: Password strength ───────────────────────────────────────
// Returns "strong" if length >= 12
// Returns "medium" if length is 8–11
// Returns "weak" if length < 8
// Returns "invalid" if password is not a string or is empty

function checkPassword(password) {
  if (typeof password !== 'string' || password.trim() === '') {
    return 'invalid';
  }
  const len = password.length;
  switch (true) {
    case (len >= 12): 
      return 'strong';      
      break;

    case (8 < len && len <= 11): 
      return 'medium';      
      break;

    case len < 8: 
      return 'weak';      
      break;

    default:
      return 'bad input';
      break;
  }
} // probably could have been done better

console.log(checkPassword('abc'));               // Expected: "weak"
console.log(checkPassword('MyPass123'));         // Expected: "medium" 
console.log(checkPassword('MyLongP@ssword!'));   // Expected: "strong"
console.log(checkPassword(''));                  // Expected: "invalid"
console.log(checkPassword(12345));               // Expected: "invalid"

// ─── Exercise 4: Initials ─────────────────────────────────────────────────
// Accepts a full name string, returns the initials in uppercase with dots.
// "Jordan Alex Smith" → "J.A.S."
// Handle extra spaces gracefully.
// Hint: .trim().split(' ') — (use and make sure to) filter out empty strings from double spaces.

function getInitials(fullName) {
  const nameParts = fullName.trim().split(' '); // Split the string into an array of parts by spaces, and remove whitespace from the beginning and end of the string./
  // console.log(nameParts);

  const namePartsNoEmpty = nameParts.filter(part => part !== ''); // Filter out empty strings from an array by taking every array part and keeping if it is not empty
                                                               // Process:
                                                               // Filter() is used on arrays. 
                                                               // It examines each part of the array it is given in order, and passes that into the function it is given.
                                                               // The arrow function takes that input as a parameter on the left side,
                                                               // and uses that parameter in the right side of the expression.
                                                               // The right side of the arrow function returns if there is no return after it. 
                                                               // This one returns true if the part is not empty, false if it is empty. 
                                                               // The filter method deletes any parts of the array that return false, and keeps any parts that return true.
                                                               // filter() then returns a new array with only the non-empty parts.
  // console.log(namePartsNoEmpty);

  let initials= namePartsNoEmpty.map(part => part[0].toUpperCase()) // Get the first letter of every part of the array and convert to uppercase
                                                                    // Process:
                                                                    // map() is used on arrays. 
                                                                    // It follows the same process as filter() in that it examines each part of the array it is given in order, and passes that into the function it is given.
                                                                    // This one takes the first letter of what's passed in, converts to uppercase, and returns that letter.
                                                                    // map() then returns a new array with the returned values from the function, which is the first letter of every part of the name in uppercase.
  // console.log(initials);

  // const variables cannot be reassigned, so I had to use let above to reassign it like I did below. I could have used let at the beginning and reused the variable for each (re)assignment, but I didn't since this was for practice. 

  initials = initials.join('.'); // Join the array into a string with dots between each letter
  initials = initials + '.'; // Add a dot to the end of the string

 // There is a shortcut way to do this with a single line of code, but since I'm a beginner, I wanted to list out the steps to better understand what was happening.
 // here is the shortcut: 
 // return fullName.trim().split(' ').filter(part => part !== '').map(part => part[0].toUpperCase()).join('.') + '.'; (thanks AI)
 // 
 // it looks like if you just join the methods together, it will return the final value without needing to store it in a variable, but it might be best to at least test the code by storing the value in a variable first to make sure it works before shortening it.
 // tested shortcut, and it works

  // 3 different approaches for the complete function:
  // 1. assign a new const variable for each step, returning the final variable at the end
  // 2. reassign the same let variable for each step, returning the final variable at the end
  // 3. chain the methods together, returning the final value directly
  // this third way won't work for every function you want to write, but will probably work if you are just using built-in methods on a single variable. 

  return initials;
}

console.log(getInitials('Jordan Smith'));          // Expected: "J.S."
console.log(getInitials('Maria Elena Vargas'));    // Expected: "M.E.V."
console.log(getInitials('  Sam   Lee  '));         // Expected: "S.L."

