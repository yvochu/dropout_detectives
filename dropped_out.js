<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alcohol Consumption Visualization</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Alcohol Consumption Data</h1>
    <canvas id="alcoholChart" width="400" height="200"></canvas>
    <script>
        async function fetchData() {
            const response = await fetch('/alcohol/');
            const data = await response.json();

            const weekendConsumption = data.data.map(item => item.Weekend_Alcohol_Consumption);
            const goingOut = data.data.map(item => item.Going_Out);
            const labels = data.data.map((_, index) => `Entry ${index + 1}`);

            const ctx = document.getElementById('alcoholChart').getContext('2d');
            const alcoholChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Weekend Alcohol Consumption',
                            data: weekendConsumption,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                        {
                            label: 'Going Out',
                            data: goingOut,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        fetchData();
    </script>
</body>
</html>
