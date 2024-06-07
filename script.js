let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    if (shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateScreen();
}

function updateScreen() {
    document.getElementById('screen').value = previousInput + (operation || '') + currentInput;
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetScreen = false;
    updateScreen();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result;
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    updateScreen();
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetScreen = false;
    updateScreen();
}

function deleteNumber() {
    if (shouldResetScreen) return;
    currentInput = currentInput.toString().slice(0, -1);
    updateScreen();
}