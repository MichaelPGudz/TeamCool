using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DAOs.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.DAOs
{
    public class FeatureDao: IFeatureDao
    {
        private readonly DataContext _dataContext;

        public FeatureDao(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        public async Task<ActionResult<Feature>> GetById(int id)
        {
            return await _dataContext.Features.FirstOrDefaultAsync(x => x.Id == id);
        }
        
        public Feature? GetByName(string name)
        {
            return _dataContext.Features.FirstOrDefault(x => x.Name == name);
        }

        public async Task<int> Add(Feature newOne)
        {
            await _dataContext.Features.AddAsync(newOne);
            await _dataContext.SaveChangesAsync();
            return newOne.Id;
        }

        public void Remove(Feature toRemove)
        {
            _dataContext.Features.Remove(toRemove);
            _dataContext.SaveChanges();
        }

        public async Task<int> Edit(Feature toEdit)
        {
            _dataContext.Features.Update(toEdit);
            return await _dataContext.SaveChangesAsync();
        }

        public ICollection<Feature> GetAll()
        {
            return _dataContext.Features.ToList();
        }

    }
}