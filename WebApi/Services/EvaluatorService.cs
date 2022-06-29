using System.Diagnostics;

namespace WebApi.Services;

public class EvaluatorService : IEvaluatorService
{
    public List<string> Evaluate(string fileName, string ruleSet) =>
        ExecuteAnalyzerCommand(fileName, ruleSet).Trim()
            .Replace("\r\n", "\n")
            .Split("\n")
            .Where(message => !string.IsNullOrWhiteSpace(message))
            .ToList();

    private string ExecuteAnalyzerCommand(string fileName, string ruleSet)
    {
        var processInfo = new ProcessStartInfo
        {
            FileName = "cmd.exe",
            Arguments = $"/C {Constants.Command} \"{fileName}\" {ruleSet}",
            UseShellExecute = false,
            RedirectStandardOutput = true,
            CreateNoWindow = true,
        };

        using var process = Process.Start(processInfo);

        var output = process.StandardOutput.ReadToEnd();

        process.WaitForExit();

        return output;
    }
}
