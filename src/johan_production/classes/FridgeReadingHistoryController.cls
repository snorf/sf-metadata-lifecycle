/**
 * Created by Johan Karlsteen on 2017-10-08.
 */

public with sharing class FridgeReadingHistoryController {

    public class FridgeReading {
        public String deviceId {get;set;}
        public List<String> ts {get;set;}
        public List<String> doorTs {get;set;}
        public List<Integer> door {get;set;}
        public List<Double> temperature {get;set;}
        public List<Double> humidity {get;set;}
        public FridgeReading(String deviceId) {
            this.deviceId = deviceId;
            this.ts = new List<String>();
            this.doorTs = new List<String>();
            this.door = new List<Integer>();
            this.temperature = new List<Double>();
            this.humidity = new List<Double>();
        }
        public void addReading(Fridge_Reading_History__b  fr) {
            addReading(fr.Temperature__c, fr.Humidity__c, fr.ts__c, fr.Door__c);
        }
        public void addReading(Decimal t, Decimal h, DateTime timeStamp, String d) {
            String tsString = timeStamp.format('HH:mm dd/MM');
            this.ts.add(tsString);
            temperature.add(t);
            humidity.add(h);
            Integer doorStatus = d == 'open' ? 1 : 0;
            if(door.size() == 0 || doorStatus != door.get(door.size()-1)) {
                door.add(doorStatus);
                doorTs.add(tsString);
            }
        }
    }

    @AuraEnabled
    public static String getFridgeReadings(String deviceId, Integer results, DateTime endDate) {
        if(results == null) {
            results = 200;
        }
        FridgeReading fr = new FridgeReading(deviceId);
        system.debug('RESULTS: ' +results);
        List<Fridge_Reading_History__b> frhs = [
                SELECT DeviceId__c, Temperature__c, Humidity__c, Door__c, ts__c
                FROM Fridge_Reading_History__b
                WHERE DeviceId__c = :deviceId AND ts__c <: endDate
                LIMIT :Integer.valueof(results)
        ];
        for (Integer i = frhs.size() - 1; i >= 0; i--) {
            Fridge_Reading_History__b frh = frhs[i];
            fr.addReading(frh);
        }
        return JSON.serialize(fr);
    }
}