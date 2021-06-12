using System.Threading.Tasks;
using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface ITeamDao: IDao<Team>
    { 
        Task<int> AddChildTeam(Team childTeam, Team parentTeam);

        Task<int> EditTeam(Team team);
    }
}