using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace API.DAOs
{
    public class TeamMemberDao : ITeamMemberDao
    {
        private readonly DataContext _dataContext;

        public TeamMemberDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ActionResult<TeamMember>> GetById(int id) => await _dataContext.TeamMembers.FindAsync(id);

        public async Task<int> Add(TeamMember newOne)
        {
            await _dataContext.TeamMembers.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public void Remove(TeamMember toRemove)
        {
            _dataContext.TeamMembers.Remove(toRemove);
             _dataContext.SaveChanges();
        }

        public async Task<int> Edit(TeamMember toEdit)
        {
            _dataContext.TeamMembers.Update(toEdit);
            return await _dataContext.SaveChangesAsync();
        }

        public ICollection<TeamMember> GetAll()
        {
            return _dataContext.TeamMembers.ToList();
        }

        public ICollection<TeamMember> GetTeamMembersForTeam(int teamId)
        {
            return _dataContext.TeamMembers
                .Include(tm => tm.User)
                .Where(t => t.Team.Id == teamId).ToList();
        }
        
        public IOrderedEnumerable<ICollection<Post>> GetPostsForTeamMember(int userId)
        {
            return _dataContext.TeamMembers
                .Where(t => t.User.Id == userId)
                .Select(tm => tm.Team)
                .Select(t => t.Wall)
                .Select(w => w.Posts).ToList().OrderBy(x => x.Select(y => y.PostTime));

        }
    }
}