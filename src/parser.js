export class Tokenizer {
    static tokenize(expression) {
        // Remove all whitespace first
        const sanitised = expression.replace(/\s+/g, '');
        
        // Regex components:
        // 1. Decimals: \d+\.\d+
        // 2. Integers: \d+
        // 3. Functions/Constants: [a-zA-Z]+ (sin, cos, PI, etc)
        // 4. Operators/Parens: [+\-*/%^()]
        const regex = /(\d+\.\d+|\d+|[a-zA-Z]+|[+\-*/%^()])/g;
        
        const tokens = sanitised.match(regex);
        
        if (!tokens) return [];
        
        return tokens;
    }
}
