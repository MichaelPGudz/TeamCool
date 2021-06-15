using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.DAOs
{
    public class SkillDao: IDao<Skill>
    {
        private readonly DataContext _dataContext;

        public SkillDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        public async Task<ActionResult<Skill>> GetById(int id)
        {
            return await _dataContext.Skills.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Add(Skill newOne)
        {
            await _dataContext.Skills.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public void Remove(Skill toRemove)
        {
            _dataContext.Skills.Remove(toRemove);
            _dataContext.SaveChanges();
        }

        public Task<int> Edit(Skill toEdit)
        {
            _dataContext.Skills.Update(toEdit);
            return _dataContext.SaveChangesAsync();
        }
    }
}