using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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
            var user = await _dataContext.Users.FindAsync(id);

            if (user != null)
            {
                await _dataContext.Entry(user).Collection(i => i.MyTeams)
                    .Query()
                    .Include(i => i.Team)
                    .LoadAsync();
                await _dataContext.Entry(user).Collection(i => i.UserSkills)
                    .Query()
                    .Include(i => i.Skill)
                    .LoadAsync();
            }

            return user;
        }

        public async Task<int> Add(User newOne)
        {
            await _dataContext.Users.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public void Remove(User toRemove) => _dataContext.Users.Remove(toRemove);
        public Task<int> Edit(User toEdit)
        {
            _dataContext.Users.Update(toEdit);
             return _dataContext.SaveChangesAsync();
        }

        public List<UserSkill> GetUserSkills(int id)
        {
            return _dataContext.UserSkills.Include(x => x.Skill).Where(x => x.UserId == id).ToList();
        }
        

        public IQueryable<ICollection<Team>> GetUserTeams(int id)
        {
            return _dataContext.Users
                .Where(x => x.Id == id)
                .SelectMany(x => x.MyTeams)
                .GroupBy(x => x.Team)
                .Select(x => x.Key)
                .Cast<ICollection<Team>>();

        }
    }
}