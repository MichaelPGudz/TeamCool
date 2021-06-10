﻿using System.Collections.Generic;
using System.Linq;
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
        public User GetUserById(int id) => _userDao.GetById(id);
        
        [HttpGet("GetSkillsForUser/{id}")]
        public IQueryable<ICollection<Skill>> GetSkillsForUser(int id) => _userDao.GetUserSkills(id);
    }
}
