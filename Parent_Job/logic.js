document.addEventListener('DOMContentLoaded', createChart);

function createChart() {
    fetch("http://127.0.0.1:5000/parent_jobs/")  // Ensure the correct API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Log the data for verification
            
            document.getElementById('filterButton').addEventListener('click', function() {
                let selectedValue = document.getElementById('familySupport').value;
                let filteredData;
                if (selectedValue === 'yes') {
                    filteredData = data.filter(item => item.family_support === true);
                } else if (selectedValue === 'no') {
                    filteredData = data.filter(item => item.family_support === false);
                } else {
                    filteredData = data; 
                }
            });
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





// function createChart() {
//     const data = fetch('http://127.0.0.1:5000/mother_job/')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);

//             let trace1 = {
//                 x: data.map(data => data._id),
//                 y: data.map(data => data.count),
//                 type: "bar",
//             };

//             let data_list = [trace1];

//             // Apply a title to the layout
//             let layout = {
//                 title: "Mother Job Dropout Counts",
//                 margin: {
//                     l: 100,
//                     r: 100,
//                     t: 100,
//                     b: 100
//                 }
//             };

//             // Render the plot to the div tag with id "plot"
//             Plotly.newPlot("MotherJobChart", data_list, layout);

//             // const labels = ['health', 'other', 'services', 'teacher', "at_home"];
//             // const datasets = [{
//             //     label: 'Mothers Job',
//             //     data: motherJobData,
//             //     // backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             //     // borderColor: 'rgba(75, 192, 192, 1)',
//             // }]
//             // const ctx = document.getElementById('ParentJobChart').getContext('2d');
//             // const ParentJobChart = new Chart(ctx, {
//             //     type: 'bar',
//             //     data: motherJobData
//             //     // data: {
//             //     //     labels: labels,
//             //     //     datasets: datasets
//             //     // },
//             //     // options: {
//             //     //     responsive: true,
//             //     //     plugins: {
//             //     //         title: {
//             //     //             display: true,
//             //     //             text: 'Parental Occupation vs Dropouts'
//             //     //         },
//             //     //         tooltip: {
//             //     //             callbacks: {
//             //     //                 label: function (tooltipItem) {
//             //     //                     const Occupation = tooltipItem.label;
//             //     //                     const data = tooltipItem.raw;
//             //     //                     return `Occupation: ${Occupation}, Dropouts: ${data.join(", ")}`;
//             //     //                 }
//             //     //             }
//             //     //         }
//             //     //     },
//             //     //     scales: {
//             //     //         x: {
//             //     //             title: {
//             //     //                 display: true,
//             //     //                 text: 'Occupation'
//             //     //             }
//             //     //         },
//             //     //         y: {
//             //     //             title: {
//             //     //                 display: true,
//             //     //                 text: 'Dropouts'
//             //     //             },
//             //     //             min: 0,
//             //     //             max: 20
//             //     //         }
//             //     //     }
//             //     // }
//             // });
//         })

// }

// createChart();

// function createChart() {
//     const data = fetch('http://127.0.0.1:5000/father_job/')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);

//             let trace1 = {
//                 x: data.map(data => data._id),
//                 y: data.map(data => data.count),
//                 type: "bar",
//             };

//             let data_list = [trace1];

//             // Apply a title to the layout
//             let layout = {
//                 title: "Father Job Dropout Counts",
//                 margin: {
//                     l: 100,
//                     r: 100,
//                     t: 100,
//                     b: 100
//                 }
//             };

//             // Render the plot to the div tag with id "plot"
//             Plotly.newPlot("FatherJobChart", data_list, layout);

//             // const labels = ['health', 'other', 'services', 'teacher', "at_home"];
//             // const datasets = [{
//             //     label: 'Mothers Job',
//             //     data: motherJobData,
//             //     // backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             //     // borderColor: 'rgba(75, 192, 192, 1)',
//             // }]
//             // const ctx = document.getElementById('ParentJobChart').getContext('2d');
//             // const ParentJobChart = new Chart(ctx, {
//             //     type: 'bar',
//             //     data: motherJobData
//             //     // data: {
//             //     //     labels: labels,
//             //     //     datasets: datasets
//             //     // },
//             //     // options: {
//             //     //     responsive: true,
//             //     //     plugins: {
//             //     //         title: {
//             //     //             display: true,
//             //     //             text: 'Parental Occupation vs Dropouts'
//             //     //         },
//             //     //         tooltip: {
//             //     //             callbacks: {
//             //     //                 label: function (tooltipItem) {
//             //     //                     const Occupation = tooltipItem.label;
//             //     //                     const data = tooltipItem.raw;
//             //     //                     return `Occupation: ${Occupation}, Dropouts: ${data.join(", ")}`;
//             //     //                 }
//             //     //             }
//             //     //         }
//             //     //     },
//             //     //     scales: {
//             //     //         x: {
//             //     //             title: {
//             //     //                 display: true,
//             //     //                 text: 'Occupation'
//             //     //             }
//             //     //         },
//             //     //         y: {
//             //     //             title: {
//             //     //                 display: true,
//             //     //                 text: 'Dropouts'
//             //     //             },
//             //     //             min: 0,
//             //     //             max: 20
//             //     //         }
//             //     //     }
//             //     // }
//             // });
//         })

// }

// createChart();