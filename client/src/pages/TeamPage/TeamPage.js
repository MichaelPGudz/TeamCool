import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, Grid, Paper} from "@material-ui/core";
import Wall from "../../components/Wall";
import FeaturesList from "./FeaturesList";
import AddFeature from "./AddFeature";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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

    useEffect(() => {
        fetch(`https://localhost:5001/api/team/${teamId}`)
            .then(response => response.json())
            .then(data => {
                setFeatures(data.features);
                setWallId(data.wall.id);
                setLoading(false);
            })
    }, [teamId]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>TEAM MENU BAR</Paper>
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