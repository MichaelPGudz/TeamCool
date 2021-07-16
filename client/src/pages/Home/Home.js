import React from 'react';
import Wall from '../../components/Wall/Wall';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import {UserContext} from "../../components/Store/Store";
import {CircularProgress} from "@material-ui/core";
import PostFilter from "./PostFilter/PostFilter";



const Home = () => {
    const [state, dispatch] = React.useContext(UserContext);
    const [posts, setPosts] = React.useState([]);


    const guestGreeting = (
        <Typography variant="h3">
            Welcome dear guest! Please login to see your team! :D
        </Typography>
    )

    if (state.logged && !state.active) {
        return (
            <div>
                <Typography variant="h3">
                    Your user is loading...
                    <CircularProgress/>
                </Typography>
            </div>
        )
    }

    if (state.active) {
        return (
            <div>
                <Typography variant="h3">
                    Welcome {state.user.firstName} {state.user.lastName}!
                </Typography>
                <Grid container
                      spacing={2}
                >
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={6}>
                        <Wall WallForUser newPosts={posts}/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostFilter posts={posts} setPosts={setPosts}/>
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
