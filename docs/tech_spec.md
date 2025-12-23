# Technical Specification: Engineering Calculator (TDD & SOLID)

## 0. Development Principles

> [!IMPORTANT]
> This project strictly follows **TDD (Test Driven Development)** and **SOLID** principles.
> All core logic **MUST** be implemented via TDD loops (Red -> Green -> Refactor) before being integrated into the UI.

## 1. System Architecture

### 1.1. Technology Stack

- **Languages**: HTML5, CSS (Tailwind), JavaScript (ES Modules).
- **Testing**: Jest (for TDD of core logic).
- **Build**: Vite (Optional, but recommended for Module bundling) OR utilizing Native ES Modules (`<script type="module">`). _Decision: Native ES Modules for simplicity unless bundling demanded._

### 1.2. Directory Structure

```
/
├── __tests__       # Test files (TDD)
│   ├── calculator.test.js
│   └── parser.test.js
├── src             # Core Logic (Pure JS, no DOM)
│   ├── calculator.js
│   ├── parser.js
│   ├── operations.js
│   └── interfaces.js (Conceptual JSDoc)
├── index.html      # UI
├── style.css
└── script.js       # Controller (DOM Glue)
```

## 2. SOLID Design Breakdown

### 2.1. Single Responsibility Principle (SRP)

Logic is split into specialized classes:

- **`Tokenizer`**: Converts string input into tokens.
- **`Parser`**: Converts tokens into an Abstract Syntax Tree (AST) or RPN queue.
- **`Evaluator`**: Executes the calculation.
- **`Calculator`**: Facade that manages the state (history, current input).

### 2.2. Open/Closed Principle (OCP)

- **Strategy Pattern for Operations**:
  New operations (e.g., `sinh`) can be added by creating a new Strategy Class and registering it, without modifying the core `Evaluator`.

```javascript
// operations.js
export const Operations = {
  add: (a, b) => a + b,
  sin: (a) => Math.sin(toRad(a)),
  // Add new ones here...
};
```

### 2.3. Dependency Inversion Principle (DIP)

- The UI (`script.js`) depends on abstractions (the `Calculator` class API), not low-level parsing details.
- High-level `Calculator` modules should depend on abstractions of operations.

## 3. Core Components (The "Domain")

### 3.1. The Operation Strategy

We will define a map or registry of operations to satisfy OCP.

- **Unary Operations**: `sin`, `cos`, `tan`, `log`, `ln`, `sqrt`, `%` (as scaler).
- **Binary Operations**: `+`, `-`, `*`, `/`.

### 3.2. State Management

The `Calculator` class holds the "Model":

- `expression`: String
- `history`: Array

## 4. Testing Strategy (TDD)

All "Domain" code in `src/` must have 100% conceptual coverage via Jest.

1.  **Test**: `it('should add two numbers', ...)`
2.  **Code**: Implement `add` function.
3.  **Refactor**: standard cleanups.

## 5. Deployment

- **GitHub Actions**: Run Tests (`npm test`) -> Build -> Deploy.
