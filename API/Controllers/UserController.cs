using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserDao _userDao;
        private readonly ISkillDao _skillDao;
        private readonly ITeamMemberDao _teamMemberDao;

        public UserController(IUserDao userDao, ISkillDao skillDao, ITeamMemberDao teamMemberDao)
        {
            _userDao = userDao;
            _skillDao = skillDao;
            _teamMemberDao = teamMemberDao;
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddNewUser(User user)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                await _userDao.Add(user);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var user = await _userDao.GetById(id);
                if (user == null)
                {
                    return NotFound();
                }
                _userDao.Remove(user.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(string id) => await _userDao.GetById(id);
        
        [HttpGet("{id}/skills")]
        public IQueryable<ICollection<Skill>> GetSkillsForUser(string id) => _userDao.GetUserSkills(id);

        [HttpPost("{userId}/skill/{skillId}")]
        public IActionResult AddSkillForUser(string userId, int skillId)
        {
            var skill = _skillDao.GetById(skillId);
            if (skill.Result.Value == null) return BadRequest();
            try
            {
                _userDao.AddUserSkill(userId, skill.Result.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{userId}/skill/{skillId}")]
        public IActionResult RemoveSkillFromUser(string userId, int skillId)
        {
            var skill = _skillDao.GetById(skillId);
            if (skill.Result.Value == null) return BadRequest();
            try
            {
                _userDao.RemoveUserSkill(userId, skill.Result.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        [HttpGet("{id}/teams")]
        public IIncludableQueryable<TeamMember, Team> GetTeamsForUser(string id) => _userDao.GetUserTeams(id);
        
        
        [HttpGet("{id}/posts")]
        public IOrderedQueryable<Post> GetPostsForUser(string id) => _teamMemberDao.GetPostsForTeamMember(id);

        [HttpPost("search")]
        public ICollection<User> SearchUsers([FromBody]string name)
        {
            return _userDao.SearchUserByName(name);
        }
    }
}
