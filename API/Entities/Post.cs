using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Required][ForeignKey("Wall")]
        public int WallId { get; set; }
    } 
}