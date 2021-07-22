import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import Wall from "../../components/Wall/Wall";
import FeaturesList from "./FeaturesList";
import AddFeature from "./AddFeature";
import TeamPageTab from "./Tab/TeamPageTab";
import Bar from "./BarComponents/Bar";
import Calendar from './Calendar'

const useStyles = makeStyles(() => ({
    main: {
        display: "flex"
    },
    center: {
        textAlign: "center"
    },
    shape: {
        margin: '3%',
    },
}));

export default function TeamPage() {
    const classes = useStyles();
    const {teamId} = useParams();
    const [features, setFeatures] = React.useState([]);
    const [wallId, setWallId] = React.useState(-1);
    const [loading, setLoading] = React.useState(true);
    const [teamMembers, setTeamMembers] = React.useState([]);
    const [childTeams, setChildTeams] = React.useState([]);
    const [team, setTeam] = React.useState({});
    const token = window.localStorage.getItem('token');
    const [calendar, setCalendar] = React.useState([]);
    // const calendar = features.filter(feature => feature.type === 'calendar');

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        };
        fetch(`https://localhost:5001/api/team/${teamId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setTeam(data);
                setFeatures(data.features.filter(feature => feature.type !== 'calendar'));
                setCalendar(data.features.filter(feature => feature.type === 'calendar'));
                setWallId(data.wall.id);
                setTeamMembers(data.members);
                setChildTeams(data.childTeams);
                setLoading(false);
            })
    }, [teamId, token]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Bar team={team} setTeam={setTeam}/>
                </Grid>
                <Grid item xs={3} className={`${classes.center}`}>
                    {loading ?
                        <CircularProgress/>
                        :
                        <TeamPageTab setMembers={setTeamMembers}
                                     members={teamMembers}
                                     childTeams={childTeams}
                                     setChildTeams={setChildTeams}/>}
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    {loading ?
                        <CircularProgress/>
                        :
                        <Wall id={wallId}/>}
                </Grid>
                <Grid item xs={3}>
                    {loading ?
                        <CircularProgress/>
                        :
                        <Grid
                            container
                            direction="column"
                            spacing={2}
                        >
                            <Grid item>
                                <FeaturesList features={features} updateFeatures={setFeatures} teamId={teamId}/>
                            </Grid>
                            <Grid item className={classes.center}>
                                <AddFeature btnName="Add Feature" type="feature" updateFeatures={setFeatures} features={features} teamId={teamId}/>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
            <Grid item className={`${classes.center} ${classes.shape}`}>
                {calendar.length < 1 && <AddFeature btnName="Add Calendar" type="calendar" updateFeatures={setCalendar} features={calendar} teamId={teamId}/>}
                <Grid item className={classes.shape}>
                         {calendar.length > 0 ? <Calendar calendar={calendar} updateFeatures={setCalendar} teamId={teamId}/> : <h3>No calendars added for this team yet.</h3> }

                </Grid>
            </Grid>
        </div>
    )
}