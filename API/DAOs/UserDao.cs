using System.Collections.Generic;
using System.Linq;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DAOs
{
    public class UserDao : IUserDao
    {
        private readonly DataContext _dataContext;

        public UserDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public User GetById(int id)
        {
            return _dataContext.Users
                .Include(x => x.MySkills)
                .Include(y => y.MyTeams)
                .FirstOrDefault(x => x.Id == id);
        }

        public void Add(User newOne) => _dataContext.Users.Add(newOne);

        public void Remove(User toRemove) => _dataContext.Users.Remove(toRemove);

        public IQueryable<ICollection<Skill>> GetUserSkills(int id)
        {
            return _dataContext.Users.Where(u => u.Id == id).Select(u => u.MySkills);
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