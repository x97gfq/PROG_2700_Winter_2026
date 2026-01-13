# Activity 1 - SCSS Basics Demo

## Overview
This is a minimal example demonstrating the three core features of SCSS:
- **Variables** - Reusable values
- **Mixins** - Reusable style blocks
- **Nesting** - Organizing selectors hierarchically

## Files
- `index.html` - Simple profile card page
- `styles.scss` - SCSS source (< 40 lines)
- `styles.css` - Compiled CSS (auto-generated)

## SCSS Features Demonstrated

### 1. Variables (2)
```scss
$primary-color: #3498db;
$padding: 20px;
```

### 2. Mixin (1)
```scss
@mixin rounded-shadow {
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

### 3. Nesting
The `.profile-card` contains nested selectors for `.name`, `.title`, and `.btn`.

## How to Use

1. **Compile SCSS:**
   ```bash
   npx sass styles.scss styles.css
   ```

2. **Watch for changes:**
   ```bash
   npx sass --watch styles.scss styles.css
   ```

3. **Open in browser:**
   Open `index.html` in your browser to see the result.

## Expected Output
A simple white profile card with:
- Blue name heading
- Gray job title
- Blue rounded button
- Subtle shadow effect
