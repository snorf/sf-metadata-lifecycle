/**
 * Created by Johan Karlsteen on 2017-10-13.
 */
({
    doInit: function(component, event, helper) {
        var isNew = component.get("v.isNew");
        if(isNew) {
            component.find("recordLoader").getNewRecord(
                "eins_help__Chapter__c", // sObject type (objectApiName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    var rec = component.get("v.record");
                    var error = component.get("v.recordError");
                    if(error || (rec === null)) {
                        console.log("Error initializing record template: " + error);
                        return;
                    }
                    var parent = component.get("v.documentationId");
                    component.set("v.simpleRecord.eins_help__Documentation__c", parent);
                })
            );
        }
    },
    handleSaveRecord: function(component, event, helper) {
        component.find("recordLoader").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                var cue = component.getEvent("ChapterUpdatedEvent");
                cue.setParams({"chapterId" : saveResult.recordId,
                               "chapterTitle" : component.get("v.simpleRecord.eins_help__Title__c"),
                               "order": component.get("v.simpleRecord.eins_help__Order__c")});
                cue.fire();
                component.find("overlayLib").notifyClose();
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
    }
})