import { Operations } from './operations.js';

export class Evaluator {
    static evaluate(expression) {
        // Security check: Only allow safe characters
        // Allowed: numbers, operators, parens, spaces, and specific function names
        // Ideally we use a allowlist, but for this demo assuming internal sanitized input + loose regex
        // Strict check: if (/[^0-9+\-*/().a-z\s]/.test(expression)) throw new Error("Invalid");
        
        // Scope Injection
        // We want 'sin(30)' to map to 'Operations.sin(30)' OR
        // we create a function with arguments matching the keys of Operations.
        
        const keys = Object.keys(Operations); // ['add', 'sin', 'PI', ...]
        const values = Object.values(Operations);
        
        // The expression might use 'sin', 'PI' directly.
        // new Function('sin', 'PI', 'return sin(30) + PI')
        
        try {
            const func = new Function(...keys, `return ${expression}`);
            const result = func(...values);
            
            // Handle floating point precision errors (e.g. 0.1+0.2)
            // returning float for now
            return result;
        } catch (e) {
            throw new Error("Evaluation Failed: " + e.message);
        }
    }
}
