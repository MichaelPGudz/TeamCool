using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.DAOs
{
    public class PostDao : IPostDao
    {
        private readonly DataContext _dataContext;

        public PostDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<int> Add(Post newOne)
        {
            await _dataContext.Posts.AddAsync(newOne);
            return await _dataContext.SaveChangesAsync();
        }

        public Task<int> Edit(Post toEdit)
        {
            _dataContext.Posts.Update(toEdit);
            return _dataContext.SaveChangesAsync();
        }

        public ICollection<Post> GetAll()
        {
            return _dataContext.Posts.Include(t => t.Author).ToList();
        }

        public async Task<ActionResult<Post>> GetById(int id)
        {
            return await _dataContext.Posts.Include(t => t.Author).FirstOrDefaultAsync(i => i.Id == id);
        }

        public void Remove(Post toRemove)
        {
            _dataContext.Posts.Remove(toRemove);
            _dataContext.SaveChanges();
        }
    }
}
