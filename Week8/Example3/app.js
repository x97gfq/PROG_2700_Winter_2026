const API = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=44.65&longitude=-63.57'
    + '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum'
    + '&timezone=America/Halifax&forecast_days=7';

async function loadWeather() {
    const res = await fetch(API);
    const data = await res.json();
    const daily = data.daily;

    // Format dates as "Mon Feb 21"
    const labels = daily.time.map(d =>
        new Date(d + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })
    );

    new Chart(document.getElementById('weatherChart'), {
        data: {
            labels,
            datasets: [
                {
                    type: 'line',
                    label: 'Max Temp (°C)',
                    data: daily.temperature_2m_max,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231,76,60,0.1)',
                    tension: 0.3,
                    yAxisID: 'yTemp'
                },
                {
                    type: 'line',
                    label: 'Min Temp (°C)',
                    data: daily.temperature_2m_min,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52,152,219,0.1)',
                    tension: 0.3,
                    yAxisID: 'yTemp'
                },
                {
                    type: 'bar',
                    label: 'Precipitation (mm)',
                    data: daily.precipitation_sum,
                    backgroundColor: 'rgba(52,152,219,0.4)',
                    yAxisID: 'yPrecip'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                yTemp: { position: 'left', title: { display: true, text: 'Temperature (°C)' } },
                yPrecip: { position: 'right', title: { display: true, text: 'Precipitation (mm)' }, grid: { drawOnChartArea: false } }
            }
        }
    });
}

loadWeather();
