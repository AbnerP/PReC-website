package com.abnerpena;

import java.util.ArrayList;

public class TireTelemetry {
    private ArrayList<Double> lapTimes;

    public TireTelemetry(){
        this.lapTimes = new ArrayList<>();
    }

    public double lapTimeAt(int index){
        return this.lapTimes.get(index);
    }

    public void generateSoftMockData(){
        this.lapTimes.add(30.0);
        this.lapTimes.add(30.60);
        this.lapTimes.add(31.21);
        this.lapTimes.add(31.84);
        this.lapTimes.add(32.47);
        this.lapTimes.add(33.12);
        this.lapTimes.add(34.78);
        this.lapTimes.add(35.46);
        this.lapTimes.add(36.15);
        this.lapTimes.add(37.85);
    }

    public void generateMediumMockData(){
        this.lapTimes.add(31.0);
        this.lapTimes.add(32.60);
        this.lapTimes.add(32.80);
        this.lapTimes.add(33.84);
        this.lapTimes.add(33.12);
        this.lapTimes.add(34.78);
        this.lapTimes.add(35.46);
        this.lapTimes.add(35.15);
        this.lapTimes.add(36.85);
        this.lapTimes.add(36.85);
        this.lapTimes.add(36.46);
        this.lapTimes.add(37.15);
        this.lapTimes.add(38.85);
        this.lapTimes.add(39.85);
    }

    public void generateHardMockData(){
        this.lapTimes.add(32.0);
        this.lapTimes.add(32.60);
        this.lapTimes.add(32.80);
        this.lapTimes.add(33.84);
        this.lapTimes.add(33.12);
        this.lapTimes.add(33.78);
        this.lapTimes.add(33.46);
        this.lapTimes.add(33.15);
        this.lapTimes.add(34.85);
        this.lapTimes.add(34.85);
        this.lapTimes.add(35.46);
        this.lapTimes.add(35.15);
        this.lapTimes.add(36.85);
        this.lapTimes.add(36.85);
        this.lapTimes.add(36.46);
        this.lapTimes.add(36.15);
        this.lapTimes.add(37.85);
        this.lapTimes.add(37.85);
        this.lapTimes.add(37.46);
        this.lapTimes.add(37.15);
        this.lapTimes.add(38.85);
        this.lapTimes.add(38.85);
    }

    public int indexedMaxLap(){
        return this.lapTimes.size()-2;
    }
}
