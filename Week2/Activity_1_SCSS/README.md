# Activity 1: Converting CSS to SCSS

## Learning Objectives
By the end of this activity, you will be able to:
- Convert traditional CSS to modern SCSS syntax
- Use SCSS variables to store and reuse values
- Implement nesting to organize selectors hierarchically
- Create and use mixins for reusable style patterns
- Understand the benefits of using a CSS preprocessor

## Overview
In this activity, you will take the existing CSS from Activity 3 (JavaScript) and refactor it using SCSS features. This will demonstrate how SCSS can make your stylesheets more maintainable, organized, and powerful.

## Prerequisites
Before starting this activity, make sure you have:
1. **Installed the Live Sass Compiler extension** in VS Code
   - See the main Week2 README.md for installation instructions
2. **Basic understanding of CSS**
3. **Familiarity with CSS selectors**

## Files Provided
- `index.html` - The HTML structure (same as Activity 3)
- `script.js` - Empty file with TODO comments for JavaScript implementation
- `styles.scss` - SCSS file with TODO comments (this is what you'll work on)
- `solution/styles.scss` - Complete solution for reference
- `solution/script.js` - Complete JavaScript solution

## Your Task

### Part 1: Convert CSS to SCSS (Main Focus)

Your primary goal is to convert the CSS in `styles.scss` to use modern SCSS features:

#### Step 1: Define Variables
Create SCSS variables for all repeated values:
- Colors (background colors, text colors, button colors)
- Spacing values (padding, margin)
- Other values (border-radius, font-family, dimensions)

Example:
```scss
$primary-color: darkblue;
$card-padding: 20px;
```

#### Step 2: Use Nesting
Organize the selectors using SCSS nesting. Elements that are children of `.card` should be nested inside the `.card` selector block.

Example:
```scss
.card {
  background-color: white;
  
  .title {
    color: darkblue;
  }
}
```

#### Step 3: Create a Mixin
Create at least one mixin for the button styles. This demonstrates how to create reusable CSS blocks.

Example:
```scss
@mixin button-style($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  // ... more properties
}

.btn-primary {
  @include button-style(darkblue, white);
}
```

#### Step 4: Add Enhancements (Optional)
If you finish early, try adding:
- Hover states using `&:hover`
- Color manipulation functions like `darken()` or `lighten()`
- Additional styling to make the interface more polished

### Part 2: JavaScript Implementation (Optional)
If you want additional practice, implement the JavaScript functionality in `script.js` following the TODO comments. The solution is provided in `solution/script.js`.

## How to Complete This Activity

### Step-by-Step Instructions

1. **Open the Activity Folder**
   - Navigate to `Week2/Activity_1_SCSS/` in VS Code
   - Open `styles.scss` in the editor

2. **Read the TODO Comments**
   - The `styles.scss` file contains the original CSS at the top
   - Read through the TODO checklist to understand what needs to be done

3. **Start the SCSS Compiler**
   - With `styles.scss` open, click **"Watch Sass"** in the bottom status bar of VS Code
   - The button will change to "Watching..."
   - This will automatically compile your SCSS to CSS whenever you save

4. **Implement SCSS Features**
   - Follow the steps outlined in the TODO checklist
   - Save frequently to see your SCSS compile to CSS
   - You should see a `styles.css` file appear (this is auto-generated)

5. **Test Your Work**
   - Open `index.html` in a web browser
   - Check that the styling looks correct
   - Compare your output with the solution if needed

6. **Review the Solution**
   - When finished (or if stuck), review `solution/styles.scss`
   - Compare your approach with the solution
   - Note any differences or improvements

## Expected Output

When compiled correctly, your SCSS should produce CSS that styles the page with:
- Light blue background
- White card centered on the page
- Dark blue title and button
- Form elements with proper spacing
- Rounded corners on the card

The visual result should look identical to Activity 3, but your SCSS code should be more organized and maintainable.

## Testing Your SCSS

### Visual Testing
1. Open `index.html` in a browser
2. Verify that:
   - The page has a light blue background
   - The card is white and centered
   - The title is dark blue
   - The input field takes up full width
   - The button is dark blue with white text
   - Everything is properly spaced

### Code Review
1. Check that your SCSS uses:
   - ✅ Variables for all repeated values
   - ✅ Nesting for hierarchical selectors
   - ✅ At least one mixin
   - ✅ Comments explaining your code

## Common Issues & Troubleshooting

### SCSS Won't Compile
- **Issue**: "Watch Sass" button doesn't appear
- **Solution**: Make sure you installed the Live Sass Compiler extension and reloaded VS Code

### CSS File Not Updating
- **Issue**: Changes not reflecting in browser
- **Solution**: Make sure you're saving the `.scss` file and that "Watching..." is active

### Compilation Errors
- **Issue**: Red error messages in VS Code
- **Solution**: Check for syntax errors:
  - Missing semicolons `;`
  - Unclosed curly braces `{}`
  - Typos in variable names (must start with `$`)

### Styles Not Applied
- **Issue**: HTML loads but styles don't appear
- **Solution**: Check that `index.html` links to `styles.css` (not `styles.scss`)

## Bonus Challenges

If you complete the activity early, try these enhancements:

1. **Add Hover Effects**
   - Make the button change color on hover
   - Add a transition for smooth animation

2. **Use Color Functions**
   - Use `darken()` or `lighten()` to create color variations
   - Create a color scheme with related colors

3. **Add More Variables**
   - Create variables for font sizes
   - Add variables for transitions

4. **Implement the JavaScript**
   - Complete the `script.js` file
   - Make the random word generator functional

## Submission Checklist

Before considering this activity complete, verify:

- [ ] SCSS variables are defined for colors, spacing, and other values
- [ ] Nesting is used to organize selectors
- [ ] At least one mixin is created and used
- [ ] Code is commented to explain SCSS features
- [ ] SCSS compiles without errors
- [ ] Visual output matches the expected result
- [ ] You understand the advantages of SCSS over regular CSS

## Additional Resources

- [SCSS Basics Guide](https://sass-lang.com/guide)
- [SCSS Variables Documentation](https://sass-lang.com/documentation/variables)
- [SCSS Nesting](https://sass-lang.com/documentation/style-rules#nesting)
- [SCSS Mixins](https://sass-lang.com/documentation/at-rules/mixin)
- Main Week2 README.md for extension installation help

## Questions to Consider

After completing this activity, reflect on:
1. How does SCSS make CSS more maintainable?
2. When would you use a mixin vs. a variable?
3. What are the advantages of nesting selectors?
4. How might SCSS help in larger projects?

---

**Good luck! If you get stuck, refer to the solution files or ask your instructor for help.**
