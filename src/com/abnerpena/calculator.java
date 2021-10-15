package com.abnerpena;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;

public class calculator {
    private int numLaps;
    private double pitLoss;
    private TelemetryData data;
    private double minTime;
    private HashMap<String,Integer> minLapsPerCompound;


    public calculator(int laps,double pitloss,TelemetryData data){
        this.numLaps = laps;
        this.pitLoss = pitloss;
        this.data = data;
        this.minTime = Double.POSITIVE_INFINITY;
        this.minLapsPerCompound = new HashMap<>();
        setMinLapsPerCompound();
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


    //ONE COMPOUND STRATEGY
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

    //THREE COMPOUND STRATEGY
    private Strategy calculate(String compound,int currentLap, double totalTime, int tireAge, Strategy currentStrategy){
        if(currentLap == this.numLaps) {
            tireAge++;
            currentStrategy.addTotalTime(totalTime+this.data.getLap(compound,tireAge));
            if(currentStrategy.getTotalTime() < this.minTime){
                this.minTime = currentStrategy.getTotalTime();
            }
            return currentStrategy;
        }else{

            Strategy cont = null;
            Strategy pitS = null;
            Strategy pitM = null;
            Strategy pitH = null;

//            if(tireAge != this.data.maxIndexedLap(compound) ) {
//                    cont = calculate(compound, currentLap + 1, totalTime + this.data.getLap(compound, tireAge), tireAge + 1, resultingStrategy(currentStrategy, currentLap, false, null));
//            }
////
//            if(totalTime+this.data.getLap(compound,tireAge)+this.pitLoss > this.minTime && cont != null){
//                return cont;
//            }else{
//                pitS = calculate("Soft",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Soft"));
//                pitM = calculate("Medium",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Medium"));
//                pitH = calculate("Hard",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Hard"));
//            }
            int minLapsWithCurrentCompound = this.minLapsPerCompound.get(compound);
            int maxIndexLap = this.data.maxIndexedLap(compound);
            if(tireAge < minLapsWithCurrentCompound && tireAge < maxIndexLap){
                return calculate(compound, currentLap + 1, totalTime + this.data.getLap(compound, tireAge), tireAge + 1, resultingStrategy(currentStrategy, currentLap, false, null));
            }else{
                if(tireAge < maxIndexLap) {
                    cont = calculate(compound, currentLap + 1, totalTime + this.data.getLap(compound, tireAge), tireAge + 1, resultingStrategy(currentStrategy, currentLap, false, null));
                }
                if(tireAge < maxIndexLap && totalTime+this.data.getLap(compound,tireAge)+this.pitLoss > this.minTime && cont != null){
                    return cont;
                }else{
                    pitS = calculate("Soft",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Soft"));
                    pitM = calculate("Medium",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Medium"));
                    pitH = calculate("Hard",currentLap+1,totalTime+this.data.getLap(compound,tireAge)+this.pitLoss,0,resultingStrategy(currentStrategy,currentLap,true,"Hard"));
                }
            }

            double totalCont = Double.POSITIVE_INFINITY;
            double totalSoft = Double.POSITIVE_INFINITY;
            double totalMedium = Double.POSITIVE_INFINITY;
            double totalHard = Double.POSITIVE_INFINITY;

            if(cont != null){
                totalCont = cont.getTotalTime();
            }
            if(pitS != null){
                totalSoft = pitS.getTotalTime();
                totalMedium = pitM.getTotalTime();
                totalHard = pitH.getTotalTime();
            }

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

    private void setMinLapsPerCompound(){
        int softLimit = getIndexOfMinimumConsiderableLap(this.data.getLapTimes("Soft"));
        int medLimit = getIndexOfMinimumConsiderableLap(this.data.getLapTimes("Medium"));
        int hardLimit = getIndexOfMinimumConsiderableLap(this.data.getLapTimes("Hard"));
        System.out.println("Soft lower limit: "+softLimit);
        System.out.println("Medium lower limit: "+medLimit);
        System.out.println("Hard lower limit: "+hardLimit);
//        int softLimit = this.data.maxIndexedLap("Soft")/2;
//        int medLimit = this.data.maxIndexedLap("Medium")/2;
//        int hardLimit = this.data.maxIndexedLap("Hard")/2;
        this.minLapsPerCompound.put("Soft",softLimit);
        this.minLapsPerCompound.put("Medium",medLimit);
        this.minLapsPerCompound.put("Hard",hardLimit);
    }

    private int getIndexOfMinimumConsiderableLap(ArrayList<Double> laps){
        Double lap1 = laps.get(0);
        Double runningSum = 0.0;
        int minIndex = laps.size();
        for(int i = 0;i<laps.size();i++){
            runningSum += laps.get(i) - lap1;
            if(runningSum > this.pitLoss){
                minIndex = (int)(i - 1)/2;
                break;
            }
        }
        if(minIndex > laps.size()){
            return laps.size();
        }else{
            return minIndex;
        }
    }
}
