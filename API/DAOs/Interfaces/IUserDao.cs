using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface IUserDao: IDao<User>
    {
        public List<UserSkill> GetUserSkills(int id);
        public IQueryable<ICollection<Team>> GetUserTeams(int id);
    }
}