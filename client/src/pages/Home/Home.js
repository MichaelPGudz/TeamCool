import React from 'react';
import Wall from '../../components/Wall/Wall';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import {UserContext} from "../../components/Store/Store";


const Home = () => {
    const [state, dispatch] = React.useContext(UserContext)
    console.log(state)


    const guestGreeting = (
        <Typography variant="h3">
            Welcome dear guest! Please login to see your team! :D
        </Typography>
    )

    if (state.active) {
        return (

            <div>
                <Typography variant="h3">
                    Welcome {state.user.firstName} {state.user.lastName}!
                </Typography>
                <Grid container
                >
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={6}>
                        <Wall id={state.user.id} WallForUser/>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <div>
            {guestGreeting}
        </div>
    )

};

export default Home;
