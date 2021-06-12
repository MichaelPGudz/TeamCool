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

        public TeamController(ITeamDao teamDao)
        {
            _teamDao = teamDao;
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
                await _teamDao.EditTeam(team.Value);
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
    }
}