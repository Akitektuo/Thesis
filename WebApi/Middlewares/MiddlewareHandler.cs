using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using WebApi.Shared;
using WebApi.ViewModels;

namespace WebApi.Middlewares
{
    public class MiddlewareHandler
    {
        private readonly RequestDelegate nextRequest;

        public MiddlewareHandler(RequestDelegate nextRequest)
        {
            this.nextRequest = nextRequest;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            var bodyBeforeNextRequest = response.Body;
            var memoryStream = new MemoryStream();
            response.Body = memoryStream;

            try
            {
                await nextRequest(context);

                response.Body = bodyBeforeNextRequest;
                    
                var resultToWrap = await ObtainResultToWrap(memoryStream);
                var result = new ResponseModel(response.StatusCode, resultToWrap);
                await response.WriteAsync(JsonSerializer.Serialize(result));
            }
            catch (Exception exception)
            {
                if (response.StatusCode == (int)HttpStatusCode.OK)
                    response.StatusCode = (int)HttpStatusCode.BadRequest;

                var result = new ResponseModel(response.StatusCode, exception.Message);
                await response.WriteAsync(JsonSerializer.Serialize(result));
            }
            finally
            {
                memoryStream.Close();
            }
        }

        private async Task<object> ObtainResultToWrap(MemoryStream fromBody)
        {
            var parsedObject = await fromBody.ToObjectAsync();
            if (parsedObject != null)
                return parsedObject;

            var parsedString = await fromBody.ToStringAsync();

            return parsedString.ToInt() ??
                parsedString.ToBool() as object ??
                parsedString;
        }
    }
}
