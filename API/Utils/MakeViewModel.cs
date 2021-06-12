using System.Collections.Generic;
using API.Entities;
using API.ViewModel;

namespace API.Utils
{
    public static class MakeViewModel
    {
        public static TeamViewModel MakeTeamViewModel(Team team)
        {
            var viewModel = new TeamViewModel
            {
                Name = team.Name,
                Id = team.Id,
                ChildTeams = new List<TeamViewModel>()
            };

            if (team.ChildTeams == null) return viewModel;
            foreach (var childTeam in team.ChildTeams)
            {
                viewModel.ChildTeams.Add(MakeTeamViewModel(childTeam));
            }


            return viewModel;
        }
    }
}