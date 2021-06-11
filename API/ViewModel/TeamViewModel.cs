using System.Collections.Generic;
using API.Entities;

namespace API.ViewModel
{
    public class TeamViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ChildTeamViewModel> ChildTeams { get; set; }
    }
}