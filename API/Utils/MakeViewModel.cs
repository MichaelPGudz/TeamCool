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
                Path = Consts.TeamPath + team.Id,
                ChildTeams = new List<TeamViewModel>(),
                Members = new List<TeamMemberViewModel>(),
                Features = new List<Feature>()
            };

            if (team.ChildTeams != null)
            {
                foreach (var childTeam in team.ChildTeams)
                {
                    viewModel.ChildTeams.Add(MakeTeamViewModel(childTeam));
                }
            }

            if (team.Members != null)
            {
                foreach (var teamMember in team.Members)
                {
                    viewModel.Members.Add(MakeTeamMemberViewModel(teamMember));
                }
            }

            if (team.Features != null)
            {
                foreach (var teamFeature in team.Features)
                {
                    viewModel.Features.Add(teamFeature);
                }
            }

            return viewModel;
        }

        public static UserViewModel MakeUserViewModel(User user)
        {
            var viewModel = new UserViewModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
            return viewModel;
        }

        public static TeamMemberViewModel MakeTeamMemberViewModel(TeamMember teamMember)
        {
            var viewModel = new TeamMemberViewModel
            {
                Id = teamMember.Id,
                Role = teamMember.Role,
                TeamId = teamMember.Team.Id,
                User = MakeUserViewModel(teamMember.User)
            };
            return viewModel;
        }
    }
}