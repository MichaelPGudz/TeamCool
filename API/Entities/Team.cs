using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<TeamMember> Members { get; set; }
        public Wall Wall { get; set; }
        public ICollection<Feature> Features { get; set; }
        public Team ParentTeam { get; set; }
        public ICollection<Team> ChildTeams { get; set; }
        
    }
}
