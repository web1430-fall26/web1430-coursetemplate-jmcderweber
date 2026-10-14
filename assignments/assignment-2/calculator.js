
const billInput = document.querySelector('#BillAmount');
const peopleInput = document.querySelector('#PeopleNumber');
const tipInput = document.querySelector('#TipPercentage');
const form = document.querySelector('#BillForm');

function validateInputs(bill, people, tip) { 
        // inputs come in as a string, are converted for each number check

    billInput.removeAttribute('aria-invalid');       // remove at the start so that all attributes are removed before any return                                    

    peopleInput.removeAttribute('aria-invalid');

    tipInput.removeAttribute('aria-invalid');
  

        
    if (bill.trim() === ""){
        billInput.setAttribute('aria-invalid', 'true');

        return `Bill amount is required`;
    }
    if (Number(bill) <= 0) {
        billInput.setAttribute('aria-invalid', 'true'); // sets the aria-invalid attribute to tell screen readers the input is invalid

        return `Bill amount must be greater than 0`;
    }
    
    if (people.trim() === "") {
        peopleInput.setAttribute('aria-invalid', 'true');
   
        return `Number of people is required`;
    }
    if (!Number.isInteger(Number(people))) {
        peopleInput.setAttribute('aria-invalid', 'true');

        return `Number of people must be an integer`;
    }
    if (Number(people) <= 0){
        peopleInput.setAttribute('aria-invalid', 'true');

        return `Number of people must be positive`;
    }


    if (tip.trim() === "") {
        tipInput.setAttribute('aria-invalid', 'true');

        return `Tip percentage is required`;
    }
    
    if (Number(tip) < 0) {
        tipInput.setAttribute('aria-invalid', 'true');

        return `Tip percentage cannot be negative`;
    }

    if (Number(tip) >= 100) {
        tipInput.setAttribute('aria-invalid', 'true');

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

    const billError = document.querySelector('#bill-error');
    const peopleError = document.querySelector('#people-error');
    const tipError = document.querySelector('#tip-error');

    result.textContent = "";  // clear previous results

    billError.textContent = ""
    peopleError.textContent = ""
    tipError.textContent = "";

    if (validation) { // rendering needs to update the error spans
        if (validation[0] === 'B') {
            billInput.setAttribute('aria-invalid', 'true');

            billError.textContent = validation;
        }
        else if (validation[0] === 'N') { 
            peopleInput.setAttribute('aria-invalid', 'true');

            peopleError.textContent = validation;
        }

        else if (validation[0] === 'T' || validation[0] === 'Y') { // tip error messages starts with 'T' or 'Y'
            tipInput.setAttribute('aria-invalid', 'true');

            tipError.textContent = validation;
        }
        return;
    }


    result.textContent = resultText;
}

function handleCalculate(event) {

    event.preventDefault();

    const bill = billInput.value; // removed Number() from here, go into validation function, check for empty string, then convert to number
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

form.addEventListener('submit', handleCalculate); 
