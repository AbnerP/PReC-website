package com.abnerpena;

public class Main {

    public static void main(String[] args) {
        TelemetryData d = new TelemetryData();
        d.generateMockData();

        calculator c = new calculator(20,30,d);

        Strategy s = c.getBestStrategy();

        System.out.println(s.toString());
        int totalTimeMins = (int)Math.floor(s.getTotalTime()/60);
        int totalTimeSecs = (int)s.getTotalTime()%60;
        System.out.println("Total Time: "+totalTimeMins+":"+totalTimeSecs);
    }
}
