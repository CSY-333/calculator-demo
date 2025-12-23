# Detailed Project Tasks (TASKS.md)

## 1. Frontend Refactoring (Recovery & Completion)

> Status: Partially Complete (CSS moved, JS move cancelled)

- [ ] **Verify CSS Move**: Check if `style.css` is in `src/styles/main.css`.
- [ ] **Move JS**: Move `script.js` to `src/main.js`.
- [ ] **Update HTML**: Update `index.html` import paths (`href` for CSS, `src` for module JS).
- [ ] **Verification**: Open `index.html` to ensure UI still loads correctly.

## 2. Core Logic Implementation (TDD Cycle)

> Constraint: Strict TDD (Red -> Green -> Refactor)

### 2.1. Operations Module (`src/operations.js`)

- [ ] **Test**: Create `test/operations.test.js` (Basic Arith: +, -, \*, /).
- [ ] **Impl**: Implement Basic Arithmetic in `src/operations.js`.
- [ ] **Test**: Add tests for Scientific functions (sin, cos, tan in Degrees).
- [ ] **Impl**: Implement Scientific functions using `Math` with conversion.
- [ ] **Test**: Add tests for constants (PI, e) and utils (sqrt, log).
- [ ] **Impl**: Implement remaining util functions.

### 2.2. Tokenizer/Parser (`src/parser.js`)

_Goal: Convert "sin(45) + 2" string into safe executable tokens step-by-step._

- [ ] **Test**: Tokenize simple numbers ("123") and operators ("+").
- [ ] **Impl**: Implement regex-based or char-by-char Tokenizer.
- [ ] **Test**: Tokenize functions and parens ("sin", "(", "45", ")").
- [ ] **Impl**: Expand Tokenizer.
- [ ] **Test**: Detect syntax errors (e.g., "sin(((").
- [ ] **Impl**: Add validation logic.

### 2.3. Evaluator (`src/evaluator.js`)

_Goal: Execute the tokens._

- [ ] **Test**: Evaluate simple binary expression ("1 + 2").
- [ ] **Impl**: Implement basic RPN or simple Evaluator.
- [ ] **Test**: Evaluate function wrapping ("sin(30)").
- [ ] **Impl**: Implement function call execution.
- [ ] **Test**: Order of operations (PEMDAS).
- [ ] **Impl**: Ensure precedence logic (if not using `Function` constructor).
  - _Note: If using `Function` constructor as per Tech Spec, tests focus on sanitization security._

### 2.4. Calculator State (`src/calculator.js`)

- [ ] **Test**: State transitions (Input -> Op -> Input -> Equals).
- [ ] **Impl**: Implement `Calculator` class methods.
- [ ] **Test**: History management (Previous operand tracking).
- [ ] **Impl**: Implement history storage.
- [ ] **Test**: Clear and Delete mechanics.
- [ ] **Impl**: Implement `clear()` and `delete()`.

## 3. UI Integration

- [ ] **Connect**: Import `Calculator` in `src/main.js`.
- [ ] **Event Binding**: Bind DOM buttons to `Calculator` methods.
- [ ] **Display**: Connect `updateDisplay` callback to DOM elements.
- [ ] **Theme**: Verify Dark Mode persistence.

## 4. Deployment

- [ ] **Workflow**: Verify `.github/workflows/deploy.yml` syntax.
- [ ] **Push**: Commit and push to main.
- [ ] **Verify**: Check GitHub Pages URL.
