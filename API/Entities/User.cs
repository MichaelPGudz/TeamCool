using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Entities
{
    public class User: IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        
        [JsonIgnore]
        public override string PasswordHash { get; set; }
        public string GlobalRole { get; set; }
        public ICollection<TeamMember> MyTeams { get; set; }
        public ICollection<Skill> MySkills { get; set; }
    }
}