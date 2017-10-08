/**
 * Created by Johan Karlsteen on 2017-10-08.
 */
({
    doinit : function(component,event,helper){
        var action = component.get("c.getFridgeReadings");
        action.setParams({
        	deviceId : "2352fc042b6dc0ee"
    	});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                helper.displaydata(component,event,helper);
            }
        });
        $A.enqueueAction(action);
    }
})