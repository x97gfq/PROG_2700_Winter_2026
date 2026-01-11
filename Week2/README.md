# Week 2: Introduction to SCSS

## What is SCSS?

**SCSS (Sassy CSS)** is the modern syntax for **SASS (Syntactically Awesome Style Sheets)**, a CSS preprocessor that extends the capabilities of regular CSS. SCSS allows you to write more maintainable, organized, and powerful stylesheets using features like variables, nesting, mixins, and functions.

### Why Use SCSS?

- **Variables**: Store and reuse values like colors, fonts, and spacing
- **Nesting**: Write selectors in a hierarchical structure that mirrors your HTML
- **Mixins**: Create reusable chunks of CSS that can accept parameters
- **Functions**: Perform calculations and transformations on values
- **Partials & Imports**: Split your CSS into multiple files for better organization
- **Operators**: Perform math operations directly in your stylesheets

### SCSS vs SASS

There are two syntaxes for SASS:
- **SCSS (.scss)**: Uses curly braces `{}` and semicolons `;` - looks similar to regular CSS
- **SASS (.sass)**: Uses indentation and no semicolons - older syntax

**We will be using SCSS** because it's more widely adopted and easier to learn if you already know CSS.

## Installing the VS Code Extension

To compile SCSS to CSS, you need a compiler. The easiest way to do this in VS Code is with the **Live Sass Compiler** extension.

### Step-by-Step Installation

1. **Open VS Code**

2. **Open the Extensions Panel**
   - Click the Extensions icon in the Activity Bar (left sidebar)
   - Or press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)

3. **Search for "Live Sass Compiler"**
   - Type "Live Sass Compiler" in the search box
   - Look for the extension by **Glenn Marks** (or **Ritwick Dey** for the original version)

4. **Install the Extension**
   - Click the **Install** button
   - Wait for the installation to complete

5. **Verify Installation**
   - You should now see "Watch Sass" in the status bar at the bottom of VS Code
   - If you don't see it, try reloading VS Code

### How to Use Live Sass Compiler

1. **Create an SCSS file** (e.g., `styles.scss`)

2. **Click "Watch Sass" in the status bar**
   - This button appears at the bottom of VS Code when you have an `.scss` file open
   - The button will change to "Watching..." when active

3. **Save your SCSS file**
   - Every time you save, the extension automatically compiles your `.scss` file to `.css`
   - You'll see a new `styles.css` file created in the same directory

4. **Link the CSS file in your HTML**
   ```html
   <link rel="stylesheet" href="styles.css">
   ```
   **Note**: You link to the compiled `.css` file, not the `.scss` file!

5. **Stop watching**
   - Click "Watching..." in the status bar to stop auto-compilation

### Optional: Configure the Extension

You can customize where compiled CSS files are saved by adding settings to your VS Code settings.json:

```json
{
  "liveSassCompile.settings.formats": [
    {
      "format": "expanded",
      "extensionName": ".css",
      "savePath": null
    }
  ],
  "liveSassCompile.settings.generateMap": false
}
```

## Getting Started

Check out `example-styles.scss` in this folder to see practical examples of SCSS features with detailed comments explaining how each feature works.

## Resources

- [Official SASS Documentation](https://sass-lang.com/documentation)
- [SCSS Basics Tutorial](https://sass-lang.com/guide)
- [Live Sass Compiler on VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)
