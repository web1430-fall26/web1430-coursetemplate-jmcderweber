
const billInput = document.querySelector('#BillAmount');
const peopleInput = document.querySelector('#PeopleNumber');
const tipInput = document.querySelector('#TipPercentage');
const submitButton = document.querySelector('button[type="button"]');



function validateInputs(bill, people, tip) {

    if (!bill && bill !== 0){
        billInput.setAttribute('aria-invalid', 'true');
        return `Bill amount is required`;
    }
    if (bill <= 0) {
        billInput.setAttribute('aria-invalid', 'true'); // sets the aria-invalid attribute to tell screen readers the input is invalid
        return `Bill amount must be greater than 0`;
    }
    billInput.removeAttribute('aria-invalid'); // removes the aria-invalid attribute when the input is valid
                                               // does so directly after the validation check instead of at the end of the function
                                               // so that screen readers are immediately informed of the input's validity
    
    if (!people && people !== 0) {
        peopleInput.setAttribute('aria-invalid', 'true');
        return `Number of people is required`;
    }

    if (people <= 0) {
        peopleInput.setAttribute('aria-invalid', 'true');
        return `Number of people must be greater than 0`;
    }
    peopleInput.removeAttribute('aria-invalid');

    if (!tip && tip !== 0) {
        tipInput.setAttribute('aria-invalid', 'true');
        return `Tip percentage is required`;
    }
    
    if (tip < 0) {
        tipInput.setAttribute('aria-invalid', 'true');
        return `Tip percentage cannot be negative`;
    }

    if (tip >= 100) {
        tipInput.setAttribute('aria-invalid', 'true');
        return `You'd be crazy to tip 100% or more`;
    }
    tipInput.removeAttribute('aria-invalid');


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
        if (validation[0] === 'B') {
            result.setAttribute('aria-describedby', 'BillAmount');
        } else if (validation[0] === 'N') {
            result.setAttribute('aria-describedby', 'PeopleNumber');
        } else if (validation[0] === 'T') {
            result.setAttribute('aria-describedby', 'TipPercentage');
        }

        result.textContent = validation;
        return;
    }

    result.textContent = resultText;
}


submitButton.addEventListener('click', () => {
    // read inputs, validate, calculate, and render result
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);
    const tip = Number(tipInput.value);
 
    const validation = validateInputs(bill, people, tip)

    const { total, perPerson } = calculateTotal({ value: bill }, { value: people }, { value: tip });
    renderResult(`Total: $${total.toFixed(2)}, Per Person: $${perPerson.toFixed(2)}`, validation);
});