let display = document.getElementById('display');
let equation = '';

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.classList.add('dissolve-out'); // Add dissolve-out class
    setTimeout(() => {
        display.value = '';
        display.classList.remove('dissolve-out');
    }, 300);
}

function calculate() {
    try {
        equation = display.value; // Store the equation
        const result = eval(equation); // Calculate the result
        display.value = `${equation} = ${result}`; // Display equation and result
    } catch (error) {
        display.value = 'Error';
    }
}

function deleteLastCharacter() {
    display.value = display.value.slice(0, -1);
}

function calculateSquareRoot() {
    const currentValue = parseFloat(display.value);
    if (!isNaN(currentValue) && currentValue >= 0) {
        equation = `Math.sqrt(${currentValue})`;
        const result = Math.sqrt(currentValue);
        display.value = `${equation} = ${result}`;
    } else {
        display.value = 'Error';
    }
}
