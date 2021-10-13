package com.abnerpena;

import java.util.ArrayList;

public class TelemetryData {

    private ArrayList<Double> lapTimes;

    public TelemetryData(){
        this.lapTimes = new ArrayList<>();
    }

    public double lapTimeAt(int index){
        return this.lapTimes.get(index);
    }

    public void generateMockData(){
        this.lapTimes.add(30.0);
        this.lapTimes.add(30.60);
        this.lapTimes.add(31.21);
        this.lapTimes.add(31.84);
        this.lapTimes.add(32.47);
        this.lapTimes.add(33.12);
        this.lapTimes.add(33.78);
        this.lapTimes.add(34.46);
        this.lapTimes.add(35.15);
        this.lapTimes.add(35.85);
    }

    public int indexedMaxLap(){
        return this.lapTimes.size()-2;
    }
}
