/**
 * Created by Johan Karlsteen on 2017-10-08.
 */
({
        displayData : function(component, event, helper, readings) {
            var config = {
                type: 'line',
                data: {
                    labels: readings.ts,
                    datasets: [{
                        label: 'Temperature',
                        backgroundColor: 'red',
                        borderColor: 'red',
                        data: readings.temperature,
                        yAxisID: "y-axis-1",
                        fill: false,
                    },
                    {
                        label: 'Humidity',
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        data: readings.humidity,
                        yAxisID: "y-axis-2",
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    title:{
                        display:true,
                        text:'Temperature'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        yAxes: [{
                            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            position: "left",
                            id: "y-axis-1",
                        }, {
                            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            position: "right",
                            id: "y-axis-2",

                            // grid line settings
                            gridLines: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                        }],
                    }
                }
            };
            var ctx = document.getElementById("temperature").getContext("2d");
            window.myLine = new Chart(ctx, config);
        }
})