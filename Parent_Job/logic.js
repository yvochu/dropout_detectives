fetch('http://localhost:5000/parents_job/')
  .then(response => response.json())
  .then(data => {
    const motherJobData = data.map(item => item.Mother_Job); // Adjust based on your data structure
    const fatherJobData = data.map(item => item.Father_Job); // Adjust based on your data structure
    
    const labels = ['health', 'other', 'services', 'teacher', "at_home"];
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Mothers Job',
          data: motherJobData,
          backgroundColor: Utils.CHART_COLORS.red,
        },
        {
          label: 'Fathers Job',
          data: fatherJobData,
          backgroundColor: Utils.CHART_COLORS.blue,
        },
      ]
    };
    
    const config = {
      type: 'bar',
      data: chartData,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Parental Jobs vs Dropouts'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    };
    
    const myChart = new Chart(
      document.getElementById('ParentJob'),
      config
    );
  })
  .catch(error => console.error('Error fetching data:', error));