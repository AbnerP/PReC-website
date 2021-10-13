package com.abnerpena;

import java.util.ArrayList;

public class Strategy {
    private ArrayList<Integer> pitLaps;
    private double totalTime;

    public Strategy(){
        this.pitLaps = new ArrayList<>();
    }

    public void addPitLap(int lap){
        this.pitLaps.add(lap);
    }

    public void addTotalTime(double time){
        this.totalTime = time;
    }

    public ArrayList<Integer> getPitLaps(){
        return this.pitLaps;
    }

    public double getTotalTime(){
        return this.totalTime;
    }

    public String toString(){
        String s = "";
        for(Integer i:pitLaps){
            s += "[Pit end of Lap: "+i+"]\n";
        }
        return s;
    }
}
