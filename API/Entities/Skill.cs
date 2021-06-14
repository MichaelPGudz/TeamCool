using System.Collections.Generic;

namespace API.Entities
{
    public class Skill
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public ICollection<User> Users { get; set; }
    }
}