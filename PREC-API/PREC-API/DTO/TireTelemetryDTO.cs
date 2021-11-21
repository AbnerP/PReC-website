using System;
using System.Collections.Generic;

namespace PREC_API.DTO
{
    public class TireTelemetryDTO
    {
        public string compound { get; set; }
        public List<LapDTO> times { get; set; }
    }
}
