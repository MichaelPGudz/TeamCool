import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, Grid} from "@material-ui/core";
import Wall from "../../components/Wall";
import FeaturesList from "./FeaturesList";
import AddFeature from "./AddFeature";
import Bar from "./Bar";

const useStyles = makeStyles(() => ({
    main: {
        display: "flex"
    },
    center: {
        textAlign: "center"
    }
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

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')},

        };
        
        fetch(`https://localhost:5001/api/team/${teamId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setTeam(data);
                setFeatures(data.features);
                setWallId(data.wall.id);
                setTeamMembers(data.members);
                setChildTeams(data.childTeams);
                setLoading(false);
            })
    }, [teamId]);

    return (
        <div>
            <h1> {team.name}</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Bar teamMembers={teamMembers} childTeams={childTeams} team={team} setTeam={setTeam}/>
                </Grid>
                <Grid item xs={8} className={classes.center}>
                    {loading ?
                        <CircularProgress/>
                        :
                        <Wall id={wallId}/>}
                </Grid>
                <Grid item xs={4}>
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
                                <AddFeature updateFeatures={setFeatures} features={features} teamId={teamId}/>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </div>
    )
}