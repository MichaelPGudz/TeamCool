using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using API.Entities;
using FizzWare.NBuilder;

namespace API.Data
{
    public class Seed
    {
        private const int userAmount = 100;
        private const int teamAmount = 20;
        private const int skillsAmount = 20;
        private const int featureAmount = 10;
        private const int roleAmount = 5;
        private const int wallAmount = 20;
        
        public static ICollection<User> GenerateUsers()
        {
            return Builder<User>.CreateListOfSize(userAmount).All()
                .With(user => user.FirstName = Faker.Name.First())
                .With(user => user.LastName = Faker.Name.Last())
                .With(user => user.Email = Faker.Internet.Email())
                .With(user => user.Password = Faker.Identification.SocialSecurityNumber())
                .Build();
        }
        public static ICollection<Team> GenerateTeams()
        {
            return Builder<Team>.CreateListOfSize(teamAmount).All()
                .With(team => team.Name = Faker.Internet.DomainName())
                .Build();
        }
        
        public static ICollection<Skill> GenerateSkills()
        {
            return Builder<Skill>.CreateListOfSize(skillsAmount).All()
                .With(skill => skill.FirstName = Faker.Internet.DomainName())
                .Build();
        }
        
        public static ICollection<Feature> GenerateFeatures()
        {
            return Builder<Feature>.CreateListOfSize(featureAmount).All()
                .With(feature => feature.Name = Faker.Internet.DomainName())
                .With(feature => feature.URL = Faker.Internet.Url())
                .Build();
        }
        public static ICollection<Role> GenerateRoles()
        {
            return Builder<Role>.CreateListOfSize(roleAmount).All()
                .With(role => role.Name = Faker.Name.Middle())
                .Build();
        }
        
        public static ICollection<Wall> GenerateWalls()
        {
            return Builder<Wall>.CreateListOfSize(wallAmount).All()
                .With(wall => wall.Posts = (ICollection<Post>) Faker.Lorem.Sentences(5))
                .Build();
        }
    }
}