using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using API.Entities;
using API.Utils;
using FizzWare.NBuilder;

namespace API.Data
{
    public class Seed
    {
        private const int userAmount = 100;
        private const int teamAmount = 20;
        private const int parentTeamAmount = 5;
        private const int skillsAmount = 20;
        private const int featureAmount = 10;
        private const int roleAmount = 5;
        private const int wallAmount = 20;
        private const int postInWallAmount = 5;

        public static ICollection<User> GenerateUsers()
        {
            return Builder<User>.CreateListOfSize(userAmount).All()
                .With(user => user.FirstName = Faker.Name.First())
                .With(user => user.LastName = Faker.Name.Last())
                .With(user => user.Email = Faker.Internet.Email())
                .With(user => user.Password = Faker.Identification.SocialSecurityNumber())
                .Build();
        }

        public static ICollection<Object> GenerateTeams()
        {
            var teamList = new List<Object>();
            for (int i = 0; i < teamAmount; i++)
            {
                teamList.Add(new {
                    Id = i + 1,
                    Name = Faker.Internet.DomainName(),
                    WallId = i + 1,
                    ParentTeamId = i + 1 < parentTeamAmount + 1 ? (int?) null : Faker.RandomNumber.Next(1, parentTeamAmount)  
                });
            }

            return teamList;
        }

        public static ICollection<Skill> GenerateSkills()
        {
            return Builder<Skill>.CreateListOfSize(skillsAmount).All()
                .With(skill => skill.FirstName = Faker.Internet.DomainName())
                .Build();
        }

        public static ICollection<Object> GenerateFeatures()
        {
            var list = new List<Object>();
            for (int i = 0; i < featureAmount; i++)
            {
                list.Add(new
                {
                    Id = i + 1,
                    Name = Faker.Internet.DomainName(),
                    URL = Faker.Internet.Url(),
                    TeamId = Faker.RandomNumber.Next(1, teamAmount)
                });
            }
            return list;
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
                .Build();
        }


        public static ICollection<Object> GeneratePosts()
        {
            var list = new List<Object>();
            var counter = 0;
            for (int i = 0; i < wallAmount; i++)
            {
                for (int j = 0; j < postInWallAmount; j++)
                {
                    list.Add(new
                    {
                        Id = ++counter,
                        WallId = i + 1,
                        PostContent = Faker.Lorem.Sentence(5),
                        PostTime = DateTime.UtcNow,
                        PostStatus = Status.Basic,
                        AuthorId = Faker.RandomNumber.Next(1, userAmount).ToString()
                    });
                }
            }

            return list;
        }

        public static ICollection<Object> GenerateTeamMembers()
        {
            var list = new List<Object>();
            for (int i = 0; i < userAmount; i++)
            {
                list.Add(new
                {
                    Id = i + 1,
                    TeamId = Faker.RandomNumber.Next(1, 20),
                    UserId = i + 1.ToString(),
                    RoleId = Faker.RandomNumber.Next(1, 5)
                });
            }

            return list;
        }
    }
}