using System;
using System.Collections.Generic;

namespace PREC_API.Classes
{
    public class Calculator
    {

        private int numLaps;
        private double pitLoss;
        private TelemetryData data;
        private double minTime;
        private Dictionary<String, int> minLapsPerCompound;


        public Calculator(int laps, double pitloss, TelemetryData data)
        {
            this.numLaps = laps;
            this.pitLoss = pitloss;
            this.data = data;
            this.minTime = Double.PositiveInfinity;
            this.minLapsPerCompound = new Dictionary<String,int>();
            setMinLapsPerCompound();
        }

        public Strategy getBestStrategy()
        {
            List<Strategy> strategies = new List<Strategy>();

            foreach (KeyValuePair<String, List<Double>> entry in data.data)
            {
                Console.WriteLine("Calculating with "+entry.Key + " compound.");
                Strategy temp = new Strategy();
                temp.addPitLap(entry.Key, 0);
                temp = calculate("Soft", 0, 0.0, 0, temp);
                strategies.Add(temp);
            }

            Strategy fastest = strategies[0];
            foreach (Strategy s in strategies)
            {
                if(s.getTotalTime() < fastest.getTotalTime())
                {
                    fastest = s;
                }
            }
            return fastest;

            //Strategy startSoft = new Strategy();
            //startSoft.addPitLap("Soft", 0);
            //startSoft = calculate("Soft", 0, 0.0, 0, startSoft);
            //Strategy startMedium = new Strategy();
            //startMedium.addPitLap("Medium", 0);
            //startMedium = calculate("Medium", 0, 0.0, 0, startMedium);
            //Strategy startHard = new Strategy();
            //startHard.addPitLap("Hard", 0);
            //startHard = calculate("Hard", 0, 0.0, 0, startHard);

            //double totalSoft = startSoft.getTotalTime();
            //double totalMedium = startMedium.getTotalTime();
            //double totalHard = startHard.getTotalTime();

            //double fastestTime = Math.Min(totalHard, totalMedium);
            //fastestTime = Math.Min(fastestTime, totalSoft);
            //if (fastestTime == totalSoft)
            //{
            //    return startSoft;
            //}
            //else if (fastestTime == totalMedium)
            //{
            //    return startMedium;
            //}
            //else
            //{
            //    return startHard;
            //}
        }

        private Strategy calculate(String compound, int currentLap, double totalTime, int tireAge, Strategy currentStrategy)
        {
            if (currentLap == this.numLaps)
            {
                if(currentLap == 0)
                {
                    currentStrategy.addTotalTime(totalTime + this.data.getLap(compound, tireAge));
                }
                else
                {
                    tireAge++;
                    currentStrategy.addTotalTime(totalTime + this.data.getLap(compound, tireAge));
                }

                if (currentStrategy.getTotalTime() < this.minTime)
                {
                    this.minTime = currentStrategy.getTotalTime();
                }
                return currentStrategy;
            }
            else
            {

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

                int minLapsWithCurrentCompound = minLapsPerCompound.GetValueOrDefault(compound);
                int maxIndexLap = this.data.maxIndexedLap(compound);
                if (tireAge < minLapsWithCurrentCompound && tireAge < maxIndexLap)
                {
                    return calculate(compound, currentLap + 1, totalTime + this.data.getLap(compound, tireAge), tireAge + 1, resultingStrategy(currentStrategy, currentLap, false, null));
                }
                else
                {
                    if (tireAge < maxIndexLap)
                    {
                        cont = calculate(compound, currentLap + 1, totalTime + this.data.getLap(compound, tireAge), tireAge + 1, resultingStrategy(currentStrategy, currentLap, false, null));
                    }
                    if (tireAge < maxIndexLap && totalTime + this.data.getLap(compound, tireAge) + this.pitLoss > this.minTime && cont != null)
                    {
                        return cont;
                    }
                    else
                    {
                        pitS = calculate("Soft", currentLap + 1, totalTime + this.data.getLap(compound, tireAge) + this.pitLoss, 0, resultingStrategy(currentStrategy, currentLap, true, "Soft"));
                        pitM = calculate("Medium", currentLap + 1, totalTime + this.data.getLap(compound, tireAge) + this.pitLoss, 0, resultingStrategy(currentStrategy, currentLap, true, "Medium"));
                        pitH = calculate("Hard", currentLap + 1, totalTime + this.data.getLap(compound, tireAge) + this.pitLoss, 0, resultingStrategy(currentStrategy, currentLap, true, "Hard"));
                    }
                }

                double totalCont = Double.PositiveInfinity;
                double totalSoft = Double.PositiveInfinity;
                double totalMedium = Double.PositiveInfinity;
                double totalHard = Double.PositiveInfinity;

                if (cont != null)
                {
                    totalCont = cont.getTotalTime();
                }
                if (pitS != null)
                {
                    totalSoft = pitS.getTotalTime();
                    totalMedium = pitM.getTotalTime();
                    totalHard = pitH.getTotalTime();
                }

                double fastestTime = Math.Min(totalHard, totalMedium);
                fastestTime = Math.Min(fastestTime, totalSoft);
                fastestTime = Math.Min(fastestTime, totalCont);
                if (fastestTime == totalSoft)
                {
                    return pitS;
                }
                else if (fastestTime == totalMedium)
                {
                    return pitM;
                }
                else if (fastestTime == totalCont)
                {
                    return cont;
                }
                else
                {
                    return pitH;
                }

            }

        }

