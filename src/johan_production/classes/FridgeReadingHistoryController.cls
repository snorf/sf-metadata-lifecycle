/**
 * Created by Johan Karlsteen on 2017-10-08.
 */

public with sharing class FridgeReadingHistoryController {

    public class FridgeReading {
        public String deviceId {get;set;}
        public List<Datetime> ts {get;set;}
        public List<Datetime> doorTs {get;set;}
        public List<Integer> door {get;set;}
        public List<Double> temperature {get;set;}
        public List<Double> humidity {get;set;}
        public FridgeReading(String deviceId) {
            this.deviceId = deviceId;
            this.ts = new List<Datetime>();
            this.doorTs = new List<Datetime>();
            this.door = new List<Integer>();
            this.temperature = new List<Double>();
            this.humidity = new List<Double>();
        }
        public void addReading(Fridge_Reading_History__b  frh) {
            if(ts.size() < 200) {
                ts.add(frh.ts__c);
                temperature.add(frh.Temperature__c);
                humidity.add(frh.Humidity__c);
            }
            if(door.size()<200) {
                Integer doorStatus = frh.Door__c == 'open' ? 1 : 0;
                if(door.size() == 0 || doorStatus != door.get(door.size()-1)) {
                    door.add(doorStatus);
                    doorTs.add(frh.ts__c);                
                }
            }
        }
    }

    @AuraEnabled
    public static String getFridgeReadings(String deviceId) {
        FridgeReading fr = new FridgeReading(deviceId);
        List<Fridge_Reading_History__b> frhs = [SELECT DeviceId__c, Temperature__c, Humidity__c, Door__c, ts__c
                                                FROM Fridge_Reading_History__b WHERE DeviceId__c =: deviceId LIMIT 300];
        Integer skip = 0;
        for(Integer i=frhs.size()-1;i>=0;i--) {
             Fridge_Reading_History__b frh = frhs[i];
            if(Math.mod(skip,1) == 0) {
                fr.addReading(frh);
            }
            skip++;
        }
        return JSON.serialize(fr);
    }
}