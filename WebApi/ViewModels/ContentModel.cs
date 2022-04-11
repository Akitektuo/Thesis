namespace WebApi.ViewModels
{
    public class ContentModel
    {
        public ContentType Type { get; set; }

        public string Text { get; set; }

        public ContentModel()
        {
        }

        public ContentModel(Content content)
        {
            Type = content.Type;
            Text = content.Text;
        }
    }
}
