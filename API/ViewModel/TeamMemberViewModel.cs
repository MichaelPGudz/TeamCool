using API.Entities;

namespace API.ViewModel
{
    public class TeamMemberViewModel
    {
        public int Id { get; set; }
        public Role Role { get; set; }
        public int TeamId { get; set; }
        public UserViewModel User { get; set; }
    }
}