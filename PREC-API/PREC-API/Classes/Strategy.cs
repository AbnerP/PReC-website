using System;
using System.Collections.Generic;

namespace PREC_API.Classes
{
    public class Strategy
    {
        public List<int> pitLaps { get; set; }
        public List<String> compounds { get; set; }
        public double totalTime { get; set; }

        public Strategy()
        {
            this.pitLaps = new List<int>();
            this.compounds = new List<String>();
        }

        public void addPitLap(String compound, int lap)
        {
            this.compounds.Add(compound);
            this.pitLaps.Add(lap);
        }

        public void addTotalTime(double time)
        {
            this.totalTime = time;
        }

        public List<int> getPitLaps()
        {
            return this.pitLaps;
        }
        public List<String> getCompounds()
        {
            return this.compounds;
        }

        public double getTotalTime()
        {
            return this.totalTime;
        }

        public String toString()
        {
            String s = "";
            for (int i = 0; i < this.pitLaps.Count; i++)
            {
                if (i == 0)
                {
                    s += "[Start with " + this.compounds[i] + "s]\n";
                }
                else
                {
                    s += "[Pit end of Lap: " + this.pitLaps[i] + " for " + this.compounds[i] + "s]\n";
                }
            }
            return s;
        }
    }
}
