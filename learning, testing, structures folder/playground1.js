// let array1 = [true, true, false, true, false];

// let array2 = array1.filter(value => value);
// console.log(array2); // [true, true, true], all the false values are removed


// function classifyGrade(score) {
//     if (typeof score !== 'number' || isNaN(score) || score < 0 || score > 100) { // just an = instead of !== gives SyntaxError: Invalid left-hand side in assignment
//         return 'Invalid';
//     }

//     if (score >= 90) {
//         return 'A';
//     } else if (score >= 80) {
//         return 'B';
//     } else if (score >= 70) {
//         return 'C';
//     } else if (score >= 60) {
//         return 'D';
//     } else {
//         return 'F';
//     }
// }

// let arr = [55, 73, 88, 95, 101, -5];
// for (list of arr) {
//     console.log(`Score: ${list}, Grade: ${classifyGrade(list)}`);
// }


// let testObj = {
//     name: "John Doe",
//     age: 30,
//     isStudent: false
// };

// console.log(testObj);

// delete testObj.age;
// console.log(testObj);


  // // Step 1: Define your data
  // const data = [
  //   { name: "Fahim", age: 25, job: "Software Engineer" },
  //   { name: "Sara", age: 29, job: "Designer" },
  //   { name: "David", age: 31, job: "Manager" }
  // ];

  // // Step 2: Create a table element
  // const table = document.createElement("table");


  // // Step 3: Add headers
  // const headers = ["Name", "Age", "Job"];
  // const headerRow = document.createElement("tr");

  // headers.forEach(text => {
  //   const th = document.createElement("th");
  //   th.textContent = text;
  //   headerRow.appendChild(th);
  // });
  // table.appendChild(headerRow);

  // // Step 4: Add data rows
  // data.forEach(item => {
  //   const row = document.createElement("tr");
  //   Object.values(item).forEach(value => {
  //     const cell = document.createElement("td");
  //     cell.textContent = value;
  //     row.appendChild(cell);
  //   });
  //   table.appendChild(row);
  // });

  // // Step 5: Insert the table into the DOM
  // document.getElementById("table-container").appendChild(table);





  
// const doNotUse = document.getElementById("doNotUse");
// function badFunction(userInput) {
//     doNotUse.innerHTML = userInput; // This is a bad practice and can lead to XSS vulnerabilities, but is for testing purposes only. In a real application, you should sanitize user input before inserting it into the DOM to prevent XSS attacks.

//     // `You entered: ${userInput}`
// } user can call the function from the console and pass in any string, including potentially malicious scripts, which will be executed in the context of the page. This is a security risk and should be avoided in production code.