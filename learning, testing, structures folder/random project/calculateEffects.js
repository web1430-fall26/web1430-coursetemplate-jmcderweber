const output = document.getElementById("output");
const form = document.getElementById("upgradeForm");


function calculateEffects(currentNumber, upgradeMultiplier, currentUpgrades, plannedUpgrades) {
	const outputWithoutUpgrades =
		currentNumber / (1 + upgradeMultiplier * currentUpgrades);
	const outputWithPlannedUpgrades =
		outputWithoutUpgrades * (1 + upgradeMultiplier * plannedUpgrades);

	return {
		outputWithoutUpgrades,
		outputWithPlannedUpgrades,
	};
}


function displayResults(event) { 
    event.preventDefault(); // Prevent the default form submission

    const currentNumber = parseFloat(document.getElementById("currentNumber").value);
    const upgradeMultiplier = parseFloat(document.getElementById("upgradeMultiplier").value);
    const currentUpgrades = parseInt(document.getElementById("currentUpgrades").value);
    const plannedUpgrades = parseInt(document.getElementById("plannedUpgrades").value);

    const { outputWithoutUpgrades, outputWithPlannedUpgrades } = calculateEffects(currentNumber, upgradeMultiplier, currentUpgrades, plannedUpgrades);

    output.innerText = `Output without upgrades: ${outputWithoutUpgrades.toFixed(5)}\n
                          Output with planned upgrades: ${outputWithPlannedUpgrades.toFixed(5)}`;
}

form.addEventListener('click', displayResults); 




const doNotUse = document.getElementById("doNotUse");
function badFunction(userInput) {
    doNotUse.innerHTML = userInput; // This is a bad practice and can lead to XSS vulnerabilities, but is for testing purposes only. In a real application, you should sanitize user input before inserting it into the DOM to prevent XSS attacks.

    // `You entered: ${userInput}`
}