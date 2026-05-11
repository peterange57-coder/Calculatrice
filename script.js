let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

/**
 * Append a number to the display
 */
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Prevent leading zeros (except for decimal numbers)
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay();
}

/**
 * Append an operator to the calculation
 */
function appendOperator(op) {
    if (currentInput === '' && op !== '-') {
        return;
    }
    
    // Handle negative numbers
    if (op === '-' && currentInput === '') {
        currentInput = '-';
        updateDisplay();
        return;
    }
    
    if (operator !== null && currentInput !== '') {
        calculate();
    }
    
    previousValue = parseFloat(currentInput);
    operator = op;
    currentInput = '';
    shouldResetDisplay = true;
}

/**
 * Calculate the result
 */
function calculate() {
    if (operator === null || currentInput === '') {
        return;
    }
    
    let result;
    const current = parseFloat(currentInput);
    const previous = previousValue;
    
    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = previous / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    
    currentInput = result.toString();
    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Clear the display and reset all values
 */
function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = null;
    shouldResetDisplay = false;
    display.value = '0';
}

/**
 * Delete the last character from the display
 */
function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

/**
 * Update the display with the current input
 */
function updateDisplay() {
    display.value = currentInput || '0';
}

/**
 * Initialize the calculator
 */
function init() {
    display.value = '0';
}

// Initialize when page loads
window.addEventListener('load', init);

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});
