using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Query;

namespace API.DAOs
{
    public class UserDao : IUserDao
    {
        private readonly DataContext _dataContext;

        public UserDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ActionResult<User>> GetById(int id)
        {
           return  await _dataContext.Users
               .Include(x => x.MySkills)
               .Include(y => y.MyTeams).ThenInclude(x => x.Team)
               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Add(User newOne)
        {
            await _dataContext.Users.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public void Remove(User toRemove)
        {
            _dataContext.Users.Remove(toRemove);
            _dataContext.SaveChanges();
        }
        public Task<int> Edit(User toEdit)
        {
            _dataContext.Users.Update(toEdit);
             return _dataContext.SaveChangesAsync();
        }

        public IQueryable<ICollection<Skill>> GetUserSkills(int id)
        {
            return _dataContext.Users.Where(user => user.Id == id).Select(c => c.MySkills);
        }
        

        public IIncludableQueryable<TeamMember, Team> GetUserTeams(int id)
        {
            return _dataContext.Users
                .Where(x => x.Id == id)
                .SelectMany(x => x.MyTeams).Include(x => x.Team);

        }
    }
}