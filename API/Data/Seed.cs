using System.Collections;
using System.Collections.Generic;
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
                .With(team => team.Name = Faker.Lorem.Sentence())
                .Build();
        }
        
        public static ICollection<Skill> GenerateSkills()
        {
            return Builder<Skill>.CreateListOfSize(skillsAmount).All()
                .With(skill => skill.FirstName = Faker.Lorem.GetFirstWord())
                .Build();
        }
        
        public static ICollection<Feature> GenerateFeature()
        {
            return Builder<Feature>.CreateListOfSize(featureAmount).All()
                .With(feature => feature.Name = Faker.Lorem.GetFirstWord())
                .With(feature => feature.URL = Faker.Internet.Url())
                .Build();
        }
    }
}