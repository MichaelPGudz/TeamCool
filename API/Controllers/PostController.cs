using System;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostController: BaseApiController
    {
        private readonly IPostDao _postDao;

        public PostController(IPostDao postDao)
        {
            _postDao = postDao;
        }

        [HttpPatch("{postId}/Edit")]
        public async Task<IActionResult> EditPost(int postId, Post editedPost)
        {
            try
            {
                var post = await _postDao.GetById(postId);
                if (postId != editedPost.Id || !ModelState.IsValid || editedPost.WallId != post.Value.WallId)
                {
                    BadRequest();
                }

                post.Value.PostContent = editedPost.PostContent;
                await _postDao.Edit(post.Value);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}/Delete")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _postDao.GetById(id);
            if (post.Value == null)
            {
                return NotFound();
            }
            _postDao.Remove(post.Value);

            return Ok();
        }
    }
}