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
                Strategy temp = new Strategy();
                temp.addPitLap(entry.Key, 0);
                temp = calculate(entry.Key, 0, 0.0, 0, temp);
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
                        List<Strategy> strategies = new List<Strategy>();
                        if(cont != null)
                        {
                            strategies.Add(cont);
                        }

                        foreach (KeyValuePair<String, List<Double>> entry in data.data)
                        {
                            Strategy temp = calculate(entry.Key, currentLap + 1, totalTime + this.data.getLap(compound, tireAge) + this.pitLoss, 0, resultingStrategy(currentStrategy, currentLap, true, entry.Key));
                            strategies.Add(temp);
                        }

                        Strategy fastest = strategies[0];
                        foreach (Strategy s in strategies)
                        {
                            if (s.getTotalTime() < fastest.getTotalTime())
                            {
                                fastest = s;
                            }
                        }
                        return fastest;
                    }
                }
            }

        }

        private Strategy resultingStrategy(Strategy currentStrategy, int currentLap, bool pit, String compound)
        {
            Strategy copy = new Strategy();
            copy.setPits(new Dictionary<int,String>(currentStrategy.getPits()));
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
