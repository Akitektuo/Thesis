namespace WebApi.Services;

public interface IEvaluatorService
{
    List<string> Evaluate(string fileName, string ruleSet);
}
