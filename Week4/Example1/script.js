// ============================================
// JavaScript Literal Object Example
// ============================================

// Define an array of product objects (literal objects)
const products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 899.99,
        inStock: true
    },
    {
        id: 2,
        name: "Desk Chair",
        category: "Furniture",
        price: 149.99,
        inStock: true
    },
    {
        id: 3,
        name: "Coffee Maker",
        category: "Appliances",
        price: 79.99,
        inStock: false
    },
    {
        id: 4,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 29.99,
        inStock: true
    },
    {
        id: 5,
        name: "Desk Lamp",
        category: "Furniture",
        price: 45.00,
        inStock: true
    }
];

console.log("=== Original Product Array ===");
console.log(products);

// Display original data in the page
document.getElementById('original').innerHTML = JSON.stringify(products, null, 2);

// ============================================
// Array Method 1: forEach()
// ============================================
// Purpose: Executes a function for each element in the array
// Does NOT return a new array

console.log("\n=== forEach() - Display each product ===");
let forEachOutput = "";

products.forEach(function (product, index) {
    const message = `${index + 1}. ${product.name} - $${product.price} (${product.inStock ? 'In Stock' : 'Out of Stock'})`;
    console.log(message);
    forEachOutput += message + "\n";
});

document.getElementById('forEach').textContent = forEachOutput;

// ============================================
// Array Method 2: filter()
// ============================================
// Purpose: Creates a new array with elements that pass a test
// Returns a new array

console.log("\n=== filter() - Products under $50 ===");

const affordableProducts = products.filter(function (product) {
    return product.price < 50;
});

console.log(affordableProducts);
document.getElementById('filter').innerHTML = JSON.stringify(affordableProducts, null, 2);

// ============================================
// Array Method 3: map()
// ============================================
// Purpose: Creates a new array by transforming each element
// Returns a new array

console.log("\n=== map() - Extract product names ===");

const productNames = products.map(function (product) {
    return product.name;
});

console.log(productNames);
document.getElementById('map').textContent = productNames.join(", ");

// Alternative map example: Create an array of formatted strings
console.log("\n=== map() - Formatted product descriptions ===");

const productDescriptions = products.map(function (product) {
    return `${product.name} (${product.category}): $${product.price}`;
});

console.log(productDescriptions);

// ============================================
// Array Method 4: reduce()
// ============================================
// Purpose: Reduces an array to a single value by executing a function
// Returns a single value

console.log("\n=== reduce() - Calculate total inventory value ===");

const totalValue = products.reduce(function (accumulator, product) {
    // Only count in-stock products
    if (product.inStock) {
        return accumulator + product.price;
    }
    return accumulator;
}, 0); // 0 is the initial value for the accumulator

console.log(`Total value of in-stock inventory: $${totalValue.toFixed(2)}`);
document.getElementById('reduce').innerHTML = `
    <strong>Total Value of In-Stock Products:</strong> $${totalValue.toFixed(2)}
    <br><br>
    <em>Calculation breakdown:</em><br>
    ${products.map(p => p.inStock ? `${p.name}: $${p.price}` : `${p.name}: $${p.price} (not counted - out of stock)`).join('<br>')}
`;

// ============================================
// Bonus: Chaining Array Methods
// ============================================
console.log("\n=== BONUS: Chaining Methods ===");

// Get the total value of in-stock electronics
const electronicsValue = products
    .filter(function (product) {
        return product.category === "Electronics" && product.inStock;
    })
    .map(function (product) {
        return product.price;
    })
    .reduce(function (total, price) {
        return total + price;
    }, 0);

console.log(`Total value of in-stock electronics: $${electronicsValue.toFixed(2)}`);
