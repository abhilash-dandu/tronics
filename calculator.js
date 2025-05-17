const display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;
        // Replace × with * and ÷ with / for evaluation
        const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(sanitizedExpression);
        
        // Check if result is valid
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        // Format the result to avoid long decimal places
        display.value = Number(result.toFixed(8)).toString();
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and operators
    if (/[\d+\-*/.()]/.test(key)) {
        appendToDisplay(key);
    }
    // Enter key for calculation
    else if (key === 'Enter') {
        calculate();
    }
    // Backspace key
    else if (key === 'Backspace') {
        backspace();
    }
    // Escape key for clear
    else if (key === 'Escape') {
        clearDisplay();
    }
}); 