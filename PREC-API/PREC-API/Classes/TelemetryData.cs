using System;
using System.Collections.Generic;

namespace PREC_API.Classes
{
    public class TelemetryData
    {
        private Dictionary<String, TireTelemetry> data;

        public TelemetryData()
        {
            data = new Dictionary<String, TireTelemetry>();
        }

        public double lapTimeAt(String tire, int index)
        {
            TireTelemetry laptimes;
            data.TryGetValue(tire, out laptimes);
            return laptimes.lapTimeAt(index);
        }

        public int numberOfTires()
        {
            return this.data.Count;
        }

        public void generateMockData()
        {
            TireTelemetry s = new TireTelemetry();
            TireTelemetry m = new TireTelemetry();
            TireTelemetry h = new TireTelemetry();

            s.generateSoftMockData();
            m.generateMediumMockData();
            h.generateHardMockData();

            this.data.Add("Soft", s);
            this.data.Add("Medium", m);
            this.data.Add("Hard", h);
        }

        public List<Double> getLapTimes(String compound)
        {
            TireTelemetry laptimes;
            data.TryGetValue(compound, out laptimes);
            return laptimes.getLapTimes();
        }

        public double getLap(String compound, int index)
        {
            TireTelemetry laptimes;
            data.TryGetValue(compound, out laptimes);
            return laptimes.lapTimeAt(index);
        }

        public int maxIndexedLap(String compound)
        {
            TireTelemetry laptimes;
            data.TryGetValue(compound, out laptimes);
            return laptimes.indexedMaxLap();
        }

    }
}
