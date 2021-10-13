package com.abnerpena;

public class calculator {
    private int numLaps;
    private double pitLoss;
    private TelemetryData data;


    public calculator(int laps,double pitloss,TelemetryData data){
        this.numLaps = laps;
        this.pitLoss = pitloss;
        this.data = data;
    }

    public Strategy calculate(int currentLap, double totalTime, int tireAge, Strategy currentStrategy){
        if(currentLap == this.numLaps) {
            tireAge++;
            currentStrategy.addTotalTime(totalTime+this.data.lapTimeAt(tireAge));
            return currentStrategy;
        }else{
            Strategy pit = calculate(currentLap+1,totalTime+this.data.lapTimeAt(tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true));
            Strategy cont;
            if(tireAge == this.data.indexedMaxLap()){
                cont = calculate(currentLap+1,totalTime+this.data.lapTimeAt(tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true));
            }else{
                cont = calculate(currentLap+1,totalTime+this.data.lapTimeAt(tireAge),tireAge+1,resultingStrategy(currentStrategy,currentLap,false));
            }
            if(pit.getTotalTime() >= cont.getTotalTime()){
                return cont;
            }else{
                return pit;
            }
        }
    }
    private Strategy resultingStrategy(Strategy currentStrategy,int currentLap,boolean pit){
        Strategy copy = new Strategy();
        for(int i = 0;i<currentStrategy.getPitLaps().size();i++){
            copy.addPitLap(currentStrategy.getPitLaps().get(i));
        }
        if(pit){
            copy.addPitLap(currentLap);
            return copy;
        }
        return copy;
    }
}
