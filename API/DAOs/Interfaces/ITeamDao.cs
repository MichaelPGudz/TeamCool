using System.Threading.Tasks;
using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface ITeamDao: IDao<Team>
    { 
        Task<int> AddChildTeam(Team childTeam, int parentId);
    }
}