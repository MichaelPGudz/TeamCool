using System;
using System.ComponentModel.DataAnnotations;
using API.Utils;

namespace API.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public string PostContent { get; set; }
        public DateTime PostTime { get; set; }
        public User Author { get; set; }
        public Status PostStatus { get; set; }
        [Required]
        public Wall Wall { get; set; }
    }
}