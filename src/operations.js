/**
 * Operations Strategy Module
 * Follows OCP: New operations can be registered here.
 */

const toRad = (degrees) => degrees * (Math.PI / 180);

export const Operations = {
    // Basic Arithmetic
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,

    // Scientific (Degrees)
    sin: (d) => Math.sin(toRad(d)),
    cos: (d) => Math.cos(toRad(d)),
    tan: (d) => Math.tan(toRad(d)),
    
    // Utils
    sqrt: (n) => Math.sqrt(n),
    log: (n) => Math.log10(n),
    ln: (n) => Math.log(n),
    
    // Constants
    PI: Math.PI,
    E: Math.E
};
