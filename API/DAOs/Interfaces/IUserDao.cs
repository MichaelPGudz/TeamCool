using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

namespace API.DAOs.Interfaces
{
    public interface IUserDao
    {
        public Task<ActionResult<User>> GetById(string id);
        
        Task<int> Add(User newOne);
        
        void Remove(User toRemove);

        Task<int> Edit(User toEdit);
        
        public ICollection<User> GetAll();
        
        public int AddUserSkill(string userId, Skill skill);

        public int RemoveUserSkill(string userId, Skill skill);
        public IQueryable<Skill> GetUserSkills(string id);
        public IIncludableQueryable<TeamMember, Team> GetUserTeams(string id);

        public ICollection<User> SearchUserByName(string name);
    }
}