using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.DAOs
{
    public class PostDao: IPostDao
    {
        private readonly DataContext _dataContext;

        public PostDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<ActionResult<Post>> GetById(int id)
        {
            return await _dataContext.Posts.FindAsync(id);
        }

        public async Task<int> Add(Post newOne)
        {
             await _dataContext.Posts.AddAsync(newOne);
             return await _dataContext.SaveChangesAsync();
        }

        public void Remove(Post toRemove)
        {
            _dataContext.Posts.Remove(toRemove);
        }

        public async Task<int> Edit(Post toEdit)
        {
            _dataContext.Posts.Update(toEdit);
            return await _dataContext.SaveChangesAsync();
        }

        public ICollection<Post> GetAll()
        {
            return _dataContext.Posts.ToList();
        }
    }
}