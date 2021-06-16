using API.Entities;

namespace API.DAOs.Interfaces
{
    public interface IFeatureDao: IDao<Feature>
    {
        public Feature? GetByName(string name);
    }
}