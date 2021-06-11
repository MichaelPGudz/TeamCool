using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using API.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TeamController: BaseApiController
    {
        private readonly ITeamDao _teamDao;

        public TeamController(ITeamDao teamDao)
        {
            _teamDao = teamDao;
        }

        [HttpGet("{id}")]
        public TeamViewModel GetById(int id)
        {
            var team = _teamDao.GetById(id);
            var teamView = new TeamViewModel
            {
                Id = team.Id,
                Name = team.Name,
                ChildTeams = new List<ChildTeamViewModel>()
            };
            foreach (var childTeam in team.ChildTeams)
            {
                teamView.ChildTeams.Add(new ChildTeamViewModel{ Id = childTeam.Id, Name = childTeam.Name});
            }
            
            return teamView;
        }

        [HttpPost("AddNewTeam")]
        public async Task<IActionResult> AddNewTeam(Team newTeam)
        {
            if (!ModelState.IsValid) return BadRequest();
            var result = await _teamDao.Add(newTeam);
            return Ok();
        }
        [HttpPost("{parentId}/AddChildTeam")]
        public async Task<IActionResult> AddChildTeam(Team childTeam, int parentId)
        {
            if (!ModelState.IsValid) return BadRequest();
            
            await _teamDao.AddChildTeam(childTeam, parentId);

            return Ok();
        }

    }
}