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
        public void addReading(AggregateResult ar) {
            system.debug(ar);
//            addReading(fr.Temperature__c, fr.Humidity__c, fr.ts__c, fr.Door__c);
        }
        public void addReading(Fridge_Reading_Daily_History__c fr) {
            addReading(fr.Temperature__c, fr.Humidity__c, fr.ts__c, fr.Door__c);
        }
        public void addReading(Fridge_Reading_History__b  fr) {
            addReading(fr.Temperature__c, fr.Humidity__c, fr.ts__c, fr.Door__c);
        }
        public void addReading(Decimal t, Decimal h, DateTime ts, String d) {
            this.ts.add(ts);
            temperature.add(t);
            humidity.add(h);
            Integer doorStatus = d == 'open' ? 1 : 0;
            if(door.size() == 0 || doorStatus != door.get(door.size()-1)) {
                door.add(doorStatus);
                doorTs.add(ts);
            }
        }
    }

    @AuraEnabled
    public static String getFridgeReadings(String deviceId) {
        FridgeReading fr = new FridgeReading(deviceId);
        List<Fridge_Reading_Daily_History__c> frdhs = [SELECT DeviceId__c, Temperature__c, Humidity__c, Door__c, ts__c
                                            FROM Fridge_Reading_Daily_History__c WHERE DeviceId__c =: deviceId
                                            ORDER BY ts__c ASC LIMIT 300];
        for(Fridge_Reading_Daily_History__c frdh : frdhs) {
            fr.addReading(frdh);
        }

        Integer fromArchive = 300-frdhs.size();
        DateTime lastReading = fr.ts.get(fr.ts.size()-1);
        if(fromArchive > 0) {
            List<Fridge_Reading_History__b> frhs = [
                    SELECT DeviceId__c, Temperature__c, Humidity__c, Door__c, ts__c
                    FROM Fridge_Reading_History__b
                    WHERE DeviceId__c = :deviceId AND ts__c <: lastReading
            ];
            for (Integer i = frhs.size() - 1; i >= frhs.size()-fromArchive; i--) {
                Fridge_Reading_History__b frh = frhs[i];
                fr.addReading(frh);
            }
        }
        return JSON.serialize(fr);
    }

    @AuraEnabled
    public static String getAverageFridgeReadings(String deviceId) {
        FridgeReading fr = new FridgeReading(deviceId);
        List<AggregateResult> ars = [
                SELECT DeviceId__c, AVG(Temperature__c), AVG(Humidity__c), DAY_IN_YEAR(ts__c), HOUR_IN_DAY(ts__c)
                FROM Fridge_Reading_History__b WHERE DeviceId__c =: deviceId
                GROUP BY DeviceId__c, DAY_IN_YEAR(ts__c), HOUR_IN_DAY(ts__c) ORDER BY DAY_IN_YEAR(ts__c), HOUR_IN_DAY(ts__c)
        ];
        for(AggregateResult ar : ars) {
            fr.addReading(ar);
        }
        return JSON.serialize(fr);
    }
}