﻿using System;
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

        public UserController(IUserDao userDao)
        {
            _userDao = userDao;
        }

        [HttpPost("AddUser")]
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
        
        [HttpDelete("{id}/Delete")]
        public async Task<IActionResult> DeleteUser(int id)
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
        
        
        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<User>> GetUserById(int id) => await _userDao.GetById(id);
        
        [HttpGet("GetSkillsForUser/{id}")]
        public IQueryable<ICollection<Skill>> GetSkillsForUser(int id) => _userDao.GetUserSkills(id);
        
        [HttpGet("GetTeamsForUser/{id}")]
        public IIncludableQueryable<TeamMember, Team> GetTeamsForUser(int id) => _userDao.GetUserTeams(id);
    }
}
