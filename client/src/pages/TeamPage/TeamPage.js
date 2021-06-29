import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, Grid, Paper} from "@material-ui/core";
import Wall from "../../components/Wall";
import FeaturesList from "./FeaturesList";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
            }, [])
    });

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>TEAM MENU BAR</Paper>
                </Grid>
                <Grid item xs={8}>
                    {loading ?
                        <CircularProgress/>
                        :
                        <Wall id={wallId}/>}
                </Grid>
                <Grid item xs={4}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid item>
                        <FeaturesList features={features}/>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper}>ADD FEATURE</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}