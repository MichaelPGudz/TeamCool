using System.Collections.Generic;
using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface IRoleDao: IDao<Role>
    {
        public ICollection<Role> GetAll();

    }
}