using System.Collections.Generic;
using System.Linq;
using API.Entities;
using Microsoft.EntityFrameworkCore.Query;

namespace API.DAOs.Interfaces
{
    public interface IUserDao: IDao<User>
    {
        public IQueryable<ICollection<Skill>> GetUserSkills(int id);
        public IIncludableQueryable<TeamMember, Team> GetUserTeams(int id);
    }
}