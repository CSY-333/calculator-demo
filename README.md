# Engineering Calculator

A high-precision engineering calculator compliant with TDD and SOLID principles.
Designed to replicate the `stitch` UI with a robust, modular JavaScript core.

## Features

- **Scientific Calculations**: Trigonometry (Degrees), Logarithms, Exponentials.
- **Robust Architecture**: Built with a strict separation of concerns (Parser, Evaluator, State).
- **Modern UI**: Tailwind CSS based design with Dark Mode support.
- **CI/CD**: Automatic deployment to GitHub Pages.

## Tech Stack

- **Frontend**: HTML5, Tailwind CSS (via CDN/local), Vanilla ES Modules.
- **Testing**: Jest (for Core Logic).
- **Tooling**: Node.js, npm.

## Developer Guidelines

This project follows strict engineering rules:

1.  **TDD**: No core logic without a failing test first.
2.  **SOLID**: strictly enforced via `RULE.md`.
3.  **No UI Automation**: UI is tested manually; Logic is tested automatically.

## Setup

```bash
# Install dependencies
npm install

# Run Tests (Core Logic)
npm test

# Run Locally
npx serve .
```

## Project Structure

- `src/`: Core logic and styles.
- `__tests__/`: Jest test files.
- `docs/`: PRD, Tech Spec, and Planning documents.
