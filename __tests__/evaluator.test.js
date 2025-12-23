import { Evaluator } from '../src/evaluator.js';

describe('Evaluator', () => {
    test('should evaluate simple addition', () => {
        expect(Evaluator.evaluate('1 + 2')).toBe(3);
    });

    test('should evaluate complex expression with precedence', () => {
        // 1 + 2 * 3 = 7, NOT 9
        expect(Evaluator.evaluate('1 + 2 * 3')).toBe(7);
    });

    test('should evaluate scientific functions', () => {
        // sin(30) + 0.5 = 1
        expect(Evaluator.evaluate('sin(30) + 0.5')).toBeCloseTo(1);
    });

    test('should handle parentheses', () => {
        // (1 + 2) * 3 = 9
        expect(Evaluator.evaluate('(1 + 2) * 3')).toBe(9);
    });
    
    test('should handle negative numbers (unary minus)', () => {
        expect(Evaluator.evaluate('-5 + 3')).toBe(-2);
    });
});
