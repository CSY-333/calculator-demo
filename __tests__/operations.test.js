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
        expect(Operations.sin(30)).toBeCloseTo(0.5);
    });

    test('should perform multiplication', () => {
        expect(Operations.multiply(3, 4)).toBe(12);
    });

    test('should perform division', () => {
        expect(Operations.divide(10, 2)).toBe(5);
    });

    test('should calculate cos in DEGREES', () => {
        expect(Operations.cos(60)).toBeCloseTo(0.5);
    });

    test('should calculate tan in DEGREES', () => {
        expect(Operations.tan(45)).toBeCloseTo(1);
    });

    test('should calculate log (base 10)', () => {
        expect(Operations.log(100)).toBe(2);
    });

    test('should calculate ln (natural log)', () => {
        expect(Operations.ln(Math.E)).toBeCloseTo(1);
    });

    test('should calculate sqrt', () => {
        expect(Operations.sqrt(9)).toBe(3);
    });

    test('should provide correct constants', () => {
        expect(Operations.PI).toBe(Math.PI);
        expect(Operations.E).toBe(Math.E);
    });
});
