import { Operations } from '../src/operations.js';

describe('Operations Strategy', () => {
    test('should perform addition correctly', () => {
        expect(Operations.add(1, 2)).toBe(3);
    });

    test('should perform subtraction correctly', () => {
        expect(Operations.subtract(5, 3)).toBe(2);
    });

    test('should calculate sin in DEGREES', () => {
        // sin(30) is 0.5. JS Math.sin takes radians.
        // We assert our Operation handles the conversion.
        expect(Operations.sin(30)).toBeCloseTo(0.5);
    });
});
