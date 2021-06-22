import { useState, useEffect } from 'react';

const FetchExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedRoles, setLoadedRoles] = useState([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/roles')
      .then(reponse => reponse.json())
      .then(data => {
        setIsLoading(false);
        setLoadedRoles(data);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <h1>Roles</h1>
      {loadedRoles.map(role => (
        <h2>
          id: {role.id} <br/> role: {role.name}
        </h2>
      ))}
      {console.log(loadedRoles)}
    </div>
  );
};

export default FetchExample;
