/**
 * Created by Johan Karlsteen on 2017-10-08.
 */
({
        addData : function(chart, label, data) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data);
            });
        },
        removeData : function(chart) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
        },
        redrawData : function(component, event, helper, readings, chart, datasets) {
            helper.removeData(chart);
            helper.addData(chart, readings.ts, datasets);
            console.log(chart.data);
            chart.update();
        },
        displayData : function(component, event, helper, readings) {
            var datasets = [{
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
                           }];
            var chart = window.myLine;
            if(chart != null) {
                helper.redrawData(component,event,helper,readings, chart, datasets);
            }
            var config = {
                type: 'line',
                data: {
                    labels: readings.ts,
                    datasets: datasets
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
        },
    refreshData : function(component,event,helper) {
        var action = component.get("c.getFridgeReadings");
        var endDate = component.get("v.today");
        var results = component.get("v.results");
        action.setParams({
        	deviceId : "2352fc042b6dc0ee",
        	results : results,
        	endDate : endDate
    	});
    	console.log(action.getParams());
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var fridgereadings = JSON.parse(response.getReturnValue());
                helper.displayData(component,event,helper,fridgereadings);
            }
        });
        $A.enqueueAction(action);

        action = component.get("c.getAverageFridgeReadings");
        action.setParams({
        	deviceId : "2352fc042b6dc0ee"
    	});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                logger.debug('SUCCESS');
            }
        });
        //$A.enqueueAction(action);
    }
})