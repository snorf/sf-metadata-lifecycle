/**
 * Created by Johan Karlsteen on 2017-10-08.
 */
({
    doinit : function(component,event,helper){
        var today = new Date();
        component.set("v.today", today.toISOString());
        helper.refreshData(component,event,helper);
    },
    refreshData : function(component,event,helper) {
        helper.refreshData(component,event,helper);
    }
})