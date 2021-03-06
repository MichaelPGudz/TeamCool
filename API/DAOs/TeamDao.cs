using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.DAOs
{
    public class TeamDao : ITeamDao
    {
        private readonly DataContext _dataContext;

        public TeamDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ActionResult<Team>> GetById(int id)
        {
            var team = await _dataContext.Teams
                .Include(p => p.ParentTeam)
                .Include(t => t.Wall)
                .Include(m => m.Members)
                .ThenInclude(m => m.User)
                .Include(m => m.Members)
                .ThenInclude(m => m.Role)
                .Include(f => f.Features)
                .Include(c => c.ChildTeams)
                .FirstOrDefaultAsync(i => i.Id == id);

            return team;
        }

        public async Task<int> Add(Team newOne)
        {
            await _dataContext.Teams.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public async Task<int> AddChildTeam(Team childTeam, Team parentTeam)
        {
            if (parentTeam.ChildTeams == null)
            {
                parentTeam.ChildTeams = new List<Team> {childTeam};
            }
            else
            {
                parentTeam.ChildTeams.Add(childTeam);
            }

            await Add(childTeam);
            _dataContext.Update(parentTeam);
            return await _dataContext.SaveChangesAsync();
        }

        public async Task<int> Edit(Team team)
        {
            _dataContext.Update(team);
            return await _dataContext.SaveChangesAsync();
        }

        public ICollection<Team> GetAll() => _dataContext.Teams.ToList();


        public void Remove(Team team)
        {
            _dataContext.Teams.Remove(team);
            // _dataContext.Teams.RemoveRange(_dataContext.Teams.Where(c => c.ParentTeam.Id == team.Id));
            _dataContext.SaveChanges();
        }
        
    }
}