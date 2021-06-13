using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class TeamMember
    {
        public int Id { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public Role Role { get; set; }
        [Required]
        public Team Team { get; set; }
    }
}