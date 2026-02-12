# Week 6 - jQuery UI & Animations Examples

This folder contains three comprehensive examples demonstrating jQuery UI widgets and jQuery animation techniques.

## 📁 Example 1 - jQuery UI Basics

**Location:** `Week6/Example1/`

### What It Demonstrates
This example showcases the core jQuery UI widgets that make creating interactive interfaces easy and accessible.

### Features
- **Accordion Widget** - Collapsible content sections with smooth animations
- **Datepicker Widget** - Interactive calendar for date selection with year/month navigation
- **Dialog Widget** - Modal popup windows with customizable buttons
- **Tabs Widget** - Organized content navigation with fade effects
- **Slider Widget** - Visual value selection with real-time updates

### How to Use
1. Open `index.html` in your web browser
2. Interact with each widget:
   - Click accordion headers to expand/collapse sections
   - Click the datepicker input to select a date
   - Click "Open Dialog" to see the modal popup
   - Switch between tabs to see different content
   - Drag the slider to adjust the value

### Key Learning Points
- How to initialize jQuery UI widgets
- Customizing widget options and themes
- Handling widget events
- Styling widgets with CSS

---

## 📁 Example 2 - jQuery Animations

**Location:** `Week6/Example2/`

### What It Demonstrates
This example explores the various animation methods available in jQuery, from basic to advanced techniques.

### Features
- **Basic Animations**
  - Fade Toggle - Smooth opacity transitions
  - Slide Toggle - Height-based animations
  - Show/Hide - Quick visibility changes

- **Custom Animations**
  - Move Right - Position-based animations
  - Grow - Size transformations
  - Spin & Scale - Combined effects with rotation

- **Chained Animations** - Sequential animation sequences
- **Multiple Element Animations** - Simultaneous and staggered effects
- **Easing Functions** - Linear vs. swing timing demonstrations

### How to Use
1. Open `index.html` in your web browser
2. Click different buttons to see various animation effects
3. Observe how animations can be:
   - Combined and chained together
   - Applied to multiple elements
   - Timed with different easing functions

### Key Learning Points
- Basic jQuery animation methods (`.fadeToggle()`, `.slideToggle()`, `.animate()`)
- Creating custom animations with `.animate()`
- Chaining animations for sequential effects
- Using `.each()` with `.delay()` for staggered animations
- Understanding easing functions (linear vs. swing)

---

## 📁 Example 3 - Interactive Task Manager (Summary Example)

**Location:** `Week6/Example3/`

### What It Demonstrates
This comprehensive example combines both jQuery UI widgets and animations to create a fully functional task management application.

### Features

#### jQuery UI Widgets Used
- **Accordion** - Displays tasks in collapsible sections
- **Dialog** - Modal form for adding new tasks
- **Datepicker** - Due date selection
- **Slider** - Task progress tracking

#### jQuery Animations Used
- Smooth transitions when adding/removing tasks
- Animated statistics counters
- Highlight effects on task completion
- Fade and slide effects throughout the interface

#### Application Features
- ✅ Add new tasks with title, description, due date, priority, and progress
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks with confirmation dialog
- ✅ Filter tasks by priority (high/medium/low)
- ✅ Clear all completed tasks at once
- ✅ Real-time statistics dashboard
- ✅ Responsive design for mobile and desktop

### How to Use
1. Open `index.html` in your web browser
2. Click "Add New Task" to create a task:
   - Enter a title (required)
   - Add a description (optional)
   - Select a due date using the datepicker
   - Choose priority level (low/medium/high)
   - Set initial progress with the slider
3. Click on task headers to expand and view details
4. Use the checkmark button to mark tasks complete
5. Use the trash button to delete tasks
6. Filter tasks by priority using the dropdown
7. Clear completed tasks with the "Clear Completed" button

### Key Learning Points
- Combining multiple jQuery UI widgets in one application
- Managing application state with JavaScript
- Dynamic DOM manipulation with jQuery
- Event handling and delegation
- Creating smooth user experiences with animations
- Form validation and data management
- Responsive design principles

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- No installation required - all libraries are loaded from CDNs

### Running the Examples
1. Navigate to the example folder you want to view
2. Double-click the `index.html` file, or
3. Right-click `index.html` and select "Open with" → your preferred browser

### File Structure
Each example contains:
- `index.html` - HTML structure and content
- `styles.css` - Custom styling and theme
- `script.js` - jQuery functionality and event handlers

---

## 📚 Resources

### jQuery Documentation
- [jQuery API Documentation](https://api.jquery.com/)
- [jQuery Learning Center](https://learn.jquery.com/)

### jQuery UI Documentation
- [jQuery UI Demos](https://jqueryui.com/demos/)
- [jQuery UI API Documentation](https://api.jqueryui.com/)

### Animation Resources
- [jQuery Effects](https://api.jquery.com/category/effects/)
- [jQuery .animate()](https://api.jquery.com/animate/)

---

## 💡 Tips for Learning

1. **Experiment** - Modify the code and see what happens
2. **Read the Comments** - The JavaScript files contain helpful explanations
3. **Use Developer Tools** - Open your browser's console (F12) to see logs and debug
4. **Try Variations** - Change animation durations, easing functions, and widget options
5. **Build Your Own** - Use these examples as templates for your own projects

---

## 🎨 Customization Ideas

- Change color schemes in the CSS files
- Add new widgets to Example 1
- Create new animation combinations in Example 2
- Add features to the Task Manager (categories, search, export, etc.)
- Modify animation timings and easing functions
- Add sound effects or additional visual feedback

---

## 📝 Notes

- All examples use jQuery 3.6.0 and jQuery UI 1.13.2 from CDNs
- Example 3 uses Font Awesome 6.4.0 for icons
- All examples are fully responsive and work on mobile devices
- No server or backend required - everything runs in the browser

---

**Happy Coding! 🎉**
