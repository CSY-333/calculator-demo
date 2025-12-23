import { Calculator } from './calculator.js';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Display Elements
    const updateDisplay = (current, previous) => {
        const currentEl = document.getElementById("main-display");
        const previousEl = document.getElementById("history-display");
        
        // Formatting helper
        const format = (str) => {
            if (!str) return '';
            if (str === 'Error') return 'Error';
            // Only format pure numbers
            if (/^[0-9.-]+$/.test(str)) {
                const parts = str.split(".");
                const integerPart = parseFloat(parts[0]);
                if (isNaN(integerPart)) return str;
                let display = integerPart.toLocaleString("en-US");
                if (parts[1] !== undefined) display += "." + parts[1];
                return display;
            }
            return str;
        };

        if (currentEl) currentEl.innerText = format(current);
        if (previousEl) previousEl.innerText = previous || ''; // Previous often contains operators like "1 +"
    };

    // 2. Initialize Calculator with Callback
    const calculator = new Calculator(updateDisplay);

    // 3. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Init from local storage or system preference could go here
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
    }

    // 4. Bind Button Events
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;
            const value = button.dataset.value;

            // Skip theme toggle button which has id but no data-action (or handle explicitly)
            if (button.id === 'theme-toggle') return;

            switch (action) {
                case "number":
                    calculator.appendNumber(value);
                    break;
                case "operation":
                    calculator.chooseOperation(value);
                    break;
                case "scientific":
                    calculator.applyScientific(value);
                    break;
                case "constant":
                    calculator.appendConstant(value);
                    break;
                case "all-clear":
                    calculator.clear();
                    break;
                case "delete":
                    calculator.delete();
                    break;
                case "equals":
                    calculator.compute();
                    break;
                case "percent":
                    // Shortcut: Divide by 100
                    calculator.chooseOperation("/");
                    calculator.appendNumber("100");
                    calculator.compute();
                    break;
            }
        });
    });
});
