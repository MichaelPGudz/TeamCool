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

        [HttpGet("{id:int}")]
        public Team GetTeamById(int id) => _teamDao.GetById(id);
        
        

    }
}