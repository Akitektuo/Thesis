namespace WebApi.Models;

public class Badge
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Image { get; set; }

    public int Points { get; set; }
}
