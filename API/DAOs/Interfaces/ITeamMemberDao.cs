using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.DAOs.Interfaces
{
    public interface ITeamMemberDao: IDao<TeamMember>
    {
        public ICollection<TeamMember> GetTeamMembersForTeam(int teamId);

        public IOrderedEnumerable<ICollection<Post>> GetPostsForTeamMember(int userId);
    }
}