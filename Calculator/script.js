// script.js

const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('btn'));

// Initialize the display with 0
display.innerText = '0';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        // Clear display and show 0
        if (value === 'C') {
            display.innerText = '0';
        } else if (value === '=') {
            try {
                // Evaluate the expression and show 0 if result is empty
                const result = eval(display.innerText);
                display.innerText = result === undefined || result === '' ? '0' : result;
            } catch {
                display.innerText = 'Error';
            }
        } else {
            // Avoid multiple 0s at the start
            if (display.innerText === '0') {
                display.innerText = value;
            } else {
                display.innerText += value;
            }
        }
    });
});
