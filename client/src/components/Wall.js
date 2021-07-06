import React from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {CircularProgress, Grid} from "@material-ui/core";
import Post from "./Post";


const useStyles = makeStyles(() => ({
    shape: {
        maxHeight: "75vh",
        overflow: "auto",
        overflowX: "hidden"
    },
}));

const Wall = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [walls, setWalls] = useState([]);
    const [posts, setPosts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        if (props.WallForUser){
            fetch(`https://localhost:5001/api/user/${props.id}/posts`)
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setPosts(data);
            });

        }
        if (!props.WallForUser) {
            fetch(`https://localhost:5001/api/wall/${props.id}`)
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setWalls(data)
                setPosts(data.posts);
            });

        }
    }, [props]);

    if (isLoading) {
        return (
            <div>
                <Paper>
                    <CircularProgress />
                </Paper>
            </div>

        );
    }

    return (
        <div className={classes.shape}>
            <Grid container
                  direction={"column"}
                  spacing={2}

            >
                {posts.map( (post) => (
                    <Grid item>
                    <Post post={post}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Wall;
