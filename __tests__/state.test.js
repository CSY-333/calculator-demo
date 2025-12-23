import { Calculator } from '../src/calculator.js';

test('Calculator flow integration', () => {
    let updateCalled = false;
    const mockUpdateDisplay = () => { updateCalled = true; };
    const calculator = new Calculator(mockUpdateDisplay);

    // Append Check
    calculator.appendNumber('1');
    calculator.appendNumber('2');
    console.log('After append:', calculator.currentOperand);
    expect(calculator.currentOperand).toBe('12');
    expect(updateCalled).toBe(true);

    // Operation Check
    calculator.chooseOperation('+');
    calculator.appendNumber('3');
    console.log('Expression:', calculator.expression);
    expect(calculator.expression).toBe('12+3');

    // Compute Check
    calculator.compute();
    console.log('After compute:', calculator.currentOperand);
    expect(calculator.currentOperand).toBe('15');
});
