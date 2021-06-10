using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface IUserDao: IDao<User>
    {
        public IQueryable<ICollection<Skill>> GetUserSkills(int id);
    }
}