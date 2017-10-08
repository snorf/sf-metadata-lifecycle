/**
 * Created by Johan Karlsteen on 2017-10-08.
 */

public class PurgeDailyFridgeReadings implements Queueable {

        private Datetime lastReading;

        public PurgeDailyFridgeReadings(Datetime lastReading) {
            this.lastReading = lastReading;
        }

        public void execute(QueueableContext context) {
            for(List<Fridge_Reading_Daily_History__c> readings :
                [SELECT Id FROM Fridge_Reading_Daily_History__c WHERE ts__c >: lastReading]) {
                delete readings;
            }
        }

    }