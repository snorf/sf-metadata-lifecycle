/**
 * Created by Johan Karlsteen on 2017-10-12.
 */
({
	doInit : function(component, event, helper) {
		helper.doInit(component, event, helper);
	},
    onSelectChange : function(component, event, helper) {
        helper.onSelectChange(component, event, helper);
    },
    expandChapter: function(component, event, helper) {
        helper.expand(component, event, helper, false, false);
    },
     editChapter: function(component, event, helper) {
         helper.expand(component, event, helper, true, false);
    },
     createChapter: function(component, event, helper) {
         helper.expand(component, event, helper, true, true);
    },
     deleteChapter: function(component, event, helper) {
         helper.deleteChapter(component, event, helper);
    },
    handleComponentEvent : function(component, event, helper) {
        helper.handleComponentEvent(component, event, helper);
    }
})