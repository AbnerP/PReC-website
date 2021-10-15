package com.abnerpena;

import java.util.ArrayList;
import java.util.HashMap;

public class TelemetryData {

    private HashMap<String,TireTelemetry> data;

    public TelemetryData(){
        this.data = new HashMap<>();
    }

    public double lapTimeAt(String tire,int index){
        return this.data.get(tire).lapTimeAt(index);
    }

    public int numberOfTires(){
        return this.data.size();
    }

    public void generateMockData(){
        TireTelemetry s = new TireTelemetry();
        TireTelemetry m = new TireTelemetry();
        TireTelemetry h = new TireTelemetry();

        s.generateSoftMockData();
        m.generateMediumMockData();
        h.generateHardMockData();

        this.data.put("Soft",s);
        this.data.put("Medium",m);
        this.data.put("Hard",h);
    }

    public ArrayList<Double> getLapTimes(String compound){
        return this.data.get(compound).getLapTimes();
    }

    public double getLap(String compound,int index){
        return this.data.get(compound).lapTimeAt(index);
    }

    public int maxIndexedLap(String compound){
        return this.data.get(compound).indexedMaxLap();
    }
}
