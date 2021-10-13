package com.abnerpena;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class calculator {
    private int numLaps;
    private double pitLoss;
    private TelemetryData data;


    public calculator(int laps,double pitloss,TelemetryData data){
        this.numLaps = laps;
        this.pitLoss = pitloss;
        this.data = data;
    }
    public Strategy getBestStrategy(){
        ArrayList<Strategy> strategies = new ArrayList<>();
        Strategy startSoft = new Strategy();
        startSoft.addPitLap("Soft",0);
        startSoft = calculate("Soft",0,0.0,0,startSoft);
        Strategy startMedium = new Strategy();
        startMedium.addPitLap("Medium",0);
        startMedium = calculate("Hard",0,0.0,0,startMedium);
        Strategy startHard = new Strategy();
        startHard.addPitLap("Hard",0);
        startHard = calculate("Hard",0,0.0,0,startHard);

        double totalSoft = startSoft.getTotalTime();
        double totalMedium = startMedium.getTotalTime();
        double totalHard = startHard.getTotalTime();

        double fastestTime = Math.min(totalHard,totalMedium);
        fastestTime = Math.min(fastestTime,totalSoft);
        if(fastestTime == totalSoft){
            return startSoft;
        }else if(fastestTime == totalMedium){
            return startMedium;
        }else{
            return startHard;
        }
    }

//    private Strategy calculate(int currentLap, double totalTime, int tireAge, Strategy currentStrategy){
//        if(currentLap == this.numLaps) {
//            tireAge++;
//            currentStrategy.addTotalTime(totalTime+this.data.lapTimeAt(tireAge));
//            return currentStrategy;
//        }else{
//            Strategy pit = calculate(currentLap+1,totalTime+this.data.lapTimeAt(tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true));
//            Strategy cont;
//            if(tireAge == this.data.indexedMaxLap()){
//                cont = calculate(currentLap+1,totalTime+this.data.lapTimeAt(tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true));
//            }else{
//                cont = calculate(currentLap+1,totalTime+this.data.lapTimeAt(tireAge),tireAge+1,resultingStrategy(currentStrategy,currentLap,false));
//            }
//            if(pit.getTotalTime() >= cont.getTotalTime()){
//                return cont;
//            }else{
//                return pit;
//            }
//        }
//    }
    private Strategy calculate(String compound,int currentLap, double totalTime, int tireAge, Strategy currentStrategy){
        if(currentLap == this.numLaps) {
            tireAge++;
            currentStrategy.addTotalTime(totalTime+this.data.getLap(compound,tireAge));
            return currentStrategy;
        }else{
            Strategy pitS = calculate("Soft",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Soft"));
            Strategy pitM = calculate("Medium",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Medium"));
            Strategy pitH = calculate("Hard",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Hard"));

            Strategy cont;
            if(tireAge == this.data.maxIndexedLap(compound)){
                //cont = calculate(compound,currentLap+1,totalTime+this.data.lapTimeAt(tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true));
                double totalSoft = pitS.getTotalTime();
                double totalMedium = pitM.getTotalTime();
                double totalHard = pitH.getTotalTime();

                double fastestTime = Math.min(totalHard,totalMedium);
                fastestTime = Math.min(fastestTime,totalSoft);
                if(fastestTime == totalSoft){
                    return pitS;
                }else if(fastestTime == totalMedium){
                    return pitM;
                }else{
                    return pitH;
                }
            }else{
                cont = calculate(compound,currentLap+1,totalTime+this.data.getLap(compound,tireAge),tireAge+1,resultingStrategy(currentStrategy,currentLap,false,null));
                double totalSoft = pitS.getTotalTime();
                double totalMedium = pitM.getTotalTime();
                double totalHard = pitH.getTotalTime();
                double totalCont = cont.getTotalTime();

                double fastestTime = Math.min(totalHard,totalMedium);
                fastestTime = Math.min(fastestTime,totalSoft);
                fastestTime = Math.min(fastestTime,totalCont);
                if(fastestTime == totalSoft){
                    return pitS;
                }else if(fastestTime == totalMedium){
                    return pitM;
                }else if(fastestTime == totalCont){
                    return cont;
                }else{
                    return pitH;
                }
            }

        }
    }

    private Strategy resultingStrategy(Strategy currentStrategy,int currentLap,boolean pit,String compound){
        Strategy copy = new Strategy();
        for(int i = 0;i<currentStrategy.getPitLaps().size();i++){
            copy.addPitLap(currentStrategy.getCompounds().get(i),currentStrategy.getPitLaps().get(i));
        }
        if(pit && compound!=null){
            copy.addPitLap(compound,currentLap);
            return copy;
        }
        return copy;
    }
}
