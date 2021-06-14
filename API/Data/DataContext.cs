using System.Collections.Generic;
using System.Collections.Immutable;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Feature> Features { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Wall> Walls { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserSkill>()
                .HasKey(bc => new { bc.UserId, bc.SkillId });  
            modelBuilder.Entity<UserSkill>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserSkills)
                .HasForeignKey(bc => bc.UserId);  
            modelBuilder.Entity<UserSkill>()
                .HasOne(bc => bc.Skill)
                .WithMany(c => c.UserSkills)
                .HasForeignKey(bc => bc.SkillId);
            
            
            
            modelBuilder.Entity<Team>()
                .HasData(new Team
                {
                    Id = 1,
                    Name = "Test Team"
                });
            modelBuilder.Entity<User>()
                .HasData(new User
                {
                    Id = 1,
                    FirstName = "Admin",
                    LastName = "Adminowski",
                });
            modelBuilder.Entity<User>()
                .HasData(new User
                {
                    Id = 2,
                    FirstName = "User",
                    LastName = "Userowski",
                });
        }
    }
}
