using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebApi.Exceptions;

public class ClientException : Exception
{
    public ClientException(string message) : base(message)
    {
    }

    public static void ValidateModel(ModelStateDictionary modelState)
    {
        if (modelState.IsValid)
            return;

        var errorMessages = modelState.Values
            .SelectMany(requirement => requirement.Errors)
            .Select(error => error.ErrorMessage);

        throw new ClientException(string.Join("\n", errorMessages));
    }
}
