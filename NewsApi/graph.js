let chart;
const symbols = ["IBM", "GOOG", "AAPL"];
const container = document.getElementById("container");
if (container) {
  // Style the container element as a block element
  container.style.display = "block";
  // Remove the default bullet points
  container.style.listStyleType = "none";
  symbols.forEach((symbol) => {
    const link = document.createElement('button');
    link.innerText = symbol;
    // Style the link as a block element
    link.style.display = "block";
    link.addEventListener("click", () => {
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=WASX3VCCDMOOF6IQ`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract the time series data from the response object
          const timeSeries = data["Time Series (Daily)"];
          // Convert the time series data into arrays of x and y values
          const labels = [];
          const values = [];
          for (const date in timeSeries) {
            labels.push(date);
            values.push(parseFloat(timeSeries[date]["4. close"]));
          }
          // Get the element to render the graph in
          const canvas = document.getElementById("myChart");
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (chart) {
              chart.destroy();
            }
            // Create the chart using Chart.js
            chart = new Chart(ctx, {
              type: "line",
              data: {
                labels: labels,
                datasets: [
                  {
                    label: `${symbol} Stock`,
                    data: values,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: false,
                  },
                ],
              },
              options: {},
            });
          } else {
            console.error('Canvas element with id "myChart" not found');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    container.appendChild(link);
  });
} else {
  console.error('Container element with id "container" not found');
}
