const output = document.getElementById("output");
const form = document.getElementById("upgradeForm");
const button = document.getElementById("calcButton");


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

button.addEventListener('click', displayResults); 




