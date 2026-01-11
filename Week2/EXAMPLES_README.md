# Week2 SCSS Examples - Summary

## Created Folders

### ✅ Example1 - SCSS Variables
**Location**: `Week2/Example1/`  
**Focus**: Demonstrates SCSS variables only

**Files Created**:
- `index.html` - Card layout with different colored sections
- `styles.scss` - Comprehensive variable examples:
  - Color variables ($primary-color, $secondary-color, etc.)
  - Typography variables ($font-family-base, $font-size-large)
  - Spacing variables ($spacing-xs through $spacing-xl)
  - Layout variables ($max-width, $border-radius, $box-shadow)

**Key Learning**: How to store and reuse values throughout a stylesheet for consistency and maintainability.

---

### ✅ Example2 - SCSS Mixins
**Location**: `Week2/Example2/`  
**Focus**: Demonstrates SCSS mixins (with minimal variables)

**Files Created**:
- `index.html` - Button gallery and card grid
- `styles.scss` - Multiple mixin examples:
  - `@mixin button()` - Customizable button styles with parameters
  - `@mixin flex-center()` - Flexbox centering pattern
  - `@mixin card-style()` - Card component with conditional shadows
  - `@mixin respond-to()` - Responsive breakpoints with @content

**Key Learning**: How to create reusable CSS blocks with parameters to avoid code duplication.

---

### ✅ Example3 - SCSS Functions
**Location**: `Week2/Example3/`  
**Focus**: Demonstrates SCSS functions (minimal variables, no mixins)

**Files Created**:
- `index.html` - Pricing cards with auto-contrasting colors
- `styles.scss` - Custom function examples:
  - `@function px-to-rem()` - Convert pixels to rem units
  - `@function strip-unit()` - Remove units from values
  - `@function contrast-color()` - Auto-determine text color for accessibility
  - `@function tint()` - Lighten colors by mixing with white
  - `@function shade()` - Darken colors by mixing with black
  - `@function power()` - Exponentiation calculations

**Key Learning**: How to perform calculations and return values for use in CSS properties.

---

## How to Use These Examples

### For Each Example:

1. **Navigate to the example folder** (Example1, Example2, or Example3)
2. **Open `styles.scss` in VS Code**
3. **Click "Watch Sass"** in the status bar to start auto-compilation
4. **Save the file** to generate `styles.css`
5. **Open `index.html`** in a browser to see the result
6. **Read the comments** in `styles.scss` to understand each feature
7. **Experiment** by modifying values and saving to see changes

### What Students Will See:

- **Example1**: Cards with different themes, all styled using variables
- **Example2**: Buttons with various styles created from mixins, flexbox-centered cards
- **Example3**: Pricing cards with auto-contrasting text colors and calculated spacing

---

## Note About styles.css

The `styles.css` file will be **automatically generated** when you compile the SCSS files using Live Sass Compiler. You don't need to create it manually - the extension creates it for you when you click "Watch Sass" and save the `.scss` file.

---

## Complete Week2 Structure

```
Week2/
├── README.md                    (SCSS intro + VS Code setup)
├── example-styles.scss          (Comprehensive SCSS examples)
├── Example1/
│   ├── index.html
│   └── styles.scss             (Variables only)
├── Example2/
│   ├── index.html
│   └── styles.scss             (Mixins focus)
├── Example3/
│   ├── index.html
│   └── styles.scss             (Functions focus)
└── Activity_1_SCSS/
    ├── README.md
    ├── index.html
    ├── script.js
    ├── styles.scss
    └── solution/
        ├── styles.scss
        └── script.js
```

All examples are ready to use for teaching focused SCSS concepts! 🎉
