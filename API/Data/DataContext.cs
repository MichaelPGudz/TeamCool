using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using API.Entities;
using FizzWare.NBuilder;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<User>
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
        public DbSet<User> Users { get; set; }
        public DbSet<Wall> Walls { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .EnableSensitiveDataLogging();
            base.OnConfiguring(optionsBuilder);
        }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Wall>()
            //     .HasData(new Wall
            //     {
            //         Id = 1
            //     });
            // modelBuilder.Entity<Team>()
            //     .HasData(new 
            //     {
            //         Id = 1,
            //         Name = "Test Team",
            //         WallId = 1
            //     });
            // modelBuilder.Entity<User>()
            //     .HasData(new User
            //     {
            //         Id = 1, 
            //         FirstName = "Admin",
            //         LastName = "Adminowski",
            //     });
            // modelBuilder.Entity<User>()
            //     .HasData(new User
            //     {
            //         Id = 2,
            //         FirstName = "User",
            //         LastName = "Userowski",
            //     });
            modelBuilder.Entity<User>().HasData(Seed.GenerateUsers());
            modelBuilder.Entity<Team>().HasData(Seed.GenerateTeams());
            modelBuilder.Entity<Skill>().HasData(Seed.GenerateSkills());
            modelBuilder.Entity<Feature>().HasData(Seed.GenerateFeatures());
            modelBuilder.Entity<Role>().HasData(Seed.GenerateRoles());
            modelBuilder.Entity<Wall>().HasData(Seed.GenerateWalls());
            // modelBuilder.Entity<Post>().HasData(Seed.GeneratePosts());
            // modelBuilder.Entity<TeamMember>().HasData(Seed.GenerateTeamMembers());
            
            base.OnModelCreating(modelBuilder);

        }
    }
}
