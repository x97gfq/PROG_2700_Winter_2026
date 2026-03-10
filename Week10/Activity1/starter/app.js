// OLD-STYLE ES5 JavaScript — your job is to modernise this with ES6+.
// Do not change what the code DOES or what it outputs — only HOW it is written.

var weatherData = [
    { city: 'Halifax',   temp: 4,  condition: 'Cloudy', wind: 20 },
    { city: 'Toronto',   temp: 8,  condition: 'Sunny',  wind: 12 },
    { city: 'Vancouver', temp: 11, condition: 'Rainy',  wind: 30 },
    { city: 'Calgary',   temp: -2, condition: 'Snowy',  wind: 45 },
    { city: 'Montreal',  temp: 2,  condition: 'Cloudy', wind: 18 },
];

// TODO 1: Change var to const / let throughout this file.

// TODO 2: Convert to an arrow function.
// TODO 5: Replace the for loop with .reduce()
function getHottestCity(data) {
    var hottest = data[0];
    for (var i = 1; i < data.length; i++) {
        if (data[i].temp > hottest.temp) {
            hottest = data[i];
        }
    }
    return hottest.city + ' at ' + hottest.temp + '°C';  // TODO 3: template literal
}

// TODO 2: Convert to an arrow function.
// TODO 5: Replace the for loop with .filter().map()
function getCitiesByCondition(data, condition) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].condition === condition) {
            result.push(data[i].city);
        }
    }
    return result;
}

// TODO 2: Convert to an arrow function.
// TODO 3: Replace string concatenation with a template literal.
// TODO 4: Destructure the parameter instead of pulling out properties manually.
function buildSummary(cityObj) {
    var city      = cityObj.city;
    var temp      = cityObj.temp;
    var condition = cityObj.condition;
    var wind      = cityObj.wind;
    return city + ': ' + temp + '°C, ' + condition + ', wind ' + wind + ' km/h';
}

// TODO 2: Convert to an arrow function.
// TODO 5: Replace the for loop with .map() + spread operator.
function addFeelsLike(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var city = data[i];
        var updated = {
            city:      city.city,
            temp:      city.temp,
            condition: city.condition,
            wind:      city.wind,
            feelsLike: Math.round(city.temp - city.wind / 10)
        };
        result.push(updated);
    }
    return result;
}

// TODO 6: Rewrite innerHTML using a single template literal instead of concatenation.
function render() {
    var hottest   = getHottestCity(weatherData);
    var cloudy    = getCitiesByCondition(weatherData, 'Cloudy');
    var summaries = weatherData.map(function(c) { return buildSummary(c); });
    var withFeels = addFeelsLike(weatherData);

    var output = document.getElementById('output');
    output.innerHTML =
        '<p><strong>Hottest city:</strong> ' + hottest + '</p>' +
        '<p><strong>Cloudy cities:</strong> ' + cloudy.join(', ') + '</p>' +
        '<h3>Summaries</h3>' +
        summaries.map(function(s) { return '<p>' + s + '</p>'; }).join('') +
        '<h3>With Feels-Like Temperature</h3>' +
        withFeels.map(function(c) {
            return '<p>' + c.city + ': ' + c.temp + '°C (feels like ' + c.feelsLike + '°C)</p>';
        }).join('');
}

render();
