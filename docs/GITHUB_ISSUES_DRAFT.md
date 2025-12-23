# GitHub Issues Draft

Please copy the following content to create issues in your repository.

---

## Issue 1: Frontend Structure Refactoring

**Background**
The current project structure has flat `style.css` and `script.js` files. To maintain scalability and adhere to the new `src/` directory convention, we need to reorganize these files.

**Task Details**

- Verify `style.css` is correctly moved to `src/styles/main.css`.
- Move `script.js` to `src/main.js`.
- Update `index.html` to reference the new paths (`src/styles/main.css` and `src/main.js` as module).

**Acceptance Criteria**

- [ ] Directory structure follows: `src/styles/`, `src/main.js`.
- [ ] `index.html` loads without 404 errors for CSS/JS.
- [ ] The app renders correctly in the browser.

---

## Issue 2: Core Logic - Operations Module (TDD)

**Background**
We need a robust, tested mathematical core for the calculator. Following SOLID (OCP) and TDD, `Operations` will be a standalone module handling individual math functions.

**Task Details**

- Create `__tests__/operations.test.js` and `src/operations.js`.
- Implement basic arithmetic (+, -, \*, /) using TDD.
- Implement scientific functions (`sin`, `cos`, `tan`) ensuring **Degree assignment** (not Radians).
- Implement constants and utils (`PI`, `e`, `sqrt`, `log`).

**Acceptance Criteria**

- [ ] All tests in `__tests__/operations.test.js` pass.
- [ ] `sin(30)` returns `0.5` (approx), not the radian result.
- [ ] No UI code is present in this module.

---

## Issue 3: Core Logic - Tokenizer & Parser (TDD)

**Background**
To safely evaluate complex engineering expressions (e.g., `sin(45) + 2`), we need to parse the input string into executable tokens rather than using raw `eval`.

**Task Details**

- Implement a Tokenizer to split strings like "sin(45)+2" into `['sin', '(', '45', ')', '+', '2']`.
- Implement validation to catch syntax errors (e.g., unbalanced parenthesis).
- Use TDD for all steps.

**Acceptance Criteria**

- [ ] `Tokenizer` correctly handles numbers, operators, and function names.
- [ ] Invalid syntax throws a clear error caught by tests.
- [ ] Tests cover edge cases (empty string, multiple operators).

---

## Issue 4: Core Logic - Evaluator (TDD)

**Background**
The Evaluator takes the parsed tokens/expression and computes the final result using the `Operations` module.

**Task Details**

- Implement the evaluation logic (using RPN or a safe Function constructor wrapper as per Tech Spec).
- Ensure standard Order of Operations (PEMDAS).
- Integrate with `Operations` module for actual calculations.

**Acceptance Criteria**

- [ ] `1 + 2 * 3` returns `7`, not `9`.
- [ ] `sin(30) + 0.5` return `1`.
- [ ] Division by zero is handled gracefully (Infinity or Error).

---

## Issue 5: Core Logic - State Management (TDD)

**Background**
The `Calculator` class manages the user session state, including the current input string, history of previous calculations, and editing operations (delete/clear).

**Task Details**

- Implement `Calculator` class.
- Manage `currentExpression` and `history`.
- Implement `clear()` and `delete()` (backspace) logic.

**Acceptance Criteria**

- [ ] State correctly updates on inputs.
- [ ] `delete()` correctly removes the last character/token.
- [ ] `clear()` resets variables to initial state.

---

## Issue 6: UI Integration

**Background**
Once the core logic is tested and complete, it needs to be wired to the HTML frontend.

**Task Details**

- Import `Calculator` into `src/main.js`.
- generic Event Delegation to handle button clicks.
- Update the DOM elements (`#main-display`, `#history-display`) based on Calculator state.

**Acceptance Criteria**

- [ ] Clicking buttons updates the display.
- [ ] Calculations are triggered correctly on `=`.
- [ ] Dark Mode toggle works (already implemented, verify persistence).

---

## Issue 7: Deployment Verification

**Background**
Automatic deployment to GitHub Pages via GitHub Actions is required to ensure continuous delivery.

**Task Details**

- Verify the syntax of `.github/workflows/deploy.yml`.
- Push code to `main` branch.
- Validate the live URL.

**Acceptance Criteria**

- [ ] GitHub Action "Deploy to GitHub Pages" completes successfully.
- [ ] The live website is accessible and functional.
