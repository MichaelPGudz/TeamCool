import React from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
    shape: {
        borderRadius: 30,
        minHeight: 400,
        maxHeight: 500,
        minWidth: 700,
        maxWidth: 800,
        overflow: "auto"
    },
    text: {
        padding: theme.spacing(2, 2, 0),
        color: "dodgerblue",
        textAlign: "center",
    },
    paper: {
        paddingBottom: 100,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    addIcon: {
        fontSize: 48,
        color: "dodgerblue"
    }
}));

const Wall = (props) => {


    const [isLoading, setIsLoading] = useState(true);
    const [loadedWalls, setLoadedWalls] = useState([]);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetch(`https://localhost:5001/api/wall/${props.id}`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedWalls(data)
                setLoadedPosts(data.posts);
            });
    }, [props]);

    if (isLoading) {
        return (
            <div>
                <Paper elevation={5} className={classes.paper + " " + classes.shape}>
                    <Typography className={classes.text} variant="h4" gutterBottom>
                        Chat Loading...
                    </Typography>
                </Paper>
            </div>

        );
    }

    return (
        <div>
            {console.log(loadedPosts)}
            <CssBaseline />
            <Paper elevation={5} className={classes.paper + " " + classes.shape} >
                <Typography className={classes.text} variant="h4" gutterBottom>
                    Wall
                </Typography>
                <List className={classes.list}>
                    {loadedPosts.map(({ id, postContent, author }) => (
                        <React.Fragment key={id}>
                            <ListItem button>
                                <ListItemText primary={id + " " + author.firstName} secondary={postContent} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <IconButton>
                <Typography className={classes.text} variant="h5" gutterBottom>Add Post</Typography>
                <AddIcon className={classes.addIcon}>Add</AddIcon>
            </IconButton>
        </div>
    );
}

export default Wall;
