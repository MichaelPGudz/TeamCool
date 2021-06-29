using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface ISkillDao: IDao<Skill>
    {
        public IQueryable<ICollection<User>> GetUsersForSkill(int id);
    }
}