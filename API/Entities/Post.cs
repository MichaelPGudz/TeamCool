using System;

namespace API.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public string PostContent { get; set; }
        public DateTime PostTime { get; set; }
        public User Author { get; set; }
        public string PostStatus { get; set; }
        
    }
}