// Fetch data from the API
async function fetchData() {
    const response = await fetch('http://127.0.0.1:5000/failures/');
    const data = await response.json();
    return data;
}

async function createChart() {
    const data = await fetchData();

    // Group data by "Number_of_Failures" for box plots
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.Number_of_Failures]) {
            groupedData[item.Number_of_Failures] = [];
        }
        groupedData[item.Number_of_Failures].push(item.Final_Grade);
    });

    const labels = Object.keys(groupedData);
    const datasets = [{
        label: 'Final Grade Distribution by Number of Failures',
        data: labels.map(failures => groupedData[failures]),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        boxPlot: true
    }];

    const ctx = document.getElementById('failuresGradeChart').getContext('2d');
    const failuresGradeChart = new Chart(ctx, {
        type: 'boxplot',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Box Plot for Number of Failures vs Final Grade'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const failures = tooltipItem.label;
                            const data = tooltipItem.raw;
                            return `Failures: ${failures}, Grades: ${data.join(", ")}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Failures'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Final Grade'
                    },
                    min: 0,
                    max: 20
                }
            }
        }
    });
}

function MotherChart(){
 //javascript code to make mother bar chart
}

function FatherChart(){
 //code for father bar
}

createChart();
MotherChart();
FatherChart();

