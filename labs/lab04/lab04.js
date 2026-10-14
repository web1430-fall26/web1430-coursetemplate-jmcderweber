/* Lab 04 – Trail Recommender and Distance Converter */

// ─── Trail data (do not modify) ──────────────────────────────────────────
const trails = [
  { name: 'Lakeside Loop',       distance: 2.5,  hours: 1.5, level: 'beginner' },
  { name: 'Ridgeline Path',      distance: 5,    hours: 3,   level: 'beginner' },
  { name: 'Canyon Crossing',     distance: 8,    hours: 4.5, level: 'intermediate' },
  { name: 'Summit Approach',     distance: 12,   hours: 6,   level: 'intermediate' },
  { name: 'Granite Peak',        distance: 16,   hours: 7,   level: 'advanced' },
  { name: 'Wilderness Circuit',  distance: 20,   hours: 8,   level: 'advanced' },
];

// ─── DOM references ───────────────────────────────────────────────────────
const experienceSelect  = document.getElementById('experience');
const maxDistanceInput  = document.getElementById('max-distance');
const maxHoursInput     = document.getElementById('max-hours');
const findBtn           = document.getElementById('find-btn');
const recommendationDiv = document.getElementById('recommendation');

const incrementInput  = document.getElementById('increment');
const rowCountInput   = document.getElementById('row-count');
const generateBtn     = document.getElementById('generate-btn');
const tableOutputDiv  = document.getElementById('table-output');

// ─── Part 3: Trail recommender functions ─────────────────────────────────

// // Read a form value (always a string — convert numbers with Number())
// const distance = Number(document.querySelector('#distance').value);

// // Run a function when a button is clicked
// const button = document.querySelector('#find-trail-btn');
// button.addEventListener('click', () => {
//   // read inputs, call your functions, render the result
// });

// // Display a result safely (no innerHTML)
// const output = document.querySelector('#recommendation');
// output.textContent = '';                 // clear previous output
// const p = document.createElement('p');   // create an element
// p.textContent = 'Your trail: Lakeside Loop'; // add text to element
// output.append(p);                        // add it to the page

// validateInputs(level, maxDistance, maxHours)
// Returns an error message string if any input is invalid, or null if all valid.
// Rules: level must be 'beginner'|'intermediate'|'advanced'
//        maxDistance must be 1–20
//        maxHours must be 1–8
function validateInputs(level, maxDistance, maxHours) {
  if (level !== 'beginner' 
    && level !== 'intermediate' 
    && level !== 'advanced') { // if input does not match any valid experience level
    return 'Invalid experience level';
  }
  if (maxDistance < 1 
    || maxDistance > 20) { // if less than 1 or greater than 20
    return 'Invalid max distance';
  }
  if (maxHours < 1 
    || maxHours > 8) { // if less than 1 or greater than 8
    return 'Invalid max hours';
  }
  return null; // if no errors were found, return null
}

// findTrail(level, maxDistance, maxHours)
// Returns the first trail matching all three criteria, or null if none match.
function findTrail(level, maxDistance, maxHours) {
  for (const trail of trails) {
    if (trail.level === level // matches level
       && trail.distance <= maxDistance // matches max distance
       && trail.hours <= maxHours) { // matches max hours
      return trail; // loops until it returns, only returning the first trail that matches the criteria
    }
  }
  return null; // returns null if none match
}

// renderRecommendation(trail)
// Updates recommendationDiv.
// If trail is null: "No trail matches your criteria. Try adjusting your distance or time."
// If trail found: show name, distance, hours, and difficulty.
// Use createElement + textContent — no innerHTML.
function renderRecommendation(trail) {
  recommendationDiv.textContent = ''; // clear previous result
  if (trail === null) {
    const p = document.createElement('p');
    p.textContent = 'No trail matches your criteria. Try adjusting your distance or time.';
    recommendationDiv.append(p);
  } else {
    const p = document.createElement('p');
    p.textContent = `Name: ${trail.name}, \nDistance: ${trail.distance} miles, \nHours: ${trail.hours}, \nDifficulty: ${trail.level}`;
    recommendationDiv.append(p);
  }
}

// Button handler
function handleFind() {

  const level = experienceSelect.value;
  const maxDistance = Number(maxDistanceInput.value);
  const maxHours = Number(maxHoursInput.value);

  const error = validateInputs(level, maxDistance, maxHours);
  if (error) {
    recommendationDiv.textContent = error;
    console.log(error);
    return;
  }

  const trail = findTrail(level, maxDistance, maxHours);
  renderRecommendation(trail);
}

findBtn.addEventListener('click', handleFind); 

// ─── Part 4: Distance converter functions ────────────────────────────────

// milesToKm(miles)
// Returns miles converted to kilometers (miles × 1.60934), rounded to 2 decimal places.
function milesToKm(miles) {
  const km = miles * 1.60934;
  return km.toFixed(2);
}

// renderTable(increment, rows)
// Guard clauses: rows must be 1–20; increment must be >= 0.1
// Builds a <table> with columns Miles | Kilometers using createElement.
// Renders into tableOutputDiv.
function renderTable(increment, rows) {
  tableOutputDiv.textContent = ''; // clear previous result, worked even though has children
  if (rows < 1 || rows > 20) {
    tableOutputDiv.textContent = 'Number of rows must be between 1 and 20.';
    return;
  }
  if (increment < 0.1) {
    tableOutputDiv.textContent = 'Miles increment must be at least 0.1.';
    return;
  }

  //table = <table> element
  // thead = table head
  // tbody = table body
  // th = table header cell
  // tr = table row
  // td = table data cell


  // helper function to create a table row with given values and cell type 
  // (and to make it less confusing)
  function createRow(values, cellType) { // values is an array of cell values
    const row = document.createElement('tr'); // create table row element

    for (const value of values) { // loop over array of cell values
      const cell = document.createElement(cellType); // create table cell element based on passed cellType
      cell.textContent = value;
      row.append(cell); // loop finishes row
    }
    return row; // returns finished row
  }

  // create table structure
    const table = document.createElement('table');// create table element 


    const thead = document.createElement('thead'); //tableHead
    const headerRow = createRow(['Miles', 'Kilometers'], 'th'); // table header row
    thead.append(headerRow);
    table.append(thead);

  // body rows
    const tbody = document.createElement('tbody');
    for (let i = 0; i < rows; i++) {
      const miles = increment * (i + 1);
      const km = milesToKm(miles); 
      const row = createRow([miles, km], 'td'); // tableRow
      tbody.append(row);
    }
    table.append(tbody);

    tableOutputDiv.append(table);
}

function handleGenerate(){

  const increment = parseFloat(incrementInput.value);
  const rows      = parseInt(rowCountInput.value, 10);

  if (Number.isNaN(increment) || Number.isNaN(rows)) {
    tableOutputDiv.textContent = 'Please enter valid numbers for increment and rows.';
    return;
  }

  renderTable(increment, rows);
}



generateBtn.addEventListener('click', handleGenerate);
