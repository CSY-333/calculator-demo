# Product Requirements Document (PRD): Engineering Calculator

## 1. Introduction

This document outlines the requirements for developing a web-based Engineering Calculator. The project aims to implement a fully functional, aesthetically pleasing calculator based on the provided `stitch` design reference.

## 2. Goals

- **Replicate Design**: Faithfully implement the UI/UX defined in the `stitch` design file.
- **Functionality**: Provide accurate standard and scientific calculation capabilities.
- **Responsiveness**: Ensure the calculator works well on different screen sizes (though primarily designed as a mobile-first or panel app).
- **Theming**: Support Light and Dark modes.

## 3. User Interface (UI) Requirements

### 3.1. Design Reference

The UI must strictly follow the `stitch` file layout and styling.

- **Framework**: Tailwind CSS (via CDN or build process).
- **Fonts**:
  - Display: "Space Grotesk"
  - Body: "Noto Sans"
- **Colors**:
  - Primary: `#135bec`
  - Background Light: `#f6f6f8`
  - Background Dark: `#101622`

### 3.2. Layout Components

1.  **Top Bar**:
    - Title: "Engineering"
    - Actions: Settings icon, History icon.
2.  **Display Area**:
    - **History View**: Shows the current expression or previous calculation (e.g., `sin(45) * 20`).
    - **Main Result**: Large text showing the current input or result (e.g., `14.14...`).
3.  **Keypad**:
    - **Scientific Section** (Grid 4x3):
      - Control: AC, Backspace, %
      - Trigonometry: sin, cos, tan, π
      - Logarithmic/Other: ln, log, √, e
    - **Numpad Section** (Grid 4x4):
      - Numbers: 0-9
      - Operations: ÷, ×, -, +
      - Decimal point: .
      - Equal button: = (highlighted in primary color)

### 3.3. Interaction Design

- **Hover Effects**: Buttons should have appropriate hover states (lightening/darkening) as defined in `stitch`.
- **Feedback**: Visual feedback on button press.
- **Theme**: Automatic or toggleable Dark/Light mode (based on system preference or toggle).

## 4. Functional Requirements

### 4.1. Core Calculation

- **Basic Operations**: Addition, Subtraction, Multiplication, Division.
- **Order of Operations**: Standard PEMDAS support.
- **Decimal Precision**: Handle floating point arithmetic correctly (avoid `0.1 + 0.2 = 0.300000004` issues where possible).

### 4.2. Scientific Functions

- **Trigonometry**: `sin`, `cos`, `tan` (Inputs assumed in Degrees or Radians - _To be decided, default to Degrees or toggleable_).
- **Constants**: `π` (3.14159...), `e` (2.71828...).
- **Logarithms**: `log` (base 10), `ln` (base e).
- **Roots**: Square root (`√`).
- **Percentage**: `%` calculation.

### 4.3. Input Management

- **AC (All Clear)**: Rests the entire state.
- **Backspace**: Removes the last character entered.
- **Formatting**:
  - Display large numbers with commas if possible.
  - Handle long results (truncate or scale font).

## 5. Technical Stack

- **Structure**: HTML5
- **Styling**: Tailwind CSS (matching `stitch`)
- **Logic**: Vanilla JavaScript
- **Icons**: Google Material Symbols Outlined

## 6. Open Questions / Constraints

- **Trig Mode**: Should there be a Radian/Degree toggle? (Not visible in `stitch` screenshot, assume Degrees or auto).
- **History**: The "History" button exists in the UI. Should it open a modal or side panel? _Scope for V1: Visual only or simple list?_
- **Mobile responsiveness**: The design looks mobile-native.
