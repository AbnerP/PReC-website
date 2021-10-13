package com.abnerpena;

import java.util.ArrayList;

public class Strategy {
    private ArrayList<Integer> pitLaps;
    private ArrayList<String> compounds;
    private double totalTime;

    public Strategy(){
        this.pitLaps = new ArrayList<>();
        this.compounds = new ArrayList<>();
    }

    public void addPitLap(String compound,int lap){
        this.compounds.add(compound);
        this.pitLaps.add(lap);
    }

    public void addTotalTime(double time){
        this.totalTime = time;
    }

    public ArrayList<Integer> getPitLaps(){
        return this.pitLaps;
    }
    public ArrayList<String> getCompounds(){
        return this.compounds;
    }

    public double getTotalTime(){
        return this.totalTime;
    }

    public String toString(){
        String s = "";
        for(int i = 0;i<this.pitLaps.size();i++){
            if(i == 0){
                s += "[Start with "+this.compounds.get(i)+"s]\n";
            }else{
                s += "[Pit end of Lap: "+this.pitLaps.get(i)+" for "+this.compounds.get(i)+"s]\n";
            }
        }
        return s;
    }
}
