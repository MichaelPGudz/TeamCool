namespace API.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Team RoleTeam { get; set; }
    }
}