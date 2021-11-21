using System;
using System.Collections;
using System.Collections.Generic;

namespace PREC_API.Classes
{
    public class TireTelemetry
    {
        private Dictionary<String, List<double>> data;
        private List<double> lapTimes;

        public TireTelemetry()
        {
            this.lapTimes = new List<double>();
            this.data = new Dictionary<String, List<double>>();
        }

        public double lapTimeAt(int index)
        {
            return this.lapTimes[index];
        }

        public void generateSoftMockData()
        {
            this.lapTimes.Add(30.0);
            this.lapTimes.Add(30.60);
            this.lapTimes.Add(31.21);
            this.lapTimes.Add(31.84);
            this.lapTimes.Add(32.47);
            this.lapTimes.Add(33.12);
            this.lapTimes.Add(34.78);
            this.lapTimes.Add(35.46);
            this.lapTimes.Add(36.15);
            this.lapTimes.Add(36.85);
            this.data.Add("Soft", this.lapTimes);
        }

        public void generateMediumMockData()
        {
            this.lapTimes.Add(31.0);
            this.lapTimes.Add(32.60);
            this.lapTimes.Add(32.80);
            this.lapTimes.Add(33.84);
            this.lapTimes.Add(33.12);
            this.lapTimes.Add(34.78);
            this.lapTimes.Add(35.46);
            this.lapTimes.Add(35.15);
            this.lapTimes.Add(36.85);
            this.lapTimes.Add(36.85);
            this.lapTimes.Add(36.46);
            this.lapTimes.Add(37.15);
            this.lapTimes.Add(38.85);
            this.lapTimes.Add(39.85);
            this.data.Add("Medium", this.lapTimes);
        }

        public void generateHardMockData()
        {
            this.lapTimes.Add(32.0);
            this.lapTimes.Add(32.60);
            this.lapTimes.Add(32.80);
            this.lapTimes.Add(33.84);
            this.lapTimes.Add(33.12);
            this.lapTimes.Add(33.78);
            this.lapTimes.Add(33.46);
            this.lapTimes.Add(33.15);
            this.lapTimes.Add(34.85);
            this.lapTimes.Add(34.85);
            this.lapTimes.Add(35.46);
            this.lapTimes.Add(35.15);
            this.lapTimes.Add(36.85);
            this.lapTimes.Add(36.85);
            this.lapTimes.Add(36.46);
            this.lapTimes.Add(36.15);
            this.lapTimes.Add(37.85);
            this.lapTimes.Add(37.85);
            this.lapTimes.Add(37.46);
            this.lapTimes.Add(37.15);
            this.lapTimes.Add(38.85);
            this.lapTimes.Add(38.85);
            this.data.Add("Hard", this.lapTimes);
        }

        public List<double> getLapTimes()
        {
            return this.lapTimes;
        }

        public int indexedMaxLap()
        {
            return this.lapTimes.Count - 2;
        }

    }
}
