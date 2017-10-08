/**
 * Created by Johan Karlsteen on 2017-10-08.
 */
({
        displayTempData : function(component, event, helper, readings) {
            var config = {
                type: 'line',
                data: {
                    labels: readings.ts,
                    datasets: [{
                        label: 'Temperature',
                        backgroundColor: 'red',
                        borderColor: 'red',
                        data: readings.temperature,
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
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Timestamp'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
                }
            };
            var ctx = document.getElementById("temperature").getContext("2d");
            window.myLine = new Chart(ctx, config);
        },
        displayHumidityData : function(component, event, helper, readings) {
            var config = {
                type: 'line',
                data: {
                    labels: readings.ts,
                    datasets: [{
                        label: 'Humidity',
                        fill: false,
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        data: readings.humidity,
                    }]
                },
                options: {
                    responsive: true,
                    title:{
                        display:true,
                        text:'Humidity'
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
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Timestamp'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
                }
            };
            var ctx = document.getElementById("humidity").getContext("2d");
            window.myLine = new Chart(ctx, config);
        },
        displayDoorData : function(component, event, helper, readings) {
            var config = {
                type: 'line',
                data: {
                    labels: readings.doorTs,
                    datasets: [{
                        label: 'Door',
                        steppedLine: true,
                        fill: false,
                        backgroundColor: 'black',
                        borderColor: 'black',
                        data: readings.door,
                    }]
                },
                options: {
                    responsive: true,
                    title:{
                        display:true,
                        text:'Door Status'
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
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Timestamp'
                            }
                        }],
                        yAxes: [{
                            display: false,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
                }
            };
            var ctx = document.getElementById("door").getContext("2d");
            window.myLine = new Chart(ctx, config);
        }
})