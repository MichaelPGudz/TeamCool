using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserDao _userDao;

        public UserController(IUserDao userDao)
        {
            _userDao = userDao;
        }
        
        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<User>> GetUserById(int id) => await _userDao.GetById(id);
        
        [HttpGet("GetSkillsForUser/{id}")]
        public IQueryable<ICollection<Skill>> GetSkillsForUser(int id) => _userDao.GetUserSkills(id);
        
        [HttpGet("GetTeamsForUser/{id}")]
        public IQueryable<ICollection<Team>> GetTeamsForUser(int id) => _userDao.GetUserTeams(id);
    }
}
