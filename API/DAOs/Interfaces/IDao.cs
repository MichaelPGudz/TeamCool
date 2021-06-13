using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.DAOs.Interfaces
{
    public interface IDao<T> where T : class
    {
        Task<ActionResult<T>> GetById(int id);
        
        Task<int> Add(T newOne);
        
        void Remove(T toRemove);

        Task<int> Edit(T toEdit);

    }
}