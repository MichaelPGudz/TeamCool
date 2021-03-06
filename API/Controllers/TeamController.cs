using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using API.Utils;
using API.ViewModel;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Authorize]
    public class TeamController : BaseApiController
    {
        private readonly ITeamDao _teamDao;
        private readonly IUserDao _userDao;
        private readonly ITeamMemberDao _teamMemberDao;
        private readonly IRoleDao _roleDao;
        private readonly IFeatureDao _featureDao;
        private readonly UserManager<User> _userManager;
        private readonly string teamOwnerName = "Team Owner";

        public TeamController(ITeamDao teamDao, IUserDao userDao, ITeamMemberDao teamMemberDao, IRoleDao roleDao,
            IFeatureDao featureDao, UserManager<User> userManager)
        {
            _teamDao = teamDao;
            _userDao = userDao;
            _teamMemberDao = teamMemberDao;
            _roleDao = roleDao;
            _featureDao = featureDao;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetById(int id) => await _teamDao.GetById(id);

        [HttpPost]
        public async Task<IActionResult> AddNewTeam(Team newTeam)
        {
            if (!ModelState.IsValid) return BadRequest();
            
            var currentUserName = User.Identity?.Name;
            var user = await _userManager.FindByNameAsync(currentUserName);
            var role = await _roleDao.GetByRoleName(teamOwnerName);

            var member = new TeamMember
            {
                User = user,
                Role = role.Value,
                Team = newTeam
            };
            newTeam.Wall = new Wall();
            
            await _teamDao.Add(newTeam);
            await _teamMemberDao.Add(member);
            
            return Ok(member);
        }

        [HttpPost("{parentId}")]
        public async Task<IActionResult> AddChildTeam(Team childTeam, int parentId)
        {
            if (!ModelState.IsValid) return BadRequest();

            var parentTeam = await _teamDao.GetById(parentId);

            if (parentTeam.Value == null) return NotFound();

            childTeam.Wall = new Wall();
            await _teamDao.AddChildTeam(childTeam, parentTeam.Value);

            return Ok(childTeam);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Team>> EditTeamName(Team editedTeam, int id)
        {
            if (!ModelState.IsValid) return BadRequest();

            var team = await _teamDao.GetById(id);

            if (team.Value == null) return NotFound();

            team.Value.Name = editedTeam.Name;
            await _teamDao.Edit(team.Value);
            return team;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _teamDao.GetById(id);
            if (team.Value == null) return NotFound();

            _teamDao.Remove(team.Value);
            return Ok();
        }
        
    // returns all team members
        [HttpPost("{teamId}/AddTeamMember/{userId}/{roleId}")]
        public async Task<IActionResult> AddTeamMember(int teamId, string userId, int roleId)
        {
            var user = await _userDao.GetById(userId);
            var role = await _roleDao.GetById(roleId);
            var team = await _teamDao.GetById(teamId);
            if (user.Value == null || role.Value == null || team.Value == null) return NotFound();
            if (team.Value.Members.Any(x => x.User.Id.Contains(userId)))
                return BadRequest($"{user.Value.FirstName} {user.Value.LastName} is already team member!");

            var teamMember = new TeamMember
            {
                Role = role.Value,
                Team = team.Value,
                User = user.Value
            }; 
            
            await _teamMemberDao.Add(teamMember);
            return Ok(team.Value.Members);
        }

        [HttpDelete("{teamId}/{teamMemberId}")]
        public async Task<IActionResult> DeleteTeamMember(int teamMemberId)
        {
            var member = await _teamMemberDao.GetById(teamMemberId);
            if (member.Value == null) return NotFound();

            _teamMemberDao.Remove(member.Value);

            return Ok();
        }

        // Return added feature 
        [HttpPost("{teamId}/addFeature")]
        public async Task<IActionResult> AddFeature(int teamId, Feature feature)
        {
            if (!ModelState.IsValid) return BadRequest();

            var team = await _teamDao.GetById(teamId);

            if (team.Value == null) return NotFound();

            team.Value.Features.Add(feature);
            await _teamDao.Edit(team.Value);

            return Ok(feature);
        }


        [HttpDelete("{teamId}/feature/{featureId}")]
        public async Task<IActionResult> DeleteFeature(int featureId)
        {
            var feature = await _featureDao.GetById(featureId);
            if (feature.Value == null) return NotFound();

            _featureDao.Remove(feature.Value);

            return Ok();
        }

        [HttpPatch("{teamId}/feature/{featureId}")]
        public async Task<IActionResult> EditFeature(int featureId, Feature feature)
        {
            if (!ModelState.IsValid) return BadRequest();
            var oldFeature = await _featureDao.GetById(featureId);
            if (oldFeature.Value == null) return NotFound();

            oldFeature.Value.Name = feature.Name;
            oldFeature.Value.URL = feature.URL;

            await _featureDao.Edit(oldFeature.Value);
            return Ok();
        }

        [HttpPost("{id}/logo")]
        public async Task<ActionResult<Team>> AddLogo(Team teamWithLogo, int id)
        {
            if (!ModelState.IsValid) return BadRequest();

            var team = await _teamDao.GetById(id);

            if (team.Value == null) return NotFound();

            team.Value.Logo = teamWithLogo.Logo;
            await _teamDao.Edit(team.Value);
            return team;
        }
    }
}