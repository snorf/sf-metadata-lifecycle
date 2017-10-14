/**
 * Created by Johan Karlsteen on 2017-10-08.
 */
({
        addData : function(chart, labels, data) {
            chart.data.labels = labels;
            chart.data.datasets[0] = data[0];
            chart.data.datasets[1] = data[1];
        },
        redrawData : function(component, event, helper, readings, chart, datasets) {
            helper.addData(chart, readings.ts, datasets);
            chart.update(0);
        },
        displayData : function(component, event, helper, readings) {
            var datasets = [readings.temperature, readings.humidity];
            var chart = window.myLine;
            if(chart != null) {
                helper.redrawData(component,event,helper,readings, chart, datasets);
            }
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
                    maintainAspectRatio: false,
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
        var spinner = component.find('spinner');
        $A.util.removeClass(spinner, "slds-hide");
        var action = component.get("c.getFridgeReadings");
        var endDate = component.get("v.today");
        var results = component.get("v.results");
        action.setParams({
        	deviceId : "2352fc042b6dc0ee",
        	results : results,
        	endDate : endDate
    	});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var fridgereadings = JSON.parse(response.getReturnValue());
                helper.displayData(component,event,helper,fridgereadings);
            }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    }
})