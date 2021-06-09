using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [NotMapped]
        public List<TeamMember> Members { get; set; }
        public Wall Wall { get; set; }
        public List<Feature> Features { get; set; }
        public Team ParentTeam { get; set; }
        public List<Team> ChildTeams { get; set; }
        
    }
}