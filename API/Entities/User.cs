﻿using System.Collections.Generic;

namespace API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<TeamMember> MyTeams { get; set; }
        public ICollection<UserSkill> UserSkills { get; set; }
    }
}