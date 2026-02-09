# PokeDex (jQuery Edition)

This is a jQuery-based version of the Week 6 Frontend Client. It demonstrates how to consume the Dockerized Node.js API using jQuery for DOM manipulation and AJAX requests.

## Setup

1.  Ensure the backend API is running (refer to the main Week 6 instructions).
2.  Open `index.html` in your browser.
    - You can simply double-click the file, or serve it using a local server (e.g., Live Server in VS Code).

## Key jQuery Features Used

-   **`$(document).ready()`**: Ensures the DOM is fully loaded before running script.
-   **`$.ajax()`**: Performs the asynchronous HTTP GET request to the API.
    -   `dataType: 'json'` automatically parses the JSON response.
-   **`$('#id')` Selector**: Selects the container element.
-   **`$container.empty()`**: Clears the container's content.
-   **`$.each()`**: Iterates over the array of pokemon data.
-   **`$('<div>')`**: Creates a new DOM element.
-   **`.addClass()`**: Adds a CSS class.
-   **`.html()`**: Sets the inner HTML of an element.
-   **`.append()`**: Adds the new element to the DOM.
