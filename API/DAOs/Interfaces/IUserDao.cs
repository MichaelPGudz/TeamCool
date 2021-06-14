using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface IUserDao: IDao<User>
    {
        public List<Skill> GetUserSkills(int id);
        public List<Team> GetUserTeams(int id);
    }
}