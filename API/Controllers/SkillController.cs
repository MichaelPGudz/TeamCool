﻿using System;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SkillController : BaseApiController
    {
        private readonly IDao<Skill> _skillDao;

        public SkillController(IDao<Skill> skillDao)
        {
            _skillDao = skillDao;
        }

        [HttpPost("AddSkill")]
        public async Task<ActionResult<Skill>> AddNewSkill(Skill skill)
        {
            if (!ModelState.IsValid) return BadRequest();
            try
            {
                await _skillDao.Add(skill);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}/Delete")]
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

        [HttpPatch("{id}/Edit")]
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

        [HttpGet("GetSkillById/{id}")]
        public Task<ActionResult<Skill>> GetSkillById(int id)
        {
            return _skillDao.GetById(id);
        }
    }
}