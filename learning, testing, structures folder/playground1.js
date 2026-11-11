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





// creating an element template inside of a function, that will take a product input and output cards using forEach
function createProductCard(product) {
  const article = document.createElement("article");
  article.classList.add("product-card");

  const heading = document.createElement("h2");
  heading.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `$${product.price.toFixed(2)}`;

  article.append(heading, price);
  return article;
}

const container = document.querySelector("#product-list");
products.forEach(p => container.append(createProductCard(p)));

// using classlist API to manage the classes on an element,
// and then using setAttribute to keep the ARIA consistent
const btn = document.querySelector("#menu-btn");
const nav = document.querySelector("#main-nav");

btn.addEventListener("click", () => {
  nav.classList.toggle("is-open");           // adds if absent, removes if present
  btn.classList.toggle("btn--active");

  const isOpen = nav.classList.contains("is-open");
  btn.setAttribute("aria-expanded", isOpen); // keep ARIA in sync
});

// end of pattern




// the pattern of roving tabindex

// Only the active tab is reachable by Tab; the rest are removed from the tab order.
// tabindex="-1" means "not in the tab order, but still focusable by script".
function setActiveTab(tabs, panels, newIndex) { // takes a tab array?, the content meant to be in each tab, and the index of the one you want open
  tabs.forEach((tab, i) => { // forEach executes a provided function once for each element of an array
                              // parameters in this case are (currentTab, currentTabIndex)
    const selected = i === newIndex; // boolean, true if the desired index === the current index
    tab.setAttribute("aria-selected", String(selected)); // sets the aria-selected value to true if the desired index === the current index, false if not
    tab.tabIndex = selected ? 0 : -1;      // roving tabindex, // tabindex="-1" means "not in the tab order, but still focusable by script".
                                        // essentially, if selected is true, set this tab's index to 0, which allows it to be focused by the Tab key
                                        // if selected is false, set the tab's index to -1, which removes that tab from tab order
                                        // this sets the states that allow for users to use the tab key to change the focus through the page,
                                        // and leave one tab selected while being able to move between tabs with arrow keys and move on with the tab key
    panels[i].hidden = !selected; // hides each panel when the tab is not selected
  });
  tabs[newIndex].focus();                   // move focus with the selection
}

tabList.addEventListener("keydown", (event) => { // the logic for selecting tabs with arrow keys, runs on keydown with focus on any element within tabList
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]')); // .from creates a shallow copy of any object with a length property
                                                                     // in this case, the querySelectorAll returns a NodeList
                                                                     //  of all things in the tabList with role = tab
                                                                     // and Array.from() creates an array from the NodeList
                                                                     // this is done because different things can be done with arrays
  const current = tabs.indexOf(document.activeElement); // gets index (as in, 0, 1, 2, position in array of the active element (which is the one with focus)), or returns -1 if none found
  if (current === -1) return; // does nothing if the active element isn't found inside tabs

  let next = null;
  if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
  if (event.key === "ArrowLeft")  next = (current - 1 + tabs.length) % tabs.length;
  if (event.key === "Home")       next = 0;
  if (event.key === "End")        next = tabs.length - 1;

  if (next !== null) { // because it would be null, skip if none of the key events were triggered 
                       // notably, the event listener/function still triggers, it just doesn't do anything
    event.preventDefault();   // stop the arrow key from scrolling the page
    setActiveTab(tabs, panels, next);
  }
});
// end of roving tabindex pattern