using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.DAOs
{
    public class RoleDao: IRoleDao
    {
        private readonly DataContext _dataContext;

        public RoleDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<ActionResult<Role>> GetById(int id)
        {
            return await _dataContext.Roles.FindAsync(id);
        }

        public async Task<int> Add(Role newOne)
        {
            await _dataContext.Roles.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public void Remove(Role toRemove)
        {
            _dataContext.Roles.Remove(toRemove);
            _dataContext.SaveChanges();
        }

        public async Task<int> Edit(Role toEdit)
        {
             _dataContext.Roles.Update(toEdit);
             return await _dataContext.SaveChangesAsync();
        }

        public ICollection<Role> GetAll()
        {
            return _dataContext.Roles.ToList();
        }
    }
}