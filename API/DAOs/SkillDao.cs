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
    public class SkillDao: ISkillDao
    {
        private readonly DataContext _dataContext;

        public SkillDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        public async Task<ActionResult<Skill>> GetById(int id)
        {
            return await _dataContext.Skills.Include(x => x.Users).FirstOrDefaultAsync(x => x.Id == id);
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

        public ICollection<Skill> GetAll() => _dataContext.Skills.ToList();
        
        
        public IQueryable<ICollection<User>> GetUsersForSkill(int id)
                {
                    return _dataContext.Skills.Where(skill => skill.Id == id).Select(x => x.Users);
                }
    }
}