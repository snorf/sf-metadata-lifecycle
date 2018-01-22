/**
 * Created by Johan Karlsteen on 2017-10-12.
 */
({
	doInit : function(component, event, helper)  {
        helper.getData(component, event, helper);
	},
    getData : function(component, event, helper)  {
        var spinner = component.find('spinner');
        $A.util.removeClass(spinner, "slds-hide");
        var action = component.get('c.getDocumentation');
        var txt_recordId = component.get("v.recordId");
        action.setParams({
            "recordId" : txt_recordId
        });

        action.setCallback(this, function(a) {
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, "slds-hide");
            if (a.getState() === 'SUCCESS') {
                var documentation =  JSON.parse(a.getReturnValue());
                helper.setDocumentation(component, helper, documentation);
            }
        });
        $A.enqueueAction(action);
    },
    setDocumentation: function(component,helper,documentation) {
        component.set("v.documentation", documentation);
        var selectedChapter = helper.setOptions(component, helper, documentation.chapters);
        var chapterId = selectedChapter != null ? selectedChapter.value : null;
        var chapterTitle = selectedChapter != null ? selectedChapter.label : null;
        helper.setChapter(component, chapterId, chapterTitle, documentation.documentationId);
    },
    setChapter: function(component, chapterId, chapterTitle, documentationId) {
        var chapter = { "documentationId": documentationId, "chapterId": chapterId,"chapterTitle": chapterTitle};
        component.set("v.selectedChapterId", chapterId);
        component.set("v.chapter", chapter);
    },
    setOptions: function(component, helper, chapters) {
        var selectedChapterId = component.get("v.selectedChapterId");
        var options = [];
        var selectedOption = null;
        for(var i=0;i<chapters.length;i++) {
            var chapter = chapters[i];
            var selectOption = {
                value: chapter.chapterId,
                label: chapter.title,
                selected: chapter.chapterId == selectedChapterId
            };
            if(selectOption.selected) {
                selectedOption = selectOption;
            }
            options.push(selectOption);
        }
        if(options.length == 0) {
            var selectOption = {
                value: null,
                label: 'Nothing here yet, create a chapter!',
                selected: true
            };
            options.push(selectOption);
        }
        component.set("v.options", options);
        return selectedOption == null ? options[0] : selectedOption;
    },
    expand: function(component, evt, helper, editable, isNew) {
        var chapter = component.get("v.chapter");
        var chapterId = isNew ? null : chapter.chapterId;
        var chapterTitle = isNew ? null : chapter.chapterTitle;
        var documentationId = component.get('v.documentation').documentationId;
        var modalBody;
        var modalFooter;
        $A.createComponents([
                            ["eins_help:DocumentationChapter", {
                                "documentationId": documentationId,
                                "chapterId": chapterId,
                                "editable": editable,
                                "isNew": isNew
                            }],
                            ["eins_help:DocumentationFooter",{
                                "editable": editable
                            }]
                            ],
                           function(cmp, status) {
                               if (status === "SUCCESS") {
                                   modalBody = cmp[0];
                                   modalBody.addEventHandler("ChapterUpdatedEvent", component.getReference("c.handleComponentEvent"));
                                   modalFooter = cmp[1];
                                   modalFooter.addEventHandler("chapterSaveEvent", modalBody.getReference("c.handleSaveRecord"));
                                   component.find('overlayLib').showCustomModal({
                                       header: chapterTitle,
                                       body: modalBody,
                                       footer: modalFooter,
                                       showCloseButton: true,
                                       cssClass: "slds-modal_large"
                                   })
                               }
                           });
    },
    deleteChapter: function(component, event, helper) {
        var chapterTitle = component.get("v.chapter").chapterTitle;
        if(!confirm("Do You Really Want To Delete the Chapter Named: " + chapterTitle)) {
            return;
        }
        var selectedChapterId = component.get("v.selectedChapterId");
        var recordId = component.get("v.recordId");
        var action = component.get("c.deleteChapterWithId");
        action.setParams({
            "recordId": recordId,
            "chapterId": selectedChapterId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var documentation =  JSON.parse(response.getReturnValue());
                helper.setDocumentation(component, helper, documentation);
            }
        });
        $A.enqueueAction(action);
    },
    onSelectChange: function(component, event, helper) {
        var chapterId = component.find("chapters").get("v.value");
        var chapterTitle = component.find("chapters").get("v.label");
        var documentationId = component.get("v.chapter").documentationId;
        helper.setChapter(component, chapterId, chapterTitle, documentationId);
    },
    handleComponentEvent : function(component, event, helper) {
        var eventName = event.getName();
        if(eventName == "ChapterUpdatedEvent") {
            var chapterTitle = event.getParam("chapterTitle");
            var chapterId = event.getParam("chapterId");
            var order = event.getParam("order");
            component.set("v.selectedChapterId", chapterId);
            var found = false;
            var documentation = component.get("v.documentation");
            for(var i=0;i<documentation.chapters.length;i++) {
                var chapter = documentation.chapters[i];
                if(chapter.chapterId == chapterId) {
                    found = true;
                    chapter.title = chapterTitle;
                    chapter.order = order;
                    break;
                }
            }
            if(found) {
                documentation.chapters.sort(function (a,b) {
                    return a.order - b.order;
                });
                component.set("v.documentation", documentation);
                helper.setOptions(component, helper, documentation.chapters);
            } else {
                helper.doInit(component, event, helper);
            }
        } else {
            console.log("Unknown event" + eventName);
        }
    }
})