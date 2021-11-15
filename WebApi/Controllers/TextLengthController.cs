using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Aggregators;
using WebApi.Shared;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextLengthController : ControllerBase
    {
        [HttpPost]
        public IActionResult Get(TextAggregator textAggregator)
        {
            var output = "";

            var processInfo = new ProcessStartInfo
            {
                FileName = "cmd.exe",
                Arguments = $"/C {Constants.Command} \"{textAggregator.Content}\"",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                CreateNoWindow = true,
            };

            using (var process = Process.Start(processInfo))
            {
                output = process.StandardOutput.ReadToEnd();

                process.WaitForExit();
            }

            return Ok(new TextAggregator
            {
                Content = output
            });
        }
    }
}
