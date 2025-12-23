import { Calculator } from '../src/calculator.js';

test('sanity', () => {
    const calc = new Calculator(() => {});
    expect(calc.currentOperand).toBe('0');
});
