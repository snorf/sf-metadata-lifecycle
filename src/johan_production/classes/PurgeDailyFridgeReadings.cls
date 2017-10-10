/**
 * Created by Johan Karlsteen on 2017-10-08.
 */

public class PurgeDailyFridgeReadings {

    @InvocableMethod(label='Purge DTR' description='Purges Daily Temperature Readings')
    public static void purgeDailyTemperatureReadings(List<Fridge_Reading_Daily_History__c> items) {
        deleteRecords();
    }

    @future(callout = true)
    public static void deleteRecords() {
        Datetime lastReading = [SELECT DeviceId__c, Temperature__c, ts__c FROM Fridge_Reading_History__b LIMIT 1].ts__c;
        for(List<Fridge_Reading_Daily_History__c> readings :
        [SELECT Id FROM Fridge_Reading_Daily_History__c WHERE ts__c <: lastReading]) {
            delete(readings);
        }
    }
}