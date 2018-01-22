/**
 * Created by Johan Karlsteen on 2017-10-13.
 */
({
	doInit : function(component, event, helper) {
		helper.doInit(component, event, helper);
	},
    handleSaveRecord: function(component, event, helper) {
        helper.handleSaveRecord(component, event, helper);
    },
    chapterIdChange : function (component, event, helper) {
        if(component.get("v.chapterId") != null) {
            component.find('recordLoader').reloadRecord(true)
        }
    },
    handleCancel : function(component, event, helper) {
        component.find("overlayLib").notifyClose();
    }
})