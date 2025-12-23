class Calculator {
  constructor() {
    this.previousOperandElement = document.getElementById("history-display");
    this.currentOperandElement = document.getElementById("main-display");

    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.resetNextInput = false; // Flag to reset input after equals
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    if (this.resetNextInput) {
      this.clear();
      return;
    }
    if (this.currentOperand === "0") return;

    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") {
      this.currentOperand = "0";
    }
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.resetNextInput) {
      this.currentOperand = "";
      this.resetNextInput = false;
    }
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    // If we already have a previous operand and operation, verify/compute intermediate
    // But standard behavior is usually: Push current to history with op
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
    this.updateDisplay();
  }

  // Wraps the current operand in a function e.g., sin(current)
  applyScientific(func) {
    if (this.currentOperand === "") return;

    // If current operand is simply a number or a wrapped expression, we wrap it.
    // We handle constants PI/E separately as valid inputs but `scientific` arg implies function.
    this.currentOperand = `${func}(${this.currentOperand})`;
    this.resetNextInput = false; // Allow continuing validation/modification
    this.updateDisplay();
  }

  appendConstant(value) {
    if (this.resetNextInput) {
      this.currentOperand = "";
      this.resetNextInput = false;
    }
    // If current is 0, replace. If not, maybe multiply?
    // Standard calc behavior: 5PI -> 5 * PI? Or just replace?
    // Let's assume replace or explicit multiply needed.
    // For simplicity: if 0 replace, else append (likely syntax error if '5PI' not handled)
    // Let's replace '0' or append. Ideally user hits '*' then 'PI'.
    if (this.currentOperand === "0") {
      this.currentOperand = value;
    } else {
      // Implicit multiplication can be tricky. Let's start with clean replace if buffer is empty-ish
      // OR just append and let eval handle syntax error?
      // Safer: Append.
      this.currentOperand += value;
    }
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = this.previousOperand; // e.g., "sin(45)"
    const current = this.currentOperand; // e.g., "20"

    if (!this.operation && !prev) {
      // "Equals" pressed on just a number or simple expression
      // e.g., "sin(45)" then "="
      try {
        const result = this.evaluate(current);
        this.previousOperand = current + " ="; // History style
        this.currentOperand = result;
        this.operation = undefined;
        this.resetNextInput = true;
        this.updateDisplay();
      } catch (e) {
        this.currentOperand = "Error";
        this.resetNextInput = true;
        this.updateDisplay();
      }
      return;
    }

    if (!this.operation || prev === "") return;

    const expr = `${prev} ${this.operation} ${current}`;
    try {
      const result = this.evaluate(expr);
      this.currentOperand = result;
      this.operation = undefined;
      this.previousOperand = expr + " ="; // Show full history of calc
      this.resetNextInput = true;
    } catch (e) {
      console.error(e);
      this.currentOperand = "Error";
      this.resetNextInput = true;
    }
    this.updateDisplay();
  }

  evaluate(expression) {
    // Sanitize
    // Allowed: numbers, operators, parens, sin, cos, tan, log, ln, sqrt, PI, E, .
    // We allowed words like 'sin', 'PI'.

    // Scope Definition
    // sin, cos, tan take DEGREES.
    const toRad = (d) => d * (Math.PI / 180);
    const scope = {
      sin: (d) => Math.sin(toRad(d)),
      cos: (d) => Math.cos(toRad(d)),
      tan: (d) => Math.tan(toRad(d)),
      ln: Math.log, // Natural log
      log: Math.log10, // Base 10 log
      sqrt: Math.sqrt,
      PI: Math.PI,
      E: Math.E,
    };

    // Construct Function with keys as arguments
    const keys = Object.keys(scope);
    const values = Object.values(scope);

    // Replace '×' with '*' and '÷' with '/' in expression if they exist (UI has /, *, but confirm symbols)
    // The UI HTML uses data-value="/" and "*", so we are good.
    // But verify just in case user pasted something? No, we control input.

    // We need to parse strict.
    const func = new Function(...keys, `return ${expression}`);
    const result = func(...values);

    // Limit precision
    return parseFloat(result.toPrecision(10)).toString(); // Clean up 0.3000000004
  }

  updateDisplay() {
    // Main display
    this.currentOperandElement.innerText = this.formatNumber(
      this.currentOperand
    );

    // History display
    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = this.previousOperand;
    }

    // Handle Error state visually if needed, but text "Error" works.
  }

  formatNumber(str) {
    if (str === "Error") return "Error";
    // We don't want to format inside functions e.g. sin(4,000) - that breaks things?
    // Actually, currentOperand can be "sin(45)".
    // Simple number formatting only works for pure numbers.
    // If it looks like a number, format it.
    // If it contains letters, display raw (too complex to parse & format partially without bugs).

    if (/^[0-9.-]+$/.test(str)) {
      // It's a number
      // Handle decimal
      const parts = str.split(".");
      const integerPart = parseFloat(parts[0]);
      if (isNaN(integerPart)) return str;

      let display = integerPart.toLocaleString("en-US");
      if (parts[1] !== undefined) {
        display += "." + parts[1];
      }
      return display;
    }
    return str;
  }
}

// Initialization and Event Wiring
document.addEventListener("DOMContentLoaded", () => {
  const calculator = new Calculator();
  const buttons = document.querySelectorAll("button");

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            // Optional: Save preference
            // localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    buttons.forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.action; // defined in HTML
      const value = button.dataset.value; // defined in HTML
      const innerText = button.innerText;

      if (action === "number") {
        calculator.appendNumber(value);
      } else if (action === "operation") {
        calculator.chooseOperation(value);
      } else if (action === "scientific") {
        calculator.applyScientific(value);
      } else if (action === "constant") {
        calculator.appendConstant(value);
      } else if (action === "all-clear") {
        // 'AC' text
        calculator.clear();
      } else if (action === "delete") {
        // backspace
        calculator.delete();
      } else if (action === "equals") {
        calculator.compute();
      } else if (action === "percent") {
        // Percent is tricky. Usually value / 100.
        // Treating as post-fix operator / 100
        calculator.chooseOperation("/");
        calculator.appendNumber("100");
        calculator.compute();
      }
    });
  });
});
