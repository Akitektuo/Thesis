namespace WebApi.Services;

public class EvaluatorService : IEvaluatorService
{
    public List<string> Evaluate(string fileName)
    {
        return new() { "Some found error message" };
    }
}
