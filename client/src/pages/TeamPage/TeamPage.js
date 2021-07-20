import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, Grid} from "@material-ui/core";
import Wall from "../../components/Wall/Wall";
import FeaturesList from "./FeaturesList";
import AddFeature from "./AddFeature";
import TeamPageTab from "./Tab/TeamPageTab";
import Bar from "./BarComponents/Bar";
import AddMember from "./AddMember";
import AddChildTeam from "./AddChildTeam";

const useStyles = makeStyles(() => ({
    main: {
        display: "flex"
    },
    center: {
        textAlign: "center"
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
    const [addBtnOption, setAddBtnOption] = React.useState(0);

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
                setFeatures(data.features);
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
                    <Grid container
                          direction="column"
                          spacing={2}>
                        <Grid item xs={12}>
                            {loading ?
                                <CircularProgress/>
                                :
                                <TeamPageTab setMembers={setTeamMembers}
                                             members={teamMembers}
                                             childTeams={childTeams}
                                             setChildTeams={setChildTeams}
                                             setAddBtnOption={setAddBtnOption}/>}
                        </Grid>
                        <Grid item className={`${classes.center}`} xs={12}>
                            {addBtnOption === 0 ?
                                <AddMember team={team} setTeamMembers={setTeamMembers}/>
                                :
                                <AddChildTeam/>}
                        </Grid>
                    </Grid>
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
                                <AddFeature updateFeatures={setFeatures} features={features} teamId={teamId}/>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </div>
    )
}