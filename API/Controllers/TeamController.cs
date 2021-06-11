using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
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
        public Team GetById(int id) => _teamDao.GetById(id);

        [HttpPost("AddNewTeam")]
        public async Task<IActionResult> AddNewTeam(Team newTeam)
        {
            if (!ModelState.IsValid) return BadRequest();
            var result = await _teamDao.Add(newTeam);
            return Ok();
        }

    }
}