        private Strategy resultingStrategy(Strategy currentStrategy, int currentLap, bool pit, String compound)
        {
            Strategy copy = new Strategy();
            copy.setPits(new Dictionary<int,String>(currentStrategy.getPits()));
            //for (int i = 0; i < currentStrategy.getPitLaps().Count; i++)
            //{
            //    copy.addPitLap(currentStrategy.getCompounds()[i], currentStrategy.getPitLaps()[i]);
            //}
            if (pit && compound != null)
            {
                copy.addPitLap(compound, currentLap);
                return copy;
            }
            return copy;
        }

        private void setMinLapsPerCompound()
        {
            foreach (KeyValuePair<String, List<Double>> entry in data.data)
            {
                int temp = getIndexOfMinimumConsiderableLap(this.data.getLapTimes(entry.Key));
                this.minLapsPerCompound.Add(entry.Key, temp);
            }
            //int softLimit = getIndexOfMinimumConsiderableLap(this.data.getLapTimes("Soft"));
            //int medLimit = getIndexOfMinimumConsiderableLap(this.data.getLapTimes("Medium"));
            //int hardLimit = getIndexOfMinimumConsiderableLap(this.data.getLapTimes("Hard"));
            ////System.out.println("Soft lower limit: " + softLimit);
            ////System.out.println("Medium lower limit: " + medLimit);
            ////System.out.println("Hard lower limit: " + hardLimit);
            ////        int softLimit = this.data.maxIndexedLap("Soft")/2;
            ////        int medLimit = this.data.maxIndexedLap("Medium")/2;
            ////        int hardLimit = this.data.maxIndexedLap("Hard")/2;
            //this.minLapsPerCompound.Add("Soft", softLimit);
            //this.minLapsPerCompound.Add("Medium", medLimit);
            //this.minLapsPerCompound.Add("Hard", hardLimit);
        }

        private int getIndexOfMinimumConsiderableLap(List<Double> laps)
        {
            Double lap1 = laps[0];
            Double runningSum = 0.0;
            int minIndex = laps.Count;
            for (int i = 0; i < laps.Count; i++)
            {
                runningSum += laps[i] - lap1;
                if (runningSum > this.pitLoss)
                {
                    minIndex = (int)(i - 1) / 2;
                    break;
                }
            }
            if (minIndex > laps.Count)
            {
                return laps.Count;
            }
            else
            {
                return minIndex;
            }
        }
    }
}
