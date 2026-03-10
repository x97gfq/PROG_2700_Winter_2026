// SOLUTION: Modernised with ES6+ features.
// The output is identical to the starter — only the syntax has changed.

// TODO 1 SOLUTION: const for the dataset (it is never reassigned)
const weatherData = [
    { city: 'Halifax',   temp: 4,  condition: 'Cloudy', wind: 20 },
    { city: 'Toronto',   temp: 8,  condition: 'Sunny',  wind: 12 },
    { city: 'Vancouver', temp: 11, condition: 'Rainy',  wind: 30 },
    { city: 'Calgary',   temp: -2, condition: 'Snowy',  wind: 45 },
    { city: 'Montreal',  temp: 2,  condition: 'Cloudy', wind: 18 },
];

// TODO 2 + TODO 5 SOLUTION: arrow function + .reduce() replaces the for loop
const getHottestCity = data => {
    const hottest = data.reduce((best, city) => city.temp > best.temp ? city : best);
    return `${hottest.city} at ${hottest.temp}°C`;   // TODO 3: template literal
};

// TODO 2 + TODO 5 SOLUTION: arrow function + .filter().map() replaces the for loop
const getCitiesByCondition = (data, condition) =>
    data.filter(c => c.condition === condition).map(c => c.city);

// TODO 2 + TODO 3 + TODO 4 SOLUTION:
// Arrow function, template literal, and parameter destructuring
const buildSummary = ({ city, temp, condition, wind }) =>
    `${city}: ${temp}°C, ${condition}, wind ${wind} km/h`;

// TODO 2 + TODO 5 SOLUTION: arrow function + .map() + spread operator
// Spread (...city) copies all existing properties; we just add feelsLike on top
const addFeelsLike = data =>
    data.map(city => ({
        ...city,
        feelsLike: Math.round(city.temp - city.wind / 10)
    }));

// TODO 6 SOLUTION: single template literal with embedded .map() expressions
function render() {
    const hottest   = getHottestCity(weatherData);
    const cloudy    = getCitiesByCondition(weatherData, 'Cloudy');
    const summaries = weatherData.map(buildSummary);   // point-free: pass fn directly
    const withFeels = addFeelsLike(weatherData);

    document.getElementById('output').innerHTML = `
        <p><strong>Hottest city:</strong> ${hottest}</p>
        <p><strong>Cloudy cities:</strong> ${cloudy.join(', ')}</p>
        <h3>Summaries</h3>
        ${summaries.map(s => `<p>${s}</p>`).join('')}
        <h3>With Feels-Like Temperature</h3>
        ${withFeels.map(({ city, temp, feelsLike }) =>
            `<p>${city}: ${temp}°C (feels like ${feelsLike}°C)</p>`
        ).join('')}
    `;
}

render();
