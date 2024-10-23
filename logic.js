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

document.addEventListener('DOMContentLoaded', parentChart);

function parentChart() {
    fetch("http://127.0.0.1:5000/parent_jobs/")  // Ensure the correct API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Log the data for verification
            
            let traceMother = {
                x: data.mother_job_counts.map(item => item._id),
                y: data.mother_job_counts.map(item => item.count),
                type: 'bar',
                name: "Mother's Job",
                marker: {
                    color: 'rgba(255, 99, 132, 0.6)',
                    line: {
                        color: 'red', 
                        width: 1 
                    }
                }
            };
            // Plot Father Job Chart
            let traceFather = {
                x: data.father_job_counts.map(item => item._id),
                y: data.father_job_counts.map(item => item.count),
                type: 'bar',
                name: "Father's Job",
                marker: {
                    color: 'rgba(144, 238, 144, 0.6)',
                    line: {
                        color: 'green', 
                        width: 1 
                    }
                }
            };
            // Data arrays for each chart
            let dataMother = [traceMother];
            let dataFather = [traceFather];
            // Layout for Mother Job Chart
            let layoutMother = {
                title: "Mother's Job vs Dropout Counts",
                margin: {l: 100, r: 100, t: 100, b: 100},
                xaxis: {
                    title: 'Occupation Type'
                },
                yaxis: {
                    title: 'Dropout Counts'
                }
            };
            // Layout for Father Job Chart
            let layoutFather = {
                title: "Father's Job vs Dropout Counts",
                margin: {l: 100, r: 100, t: 100, b: 100},
                xaxis: {
                    title: 'Occupation Type'
                },
                yaxis: {
                    title: 'Dropout Counts'
                }
            };
            // Render the Mother Job Chart
            Plotly.newPlot('MotherJobChart', dataMother, layoutMother);
            // Render the Father Job Chart
            Plotly.newPlot('FatherJobChart', dataFather, layoutFather);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}
createChart();
parentChart();
