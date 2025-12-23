# Project Rules (RULE.md)

> [!IMPORTANT]
> All AI Agents and Developers working on this project MUST strictly adhere to the following rules. Failure to follow these rules is a violation of the project constraints.

## 1. Test Driven Development (TDD)

**The Golden Rule**: You are NOT allowed to write any implementation code (logic) without a failing test case first.

### Workflow

1.  **Red**: Write a test for a small unit of functionality. Run the test to confirm it fails.
2.  **Green**: Write the _minimum_ amount of code to make the test pass.
3.  **Refactor**: Clean up the code while keeping the test passing.
4.  **Repeat**.

### Requirements

- Use **Jest** as the test runner.
- All "Domain/Core" logic files in `src/` must have a corresponding `__tests__/*.test.js` file.
- **Coverage**: Aim for 100% conceptual coverage of core logic.

## 2. SOLID Principles

Code must be designed to be modular and maintainable.

1.  **SRP (Single Responsibility Principle)**: A class/module should have one, and only one, reason to change.
    - _Example_: `Calculator` class manages state. `Evaluator` calculates results. `Parser` parses strings. They should not be mixed.
2.  **OCP (Open/Closed Principle)**: Software entities should be open for extension, but closed for modification.
    - _Example_: Adding a new function like `sinh` should be done by registering a new Strategy, not by adding a `case 'sinh':` inside a giant switch statement in the core evaluator.
3.  **LSP (Liskov Substitution Principle)**: Subtypes must be substitutable for their base types.
4.  **ISP (Interface Segregation Principle)**: Clients should not be forced to depend on methods they do not use.
5.  **DIP (Dependency Inversion Principle)**: High-level modules should not depend on low-level modules. Both should depend on abstractions.
    - _Example_: The UI should not import specific math functions directly; it should use an abstract `Calculator` interface.

## 3. Technology & Style

- **Modules**: Use ES Modules (`import`/`export`) everywhere.
- **No Global Scope**: Do not attach variables to `window`.
- **Naming**: Use descriptive variable names (e.g., `previousOperand` instead of `prev`).

## 4. Compliance Checklist

Before marking any feature as "Complete", verify:

- [ ] **TDD**: Does every new **Core Logic** feature have a pre-written test case? (UI automation isn't required)
- [ ] **Coverage**: Do all tests pass?
- [ ] **SOLID**:
  - Is the logic separated from the UI? (SRP)
  - Did I modify existing classes when adding a new feature? (Violation of OCP - should extend instead)
  - Are dependencies injected or imported as abstractions? (DIP)
