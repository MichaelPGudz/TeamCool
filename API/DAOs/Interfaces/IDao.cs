using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.DAOs.Interfaces
{
    public interface IDao<T> where T : class
    {
        public abstract Task<ActionResult<T>> GetById(int id);
        
        Task<int> Add(T newOne);
        
        void Remove(T toRemove);

        Task<int> Edit(T toEdit);
        
        public ICollection<T> GetAll();

    }
}