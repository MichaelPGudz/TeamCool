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

        public Team GetById(int id) => _dataContext.Teams.Include(x => x.ChildTeams).FirstOrDefault(team => team.Id == id);

        public async Task<int> Add(Team newOne)
        {
            await _dataContext.Teams.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public async Task<int> AddChildTeam(Team childTeam, int parentId)
        {
            var parentTeam = GetById(parentId);

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

        public void Remove(Team team) => _dataContext.Teams.Remove(team);
    }
}