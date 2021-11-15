using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PREC_API.Classes;

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

        [HttpGet]
        public String Get()
        {
            TelemetryData data = new TelemetryData();
            data.generateMockData();
            Calculator calculator = new Calculator(20, 30, data);
            Strategy s = calculator.getBestStrategy();

             Console.WriteLine(s.toString());
            int totalTimeMins = (int)Math.Floor(s.getTotalTime() / 60);
            int totalTimeSecs = (int)s.getTotalTime() % 60;
            Console.WriteLine("Total Time: " + totalTimeMins + ":" + totalTimeSecs);
            return Newtonsoft.Json.JsonConvert.SerializeObject(s);
        }
    }
}
