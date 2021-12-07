using System;
using System.Collections.Generic;

namespace PREC_API.Classes
{
    public class Strategy
    {
        //public List<int> pitLaps { get; set; }
        //public List<String> compounds { get; set; }
        public Dictionary<int, String> pits { get; set; }
        public double totalTime { get; set; }

        public Strategy()
        {
            this.pits = new Dictionary<int, String>();
            //this.pitLaps = new List<int>();
            //this.compounds = new List<String>();
        }

        public void setPits(Dictionary<int, String> pits)
        {
            this.pits = pits;
        }

        public Dictionary<int, String> getPits() 
        {
            return this.pits;
        }

        public void addPitLap(String compound, int lap)
        {
            this.pits.TryAdd(lap,compound);
            //this.compounds.Add(compound);
            //this.pitLaps.Add(lap);
        }

        public void addTotalTime(double time)
        {
            this.totalTime = time;
        }

        

        public double getTotalTime()
        {
            return this.totalTime;
        }

        public String toString()
        {
            String s = "";
            
            //for (int i = 0; i < this.pitLaps.Count; i++)
            //{
            //    if (i == 0)
            //    {
            //        s += "[Start with " + this.compounds[i] + "s]\n";
            //    }
            //    else
            //    {
            //        s += "[Pit end of Lap: " + this.pitLaps[i] + " for " + this.compounds[i] + "s]\n";
            //    }
            //}
            return s;
        }
    }
}
