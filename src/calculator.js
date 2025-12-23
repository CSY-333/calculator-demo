import { Evaluator } from './evaluator.js';

export class Calculator {
    constructor(updateDisplayCallback) {
        this.updateDisplayCallback = updateDisplayCallback;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.errorMessage = false;
        this.updateDisplay();
    }

    delete() {
        if (this.errorMessage) { this.clear(); return; }
        if (this.currentOperand === '0') return;
        
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.errorMessage) this.clear();
        
        // Prevent multiple decimals
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.errorMessage) return;
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    applyScientific(func) {
        if (this.errorMessage) return;
        
        // If empty, maybe inserting a constant like PI? 
        // For now assuming wrapping existing operand or 0
        if (this.currentOperand === '') this.currentOperand = '0';

        this.currentOperand = `${func}(${this.currentOperand})`;
        this.updateDisplay();
    }
    
    appendConstant(constant) {
        if (this.errorMessage) this.clear();
        this.currentOperand = constant;
        this.updateDisplay();
    }

    compute() {
        let result;
        const expr = this.expression; 
        
        try {
            result = Evaluator.evaluate(expr);
            this.currentOperand = result.toString();
            this.operation = undefined;
            this.previousOperand = '';
        } catch (error) {
            this.currentOperand = 'Error';
            this.errorMessage = true;
        }
        this.updateDisplay();
    }

    get expression() {
        if (this.operation != null) {
            // Concatenate: "prev op current"
            // Note: If current is empty (user picked op then equals), handle gracefully?
            // "1 + " -> usually wait. But for validation "1+" might fail.
            const current = this.currentOperand === '' ? '' : this.currentOperand;
            return `${this.previousOperand}${this.operation}${current}`;
        }
        return this.currentOperand;
    }

    updateDisplay() {
        if (this.updateDisplayCallback) {
            this.updateDisplayCallback(this.currentOperand, this.previousOperand);
        }
    }
}
