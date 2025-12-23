import { Tokenizer } from '../src/parser.js';

describe('Tokenizer', () => {
    test('should tokenize simple numbers and operators', () => {
        const input = "1 + 2";
        const tokens = Tokenizer.tokenize(input);
        expect(tokens).toEqual(['1', '+', '2']);
    });

    test('should handle decimal numbers', () => {
        const input = "3.14 * 2";
        const tokens = Tokenizer.tokenize(input);
        expect(tokens).toEqual(['3.14', '*', '2']);
    });

    test('should tokenize parentheses and functions', () => {
        const input = "sin(45)";
        // Expect keys to be split from parens
        expect(Tokenizer.tokenize(input)).toEqual(['sin', '(', '45', ')']);
    });

    test('should handle complex mixed usage without spaces', () => {
        const input = "1+sin(30)*5";
        expect(Tokenizer.tokenize(input)).toEqual(['1', '+', 'sin', '(', '30', ')', '*', '5']);
    });
});
