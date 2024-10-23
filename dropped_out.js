<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Box Plots from Flask API</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
    <h1>Box Plots for Student Data</h1>
    <div id="box-plot-alcohol" style="width: 100%; height: 400px;"></div>
    <div id="box-plot-going-out" style="width: 100%; height: 400px;"></div>

    <script>
        // Fetch data from the Flask API
        fetch("http://localhost:5000/alcohol/")
            .then(response => response.json())
            .then(data => {
                // Prepare data for Weekend Alcohol Consumption Box Plot
                const alcoholDataYes = data.filter(d => d.Dropped_Out === "Yes").map(d => d.Weekend_Alcohol_Consumption);
                const alcoholDataNo = data.filter(d => d.Dropped_Out === "No").map(d => d.Weekend_Alcohol_Consumption);

                const alcoholTraceYes = {
                    type: 'box',
                    name: 'Dropped Out: Yes',
                    boxpoints: 'all',
                    y: alcoholDataYes,
                    marker: { color: 'red' }
                };

                const alcoholTraceNo = {
                    type: 'box',
                    name: 'Dropped Out: No',
                    boxpoints: 'all',
                    y: alcoholDataNo,
                    marker: { color: 'blue' }
                };

                const alcoholLayout = {
                    title: 'Weekend Alcohol Consumption by Dropout Status',
                    yaxis: { title: 'Weekend Alcohol Consumption' },
                    boxmode: 'group'
                };

                Plotly.newPlot('box-plot-alcohol', [alcoholTraceYes, alcoholTraceNo], alcoholLayout);

                // Prepare data for Going Out Frequency Box Plot
                const goingOutDataYes = data.filter(d => d.Dropped_Out === "Yes").map(d => d.Going_Out);
                const goingOutDataNo = data.filter(d => d.Dropped_Out === "No").map(d => d.Going_Out);

                const goingOutTraceYes = {
                    type: 'box',
                    name: 'Dropped Out: Yes',
                    boxpoints: 'all',
                    y: goingOutDataYes,
                    marker: { color: 'red' }
                };

                const goingOutTraceNo = {
                    type: 'box',
                    name: 'Dropped Out: No',
                    boxpoints: 'all',
                    y: goingOutDataNo,
                    marker: { color: 'blue' }
                };

                const goingOutLayout = {
                    title: 'Going Out Frequency by Dropout Status',
                    yaxis: { title: 'Going Out Frequency' },
                    boxmode: 'group'
                };

                Plotly.newPlot('box-plot-going-out', [goingOutTraceYes, goingOutTraceNo], goingOutLayout);
            })
            .catch(error => console.error('Error fetching data:', error));
    </script>
</body>
</html>
