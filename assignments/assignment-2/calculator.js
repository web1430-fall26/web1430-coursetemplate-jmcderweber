
const billInput = document.querySelector('#BillAmount');
const peopleInput = document.querySelector('#PeopleNumber');
const tipInput = document.querySelector('#TipPercentage');
const submitButton = document.querySelector('button[type="button"]');



function validateInputs(bill, people, tip) {
        // inputs come in as a string, are converted for each number check

    billInput.removeAttribute('aria-invalid');       // remove at the start so that all attributes are removed before any return                                    
    billInput.removeAttribute('aria-describedby');

    peopleInput.removeAttribute('aria-invalid');
    peopleInput.removeAttribute('aria-describedby');

    tipInput.removeAttribute('aria-invalid');
    tipInput.removeAttribute('aria-describedby');

        
    if (bill.trim() === ""){
        billInput.setAttribute('aria-invalid', 'true');
        billInput.setAttribute('aria-describedby', '#result');
        return `Bill amount is required`;
    }
    if (Number(bill) <= 0) {
        billInput.setAttribute('aria-invalid', 'true'); // sets the aria-invalid attribute to tell screen readers the input is invalid
        billInput.setAttribute('aria-describedby', '#result');
        return `Bill amount must be greater than 0`;
    }
    
    if (people.trim() === "") {
        peopleInput.setAttribute('aria-invalid', 'true');
        peopleInput.setAttribute('aria-describedby', '#result');
        return `Number of people is required`;
    }
    if (!Number.isInteger(Number(people))) {
        peopleInput.setAttribute('aria-invalid', 'true');
        peopleInput.setAttribute('aria-describedby', '#result');
        return `Number of people must be an integer`;
    }
    if (Number(people) <= 0){
        peopleInput.setAttribute('aria-invalid', 'true');
        peopleInput.setAttribute('aria-describedby', '#result');
        return `Number of people must be positive`;
    }


    if (tip.trim() === "") {
        tipInput.setAttribute('aria-invalid', 'true');
        tipInput.setAttribute('aria-describedby', '#result');
        return `Tip percentage is required`;
    }
    
    if (Number(tip) < 0) {
        tipInput.setAttribute('aria-invalid', 'true');
        tipInput.setAttribute('aria-describedby', '#result');
        return `Tip percentage cannot be negative`;
    }

    if (Number(tip) >= 100) {
        tipInput.setAttribute('aria-invalid', 'true');
        tipInput.setAttribute('aria-describedby', '#result');
        return `You'd be crazy to tip 100% or more`;
    }

    return null;
}

function calculateTotal(billInp, peopleInp, tipInp) {    
    const bill = Number(billInp.value);
    const people = Number(peopleInp.value);
    const tip = Number(tipInp.value) * bill / 100;

    const total = bill + tip;
    const perPerson = total / people;
    return { total, perPerson };
}

function renderResult(resultText, validation) {
    const result = document.querySelector('#result');
    result.textContent = '';  // clear previous result

    if (validation) {
        // if (validation[0] === 'B') {
        //     result.setAttribute('aria-describedby', 'BillAmount');
        // } else if (validation[0] === 'N') {
        //     result.setAttribute('aria-describedby', 'PeopleNumber');
        // } else if (validation[0] === 'T') {
        //     result.setAttribute('aria-describedby', 'TipPercentage');
        // } // backwards, the input box needs to be described by the error, not error by input

        result.textContent = validation;
        return;
    }

    result.textContent = resultText;
}

function handleCalculate() {


    const bill = billInput.value; // remove Number() from here, go into validation function, check for empty string, then convert to number
    const people = peopleInput.value;
    const tip = tipInput.value;
 
    const validation = validateInputs(bill, people, tip);
        if (validation) {
            renderResult('', validation);
            return;
        }

    const { total, perPerson } = calculateTotal({ value: bill }, { value: people }, { value: tip });
    renderResult(`Total: $${total.toFixed(2)}, Per Person: $${perPerson.toFixed(2)}`, validation);
}

submitButton.addEventListener('click', handleCalculate);
