/**
 * Created by Johan Karlsteen on 2017-10-08.
 */

public with sharing class FridgeReadingHistoryController {

    public class FridgeReading {
        public String deviceId {get;set;}
        public List<Datetime> ts {get;set;}
        public List<Integer> door {get;set;}
        public List<Double> temperature {get;set;}
        public List<Double> humidity {get;set;}
        public FridgeReading(String deviceId) {
            this.deviceId = deviceId;
            this.ts = new List<Datetime>();
            this.door = new List<Integer>();
            this.temperature = new List<Double>();
            this.humidity = new List<Double>();
        }
        public void addReading(Fridge_Reading_History__b  frh) {
            ts.add(frh.ts__c);
            door.add(frh.Door__c == 'open' ? 1 : 0);
            temperature.add(frh.Temperature__c);
            humidity.add(frh.Humidity__c);
        }
    }

    @AuraEnabled
    public static String getFridgeReadings(String deviceId) {
        FridgeReading fr = new FridgeReading(deviceId);
        List<Fridge_Reading_History__b> frhs = [SELECT DeviceId__c, Temperature__c, Humidity__c, Door__c, ts__c
                                                FROM Fridge_Reading_History__b WHERE DeviceId__c =: deviceId];
        Integer i = 0;
        for(Fridge_Reading_History__b frh : frhs) {
            if(Math.mod(i,1) == 0) {
                fr.addReading(frh);
            }
            i++;
        }
        return JSON.serialize(fr);
    }
}