namespace WebApi.Shared.Extensions;

public static class MathExtensions
{
    public static int Sqrt(this int number) => (int)Math.Floor(Math.Sqrt(number));

    public static int Pow(this int number, int power) => (int)Math.Pow(number, power);
}
