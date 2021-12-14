using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PREC_API.Classes;
using PREC_API.DTO;

namespace PREC_API.Controllers
{
    [ApiController]
    [Route("api/calculator")]
    public class CalculatorController : ControllerBase
    {
        

        private readonly ILogger<CalculatorController> _logger;

        public CalculatorController(ILogger<CalculatorController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public String Post([FromBody] TelemetryDTO d, [FromQuery(Name = "laps")] int laps, [FromQuery(Name = "pitLoss")] double pitLoss)
        {
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(d));

            TelemetryData data = new TelemetryData(d);
            Calculator calculator = new Calculator(laps-1, pitLoss, data);
            Strategy s = calculator.getBestStrategy();

            return Newtonsoft.Json.JsonConvert.SerializeObject(s);
        }
    }
}
