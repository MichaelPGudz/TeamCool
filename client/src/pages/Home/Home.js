import React from 'react';
import Wall from '../../components/Wall';
import {Grid} from "@material-ui/core";

// const useStyles = makeStyles(theme => ({}));

const Home = () => {
    // const classes = useStyles();

    return (
        <div>
            <Grid container
            >
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <Wall id="1" WallForUser/>
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
