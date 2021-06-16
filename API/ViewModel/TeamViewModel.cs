using System.Collections.Generic;
using API.Entities;

namespace API.ViewModel
{
    public class TeamViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public ICollection<TeamViewModel> ChildTeams { get; set; }
        public ICollection<TeamMemberViewModel> Members { get; set; }
        public ICollection<Feature> Features { get; set; }
    }
}