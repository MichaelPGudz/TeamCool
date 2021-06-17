using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Wall
    {
        public int Id { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}