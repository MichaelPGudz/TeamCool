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

        public async Task<ActionResult<User>> GetById(string id)
        {
           return  await _dataContext.Users
               .Include(x => x.MySkills)
               .Include(y => y.MyTeams).ThenInclude(x => x.Team)
               .ThenInclude(x => x.Wall)
               .Include(y => y.MyTeams).ThenInclude(x => x.Role)
               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Add(User newOne)
        {
            await _dataContext.Users.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public void Remove(User toRemove)
        {
            _dataContext.Posts.RemoveRange(_dataContext.Posts.Where(x => x.Author == toRemove));
            _dataContext.TeamMembers.RemoveRange(_dataContext.TeamMembers.Where(x => x.User == toRemove));
            _dataContext.Users.Remove(toRemove);
            _dataContext.SaveChanges();
        }
        public Task<int> Edit(User toEdit)
        {
            _dataContext.Users.Update(toEdit);
             return _dataContext.SaveChangesAsync();
        }

        public ICollection<User> GetAll()
        {
            return _dataContext.Users.ToList();
        }

        public IQueryable<Skill> GetUserSkills(string id)
        {
            return _dataContext.Users.Where(user => user.Id == id).SelectMany(c => c.MySkills);
        }


        public int AddUserSkill(string userId, Skill skill)
        {
            var user = _dataContext.Users.Include(x => x.MySkills).FirstOrDefault(x => x.Id == userId);
            user.MySkills.Add(skill);
            skill.Users.Add(user);
            return _dataContext.SaveChanges();
        }


        public int RemoveUserSkill(string userId, Skill skill)
        {
            var user = this.GetById(userId);
            user.Result.Value.MySkills.Remove(skill);
            skill.Users.Remove(user.Result.Value);
            return _dataContext.SaveChanges();
        }
        

        public IIncludableQueryable<TeamMember, Team> GetUserTeams(string id)
        {
            return _dataContext.Users
                .Where(x => x.Id == id)
                .SelectMany(x => x.MyTeams).Include(x => x.Team);

        }

        public ICollection<User> SearchUserByName(string name)
        {
            return _dataContext.Users
                .Where(x => x.FirstName.Contains(name) || x.LastName.Contains(name)).ToList();
        }
    }
}