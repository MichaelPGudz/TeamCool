using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.DAOs.Interfaces
{
    public interface IRoleDao: IDao<Role>
    {
        public Task<ActionResult<Role>> GetByRoleName(string name);
    }
}