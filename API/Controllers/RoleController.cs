using System.Collections.Generic;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RoleController: BaseApiController
    {

        private readonly IRoleDao _roleDao;

        public RoleController(IRoleDao roleDao)
        {
            _roleDao = roleDao;
        }
        
        [HttpPost]
        public async Task<IActionResult> AddRole(Role role)
        {
            if (!ModelState.IsValid) return BadRequest();
            await _roleDao.Add(role);
            return Ok();
        }

        [HttpGet]
        public ICollection<Role> GetAll() => _roleDao.GetAll();

        [HttpGet("{roleId}")]
        public Task<ActionResult<Role>> GetById(int roleId)
        {
            return _roleDao.GetById(roleId);
        }

        [HttpDelete("{roleId}")]
        public async Task<IActionResult> Delete(int roleId)
        {
            var role = await _roleDao.GetById(roleId);
            if (role == null)
            {
                return NotFound();
            }
            _roleDao.Remove(role.Value);
            return Ok();

        }
        
    }
}