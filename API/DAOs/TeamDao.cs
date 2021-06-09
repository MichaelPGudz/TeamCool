using System.Linq;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;

namespace API.DAOs
{
    public class TeamDao: ITeamDao
    {
        private readonly DataContext _dataContext;

        public TeamDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Team GetById(int id) => _dataContext.Teams.FirstOrDefault(team => team.Id == id);

        public void Add(Team newOne) => _dataContext.Teams.Add(newOne);

        public void Remove(Team team) => _dataContext.Teams.Remove(team);
    }
}