using System;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WallController : BaseApiController
    {
        private readonly IWallDao _wallDao;
      
        private readonly IUserDao _userDao;

        public WallController(IWallDao wallDao, IUserDao userDao)
        {
            _wallDao = wallDao;
         
            _userDao = userDao;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Wall>> GetById(int id)
        {
            return await _wallDao.GetById(id);
        }
        
        [Authorize]
        [HttpPost("{wallId}")]
        public async Task<IActionResult> AddPostToWall(int wallId, Post post)
        {
            
            var wall = await _wallDao.GetById(wallId);
            var author = await _userDao.GetById(post.Author.Id);
            if (wall.Value == null) return NotFound();
            try
            {
                post.PostTime = DateTime.Now;
                post.Author = author.Value;
                wall.Value.Posts.Add(post);
                await _wallDao.Edit(wall.Value);
                return Ok(post);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}