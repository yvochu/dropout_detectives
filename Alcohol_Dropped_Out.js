<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Table Visualization</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <div id="data-table" style="width: 100%; height: 600px;"></div>
  
  <script>
  $(document).ready(function() {
    // Fetch data from the Flask API
    $.getJSON("http://localhost:5000/alcohol/", function(data) {
      // Process data
      let weekendAlcohol = [];
      let goingOut = [];
      let droppedOut = [];

      data.forEach(d => {
        weekendAlcohol.push(d.Weekend_Alcohol_Consumption);
        goingOut.push(d.Going_Out);
        droppedOut.push(d.Dropped_Out ? "Yes" : "No");
      });

      // Create table
      let tableData = [{
        type: 'table',
        header: {
          values: [["<b>Weekend Alcohol Consumption</b>"], ["<b>Going Out Frequency</b>"], ["<b>Dropped Out</b>"]],
          align: "center",
          line: {width: 1, color: 'black'},
          fill: {color: "grey"},
          font: {family: "Arial", size: 12, color: "white"}
        },
        cells: {
          values: [weekendAlcohol, goingOut, droppedOut],
          align: "center",
          line: {color: "black", width: 1},
          fill: {color: ['white', 'lightgrey']},
          font: {family: "Arial", size: 11, color: ["black"]}
        }
      }];

      // Plot the table
      Plotly.newPlot('data-table', tableData);
    });
  });
  </script>
  </body>
  </head>
  