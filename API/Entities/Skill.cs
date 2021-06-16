using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Skill
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        public ICollection<User> Users { get; set; }
    }
}