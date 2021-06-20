using System;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WallController : BaseApiController
    {
        private readonly IWallDao _wallDao;

        public WallController(IWallDao wallDao, IPostDao postDao)
        {
            _wallDao = wallDao;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Wall>> GetById(int id)
        {
            return await _wallDao.GetById(id);
        }

        // [HttpDelete("{id}/Delete")]
        // public async Task<IActionResult> DeleteWall(int id)
        // {
        //     try
        //     {
        //         var team = await _wallDao.GetById(id);
        //         if (team == null)
        //         {
        //             return NotFound();
        //         }
        //
        //         _wallDao.Remove(team.Value);
        //         return Ok();
        //     }
        //     catch (Exception)
        //     {
        //         return BadRequest();
        //     }
        // }

        [HttpPost("{wallId}")]
        public async Task<IActionResult> AddPostToWall(int wallId, Post post)
        {
            var wall = await _wallDao.GetById(wallId);
            if (wall.Value == null) return BadRequest();
            try
            {
                post.PostTime = DateTime.UtcNow;
                wall.Value.Posts.Add(post);
                await _wallDao.Edit(wall.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}