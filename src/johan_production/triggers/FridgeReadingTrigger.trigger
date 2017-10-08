trigger FridgeReadingTrigger on Fridge_Reading__e (after insert) {
    FridgeReadingClass handler = new FridgeReadingClass();

    if(Trigger.isAfter) {
        if(Trigger.isInsert) {
            handler.updateSmartFridge(Trigger.new);
            handler.createBigObject(Trigger.new);
        }
    }
}