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
        private readonly IPostDao _postDao;

        public WallController(IWallDao wallDao, IPostDao postDao)
        {
            _wallDao = wallDao;
            _postDao = postDao;
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

        [HttpPost("{wallId}/AddPost")]
        public async Task<IActionResult> AddPostToWall(int wallId, Post post)
        {
            var wall = await _wallDao.GetById(wallId);
            if (wall.Value == null || post.WallId != wallId) return BadRequest();
            try
            {
                post.PostTime = DateTime.UtcNow;
                await _postDao.Add(post);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}