using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

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
        }

        public async Task<int> Edit(TeamMember toEdit)
        {
            _dataContext.TeamMembers.Update(toEdit);
            return await _dataContext.SaveChangesAsync();
        }

        public ICollection<TeamMember> GetTeamMembersForTeam(int teamId)
        {
            return _dataContext.TeamMembers.Where(t => t.Team.Id == teamId).ToList();
        }
    }
}