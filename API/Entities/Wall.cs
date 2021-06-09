using System.Collections.Generic;

namespace API.Entities
{
    public class Wall
    {
        public int Id { get; set; }
        public List<Post> Posts { get; set; }
    }
}