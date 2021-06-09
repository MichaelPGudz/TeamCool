using System.Collections.Generic;

namespace API.Entities
{
    public class Wall
    {
        public int Id { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}