import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Wall from '../../components/Wall/Wall';
import FeaturesList from './FeaturesList';
import AddFeature from './AddFeature';
import TeamPageTab from './Tab/TeamPageTab';
import Bar from './BarComponents/Bar';
import Calendar from './Calendar';
import AddCalendar from './AddCalendar';
import { UserContext } from '../../components/Store/Store';
import DeleteCalendar from './DeleteCalendar';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
  },
  center: {
    textAlign: 'center',
  },
  shape: {
    margin: '3%',
  },
}));

export default function TeamPage() {
  const classes = useStyles();
  const { teamId } = useParams();
  const [features, setFeatures] = React.useState([]);
  const [wallId, setWallId] = React.useState(-1);
  const [loading, setLoading] = React.useState(true);
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [childTeams, setChildTeams] = React.useState([]);
  const [team, setTeam] = React.useState({});
  const token = window.localStorage.getItem('token');
  const [calendar, setCalendar] = React.useState([]);
  const [currentTeamMember, setCurrentTeamMember] = React.useState();
  const calendarType = 'calendar';
  const [state, dispatch] = React.useContext(UserContext);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    fetch(`https://localhost:5001/api/team/${teamId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setTeam(data);
        setFeatures(
          data.features.filter(feature => feature.type !== calendarType)
        );
        setCalendar(
          data.features.filter(feature => feature.type === calendarType)
        );
        setWallId(data.wall.id);
        setTeamMembers(data.members);
        setChildTeams(data.childTeams);
        setLoading(false);
        setCurrentTeamMember(data.members.find(x => x.user.id === state.user.id))
      });
  }, [teamId, token]);


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Bar team={team} setTeam={setTeam} currentUser = {currentTeamMember} />
        </Grid>
        <Grid item xs={3} className={`${classes.center}`}>
          {loading ? (
            <CircularProgress />
          ) : (
            <TeamPageTab
              setMembers={setTeamMembers}
              members={teamMembers}
              childTeams={childTeams}
              setChildTeams={setChildTeams}
              team={team}
            />
          )}
        </Grid>
        <Grid item xs={6} className={classes.center}>
          {loading ? <CircularProgress /> : <Wall id={wallId} />}
        </Grid>
        <Grid item xs={3}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FeaturesList
                  features={features}
                  updateFeatures={setFeatures}
                  teamId={teamId}
                />
              </Grid>
              <Grid item className={classes.center}>
                <AddFeature
                  updateFeatures={setFeatures}
                  features={features}
                  teamId={teamId}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item className={`${classes.center} ${classes.shape}`}>
        {calendar.length < 1 && (
          <AddCalendar
            calendar={calendar}
            updateCalendar={setCalendar}
            teamId={teamId}
          />
        )}
        <Grid item className={classes.shape}>
          {calendar.length > 0 ? (
            <Calendar
              calendar={calendar}
              updateCalendar={setCalendar}
              teamId={teamId}
            />
          ) : (
            <h3>No calendars added for this team yet.</h3>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
