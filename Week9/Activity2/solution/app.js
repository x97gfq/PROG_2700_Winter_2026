const API = 'https://restcountries.com/v3.1/region/south%20america?fields=name,population';

async function loadChart() {
    const res = await fetch(API);
    const data = await res.json();

    // SOLUTION — TODO 1: Sort, slice, and extract labels + values
    const top8 = data
        .sort((a, b) => b.population - a.population)
        .slice(0, 8);

    const labels = top8.map(c => c.name.common);
    const values = top8.map(c => c.population);

    // SOLUTION — TODO 2: Create the doughnut chart
    const colors = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
        '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
    ];

    new Chart(document.getElementById('popChart'), {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { font: { size: 13 } }
                },
                title: {
                    display: true,
                    text: 'Top 8 by Population',
                    font: { size: 16 }
                },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const pop = ctx.parsed.toLocaleString();
                            return ` ${ctx.label}: ${pop}`;
                        }
                    }
                }
            }
        }
    });
}

loadChart();
