/**
 * Created by Johan Karlsteen on 2017-10-18.
 */
({
    handleCancel : function(component, event, helper) {
        //closes the modal or popover from the component
        component.find("overlayLib").notifyClose();
    },
    handleSave : function(component, event, helper) {
        var cue = component.getEvent("chapterSaveEvent");
        cue.fire();
    }
})