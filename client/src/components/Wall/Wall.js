import React, {useContext} from 'react'
import {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {CircularProgress, Grid} from "@material-ui/core";
import Post from "./Post";
import AddPost from "./AddPost";
import {UserContext} from "../Store/Store";


const useStyles = makeStyles(() => ({
    shape: {
        maxHeight: "75vh",
        height: '100%',
        overflow: "auto",
        overflowX: "hidden"
    },
}));

const Wall = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [state, dispatch] = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
        if (props.WallForUser) {
            setIsLoading(false);
        }
        if (!props.WallForUser) {
            fetch(`https://localhost:5001/api/wall/${props.id}`)
                .then(response => response.json())
                .then(data => {
                    setIsLoading(false);
                    formatDate(data.posts)
                });
        }
    }, [props]);

    const formatDate = (newPosts) => {
        newPosts.forEach( (post) => {
            post.postTime = Date.parse(post.postTime)
        })
        setPosts(newPosts);
    }

    if (isLoading) {
        return (
            <div>
                <Paper>
                    <CircularProgress/>
                </Paper>
            </div>

        );
    }

    return (
        <div className={classes.shape}>
            <Grid container
                  direction={"column"}
                  spacing={1}
            >
                {!props.WallForUser ? <Grid item>
                        <AddPost wallId={props.id} posts={posts} setPosts={setPosts}/>
                    </Grid> :
                    null}
                {props.WallForUser ?
                    state.posts.map((post) => (
                        <Grid item key={post.id}>
                            <Post post={post}/>
                        </Grid>
                    ))
                    :
                    posts.map((post) => (
                        <Grid item key={post.id}>
                            <Post post={post}/>
                        </Grid>))}
            </Grid>
        </div>
    );
}

export default Wall;
