namespace API.Entities
{
    public class TeamMember
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Role Role { get; set; }
        public Team Team { get; set; }
    }
}