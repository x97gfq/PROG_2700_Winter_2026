# Week 5: JSON & Data Handling

## 📚 Overview

This week you'll learn about JSON (JavaScript Object Notation) and how to work with data in JavaScript. You'll discover how to fetch data from APIs, handle forms, manage errors, and build production-ready web applications.

---

## 📁 What's Included

### Lecture 1: JSON Fundamentals

**[Example 1: JSON Syntax & Structure](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example1/index.html)**
- Learn the difference between JSON strings and JavaScript objects
- Understand when to use `JSON.parse()` and `JSON.stringify()`
- See why we need to convert between formats

**[Example 2: Working with JSON Data](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example2/index.html)**
- Access nested data in JSON objects
- Learn dot notation vs bracket notation
- Practice updating data

**[Example 3: Fetching from APIs](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example3/index.html)**
- Introduction to the `fetch()` API
- Learn async/await basics
- Handle errors gracefully
- Work with real Pokemon data!

**[Example 3b: Multiple Pokemon](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example3b/index.html)**
- Create buttons dynamically from an array
- Reusable fetch functions with parameters
- Multiple API calls with different data

**[Activity 1: Pokemon Explorer](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Activity1/index.html)** 🎮
Build your own Pokemon search tool! Fetch Pokemon data and display it beautifully.

---

### Lecture 2: Advanced Patterns

**[Example 4: Form Data → JSON](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example4/index.html)**
- Convert form input to JSON format
- Collect different input types
- Prepare data for API submission

**[Example 5: Advanced Error Handling](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example5/index.html)**
- Handle network errors, timeouts, HTTP errors
- Implement retry logic
- Provide user-friendly error messages

**[Example 6: Debugging JSON & APIs](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example6/index.html)**
- Learn common JSON errors and how to fix them
- Master DevTools Network tab
- Debug API issues like a pro

**[Lab 5: JSON Load, Validate & Persist](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Lab5/README.md)** 🔬
In-class lab (Friday): Load JSON, validate data against schema, persist to localStorage.

**[Activity 2: Pokemon Team Builder](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Activity2/index.html)** ⚔️
Build a team of up to 6 Pokemon with form validation, error handling, and team statistics!

---

## 🎯 Learning Goals

By the end of Week 5, you'll be able to:

**Lecture 1:**
- ✓ Explain what JSON is and why it's used
- ✓ Convert between JSON strings and JavaScript objects
- ✓ Access data in nested JSON structures
- ✓ Use `fetch()` to get data from APIs
- ✓ Handle asynchronous operations with async/await
- ✓ Display API data on a web page

**Lecture 2:**
- ✓ Convert form data to JSON format
- ✓ Implement robust error handling with retry logic
- ✓ Debug JSON and API issues using DevTools
- ✓ Validate JSON data against a schema
- ✓ Persist data using localStorage
- ✓ Build production-ready fetch patterns

---

## 🚀 How to Learn

### Recommended Approach:

**Lecture 1 Materials:**
1. Start with [Example1](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example1/index.html) - JSON basics
2. Progress to [Example2](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example2/index.html) - Data access
3. Move to [Example3](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example3/index.html) - Fetch API
4. Try [Example3b](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example3b/index.html) - Dynamic elements
5. Attempt [Activity1](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Activity1/index.html) - Use hints!

**Lecture 2 Materials:**
1. Study [Example4](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example4/index.html) - Forms to JSON
2. Learn from [Example5](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example5/index.html) - Error handling patterns
3. Master [Example6](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Example6/index.html) - Debugging techniques
4. Complete [Lab5](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Lab5/README.md) - Practice validation
5. Build[Activity2](file:///C:/Repos/PROG_2700_Winter_2026/Week5/Activity2/index.html) - Combine everything!

---

## 🔗 Helpful Resources

### Documentation:
- [W3Schools JSON Tutorial](https://www.w3schools.com/js/js_json_intro.asp)
- [W3Schools Fetch API](https://www.w3schools.com/js/js_api_fetch.asp)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [MDN: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [JSONLint - Validate JSON](https://jsonlint.com/)

### Videos:
- [Web Dev Simplified - JSON & Fetch](https://www.youtube.com/@WebDevSimplified)
- [Engineer Man - Working with APIs](https://www.youtube.com/@EngineerMan)
- [Fireship - JSON in 100 Seconds](https://www.youtube.com/@Fireship)

---

## 💡 Tips for Success

### Understanding JSON:
- JSON is a **string format** for data exchange
- JavaScript objects are **in-memory** data structures
- You need to convert between them for storage/transmission

### Working with fetch():
- Always check `response.ok` before parsing
- Use try-catch for error handling
- Don't forget `await` with async operations
- Check the Network tab in DevTools to debug

### Working with Forms:
- Prevent default form submission with `e.preventDefault()`
- Convert form values to proper data types
- Validate input before fetching from API
- Provide clear error messages

### Debugging:
- Use `console.log()` liberally
- Open DevTools Network tab for API calls
- Use JSONLint to validate JSON syntax
- Check for typos in Pokemon names!

---

## 🎮 Try These Pokemon

For testing activities:
- pikachu, charizard, bulbasaur
- squirtle, eevee, mewtwo
- gengar, snorlax, dragonite, mew

**Tip:** Pokemon names are all lowercase, no spaces!

---

## 🏆 Extension Challenges

### Easy:
1. Add clear button to reset displays
2. Show loading animations instead of text
3. Display more Pokemon stats
4. Add Pokemon type colors

### Medium:
5. Add "Random Pokemon" button
6. Create search history with localStorage
7. Filter Pokemon by type
8. Show evolution chains

### Hard:
9. Build complete Pokedex with pagination
10. Add team comparison feature
11. Export data to downloadable JSON file
12. Implement caching to reduce API calls

---

## ❓ Common Questions

**Q: The Pokemon API isn't working!**  
A: Check your internet connection and Pokemon name spelling.

**Q: I get a 404 error**  
A: Pokemon name is misspelled or doesn't exist. Try "pikachu".

**Q: What's the difference between JSON and an object?**  
A: JSON is a string, objects are JavaScript data. See Example 1!

**Q: When do I use JSON.parse() vs JSON.stringify()?**  
A: `parse()` = string → object. `stringify()` = object → string.

**Q: My form data isn't working**  
A: Did you prevent default form submission? Check `e.preventDefault()`.

**Q: How do I debug API errors?**  
A: Open DevTools Network tab to see the actual request and response.

---

## ✅ Prerequisites

You should be comfortable with:
- JavaScript variables, functions, and conditionals
- Basic DOM manipulation
- HTML forms
- CSS basics
- Using the browser console

---

## 📝 Need Help?

- Review the examples again
- Check the external resources
- Look at the hints in TODO comments
- Use `console.log()` to debug
- Check the solution (but try first!)
- Ask your instructor or classmates

---

**Happy coding! 🚀**

*Remember: The best way to learn is by doing. Don't just read the code - type it, break it, fix it, and experiment!*
