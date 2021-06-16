using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using API.Utils;
using API.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class TeamController : BaseApiController
    {
        private readonly ITeamDao _teamDao;
        private readonly IUserDao _userDao;
        private readonly ITeamMemberDao _teamMemberDao;
        private readonly IRoleDao _roleDao;
        private readonly IFeatureDao _featureDao;

        public TeamController(ITeamDao teamDao, IUserDao userDao, ITeamMemberDao teamMemberDao, IRoleDao roleDao, IFeatureDao featureDao)
        {
            _teamDao = teamDao;
            _userDao = userDao;
            _teamMemberDao = teamMemberDao;
            _roleDao = roleDao;
            _featureDao = featureDao;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeamViewModel>> GetById(int id)
        {
            var team = await _teamDao.GetById(id);
            if (team.Value == null)
            {
                return NotFound();
            }

            var teamView = MakeViewModel.MakeTeamViewModel(team.Value);

            return teamView;
        }

        [HttpPost("AddNewTeam")]
        public async Task<IActionResult> AddNewTeam(Team newTeam)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                await _teamDao.Add(newTeam);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("{parentId}/AddChildTeam")]
        public async Task<IActionResult> AddChildTeam(Team childTeam, int parentId)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                var parentTeam = await _teamDao.GetById(parentId);
                if (parentTeam == null)
                {
                    return NotFound();
                }

                await _teamDao.AddChildTeam(childTeam, parentTeam.Value);
            }
            catch (Exception)
            {
                return BadRequest();
            }


            return Ok();
        }

        [HttpPut("{id}/Edit")]
        public async Task<IActionResult> EditTeamName(Team editedTeam, int id)
        {
            if (id != editedTeam.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var team = await _teamDao.GetById(id);
                team.Value.Name = editedTeam.Name;
                await _teamDao.Edit(team.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}/Delete")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            try
            {
                var team = await _teamDao.GetById(id);
                if (team == null)
                {
                    return NotFound();
                }

                _teamDao.Remove(team.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        
        [HttpPost("{teamId}/AddTeamMember/{userId}/{roleId}")]
        public async Task<IActionResult> AddTeamMember(int teamId, int userId, int roleId)
        {
            try
            {
                var user = await _userDao.GetById(userId);
                var role = await _roleDao.GetById(roleId);
                var team = await _teamDao.GetById(teamId);

                var teamMember = new TeamMember
                {
                    Role = role.Value,
                    Team = team.Value,
                    User = user.Value
                };

                await _teamMemberDao.Add(teamMember);
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("{teamId}/AddFeature/{featureId}")]
        public async Task<IActionResult> AddFeature(int teamId, int featureId)
        {
            try
            {
                var team = await _teamDao.GetById(teamId);
                var feature = await _featureDao.GetById(featureId);

                team.Value.Features.Add(feature.Value);
                await _teamDao.Edit(team.Value);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [HttpDelete("{teamId}/DeleteFeature/{featureId}")]
        public async Task<IActionResult> DeleteFeature(int teamId, int featureId)
        {
            try
            {
                var team = await _teamDao.GetById(teamId);
                if (team.Value.Features.Any(x => x.Id == featureId))
                {
                    var featureToRemove = team.Value.Features.FirstOrDefault(x => x.Id == featureId);
                    team.Value.Features.Remove(featureToRemove);
                    await _teamDao.Edit(team.Value);

                }
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPatch("{teamId}/EditFeature/{featureId}")]
        public async Task<IActionResult> EditFeature(int teamId, int featureId, Feature feature)
        {
            try
            {
                await _featureDao.Edit(feature);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
    }
}