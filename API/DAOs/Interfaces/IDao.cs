namespace API.DAOs.Interfaces
{
    public interface IDao<T>
    {
        T GetById(int id);
        
        void Add(T newOne);
        
        void Remove(T toRemove);
        
    }
}