import { useState, useEffect, useRouteMatch } from 'react';

const MyTeams = props => {
  const [loadedTeams, setLoadedTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
//   let { path, url } = useRouteMatch();

  useEffect(() => {
    fetch(`https://localhost:5001/api/user/${props.id}/teams`)
      .then(reponse => reponse.json())
      .then(data => {
        setIsLoading(false);
        setLoadedTeams(data);
      });
  }, [props]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <h3>My teams</h3>
      {loadedTeams.map(team => console.log(team))}
    </div>
  );
};

export default MyTeams;
