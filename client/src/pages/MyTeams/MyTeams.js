import { useState, useEffect, useRouteMatch } from 'react';
import { useParams } from 'react-router-dom';

import MyTeamsItem from './MyTeamsItem';

const MyTeams = props => {
  const [loadedTeams, setLoadedTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //   let { path, url } = useRouteMatch();
  // const {id} = useParams();

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
  console.log(loadedTeams[0]);
  return (
    <div>
      <h3>My teams</h3>
      {loadedTeams.map(team => (
        <MyTeamsItem key={team.id} role={team.role} team={team.team} />
      ))}
      {/* <MyTeamsItem key={loadedTeams[0].team.id} teamName={loadedTeams[0].team.name}/> */}
    </div>
  );
};

export default MyTeams;
