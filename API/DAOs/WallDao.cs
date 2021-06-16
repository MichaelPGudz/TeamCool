using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.DAOs
{
    public class WallDao : IWallDao
    {
        private readonly DataContext _dataContext;

        public WallDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ActionResult<Wall>> GetById(int id)
        {
            return await _dataContext.Walls
                .Include(w => w.Posts)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<int> Add(Wall newOne)
        {
            await _dataContext.Walls.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public void Remove(Wall toRemove)
        {
            _dataContext.Walls.Remove(toRemove);
            _dataContext.SaveChanges();
        }

        public async Task<int> Edit(Wall toEdit)
        {
            _dataContext.Walls.Update(toEdit);
            return await _dataContext.SaveChangesAsync();
        }

        public ICollection<Wall> GetAll()
        {
            return _dataContext.Walls.ToList();
        }
    }
}