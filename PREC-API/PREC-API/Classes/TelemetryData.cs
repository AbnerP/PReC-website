using System;
using System.Collections.Generic;
using PREC_API.DTO;

namespace PREC_API.Classes
{
    public class TelemetryData
    {

        private Dictionary<String, List<double>> data;

        public TelemetryData()
        {
            this.data = new Dictionary<string, List<double>>();
        }

        public TelemetryData(TelemetryDTO data)
        {
            this.data = new Dictionary<String, List<double>>();
            foreach (TireTelemetryDTO tire in data.data)
            {
                List<double> times = new List<double>();
                foreach (double time in tire.times)
                {
                    times.Add(time);
                }
                this.data.Add(tire.compound, times);
            }
        }

        public double lapTimeAt(String compound, int index)
        {
            List<double> laptimes;
            data.TryGetValue(compound, out laptimes);
            return laptimes[index];
        }

        public int numberOfTires()
        {
            return this.data.Count;
        }

        public void generateMockData()
        {
            List<double> softTimes = new List<double>();
            softTimes.Add(30.0);
            softTimes.Add(30.60);
            softTimes.Add(31.21);
            softTimes.Add(31.84);
            softTimes.Add(32.47);
            softTimes.Add(33.12);
            softTimes.Add(34.78);
            softTimes.Add(35.46);
            softTimes.Add(36.15);
            softTimes.Add(36.85);

            List<double> mediumTimes = new List<double>();
            mediumTimes.Add(31.0);
            mediumTimes.Add(32.60);
            mediumTimes.Add(32.80);
            mediumTimes.Add(33.84);
            mediumTimes.Add(33.12);
            mediumTimes.Add(34.78);
            mediumTimes.Add(35.46);
            mediumTimes.Add(35.15);
            mediumTimes.Add(36.85);
            mediumTimes.Add(36.85);
            mediumTimes.Add(36.46);
            mediumTimes.Add(37.15);
            mediumTimes.Add(38.85);
            mediumTimes.Add(39.85);

            List<double> hardTimes = new List<double>();
            hardTimes.Add(32.0);
            hardTimes.Add(32.60);
            hardTimes.Add(32.80);
            hardTimes.Add(33.84);
            hardTimes.Add(33.12);
            hardTimes.Add(33.78);
            hardTimes.Add(33.46);
            hardTimes.Add(33.15);
            hardTimes.Add(34.85);
            hardTimes.Add(34.85);
            hardTimes.Add(35.46);
            hardTimes.Add(35.15);
            hardTimes.Add(36.85);
            hardTimes.Add(36.85);
            hardTimes.Add(36.46);
            hardTimes.Add(36.15);
            hardTimes.Add(37.85);
            hardTimes.Add(37.85);
            hardTimes.Add(37.46);
            hardTimes.Add(37.15);
            hardTimes.Add(38.85);
            hardTimes.Add(38.85);

            this.data.Add("Soft", softTimes);
            this.data.Add("Medium", mediumTimes);
            this.data.Add("Hard", hardTimes);
        }

        public List<Double> getLapTimes(String compound)
        {
            List<double> laptimes;
            data.TryGetValue(compound, out laptimes);
            return laptimes;
        }

        public double getLap(String compound, int index)
        {
            List<double> laptimes;
            data.TryGetValue(compound, out laptimes);
            return laptimes[index];
        }

        public int maxIndexedLap(String compound)
        {
            List<double> laptimes;
            data.TryGetValue(compound, out laptimes);
            return laptimes.Count - 2;
        }

    }
}
