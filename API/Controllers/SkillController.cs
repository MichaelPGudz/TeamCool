using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SkillController : BaseApiController
    {
        private readonly ISkillDao _skillDao;

        public SkillController(ISkillDao skillDao)
        {
            _skillDao = skillDao;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddNewSkill(Skill skill)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                await _skillDao.Add(skill);
                return Ok(skill);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSkill(int id)
        {
            try
            {
                var skill = await _skillDao.GetById(id);
                if (skill == null)
                {
                    return NotFound();
                }
                _skillDao.Remove(skill.Value);
                return Ok();
            }
            catch(Exception)
            {
                return BadRequest();
            }
        }

        [HttpPatch("{id}")]
        public IActionResult EditSkill(int id, Skill editedSkill)
        {
            if (id != editedSkill.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var skill = _skillDao.GetById(id);
                skill.Result.Value.FirstName = editedSkill.FirstName;
                _skillDao.Edit(skill.Result.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public Task<ActionResult<Skill>> GetSkillById(int id)
        {
            return _skillDao.GetById(id);
        }
        
        
        [HttpGet("{id}/users")]
        public IQueryable<User> GetUsersForSkills(int id)
        {
            return _skillDao.GetUsersForSkill(id);
        }

        [HttpGet("~/api/skills")]
        public ICollection<Skill> GetAll()
        {
            return _skillDao.GetAll();
        }
        
        [HttpPost("search")]
        public ICollection<Skill> SearchSkills([FromBody]string name)
        {
            return _skillDao.SearchSkillByName(name);
        }
    }
}