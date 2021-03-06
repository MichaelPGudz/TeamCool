import React from "react";
import { Card, CardActions, CardContent, CardHeader, Switch, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Image, Transformation } from "cloudinary-react";
import Button from "@material-ui/core/Button";
import { UserContext } from "../Store/Store";


const useStyles = makeStyles(() => ({
    cardHeader: {
        textAlign: "left"
    },
    shape: {
        margin: "1%"
    },
    important: {
        boxShadow:
            "3px 6px 4px -2px darkred,0px 2px 2px 0px rgba(100,0,0,0.9),0px 1px 5px 0px rgba(0,0,0,0.12)"
    },
}));

export default function AddPost({ wallId, posts, setPosts }) {
    const classes = useStyles();
    const token = window.localStorage.getItem('token');
    const [state, dispatch] = React.useContext(UserContext);
    const [postContent, setPostContent] = React.useState('');
    const [postStatus, setPostStatus] = React.useState(false);

    if (state.active) {
    }
    const user = {
        id: state.user.id,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addPost();
        setPostContent('');
        setPostStatus(false);
    }

    const addPost = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ postContent: postContent, author: user, postStatus: postStatus ? 2 : 0 })
        };
        fetch(`https://localhost:5001/api/wall/${wallId}`, requestOptions)
            .then(response => response.json())
            .then(data => addPostInClient(data))
            .catch((error) => {
                console.log(error)
            })
    }
    const addPostInClient = (post) => {
        post.postTime = Date.parse(post.postTime);
        setPosts([post, ...posts])

    }

    const handlePostStatusSwitch = () => {
        setPostStatus(!postStatus);
    }

    return (
        <div>
            <Card className={`${classes.shape} ${postStatus ? classes.important : null}`}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {state.user.logo ?
                                <Image publicId={state.user.logo}>
                                    <Transformation width="45" height="45" crop="fill" />
                                </Image> : state.user.firstName[0]}
                        </Avatar>
                    }
                    title={`${state.user.firstName} ${state.user.lastName}`}
                    subheader={new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    }).format(Date.now())}
                    className={classes.cardHeader}
                    action={
                        <Switch
                            onChange={handlePostStatusSwitch}
                            name="postStatus"
                            checked={postStatus}
                        />}
                />
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <TextField
                            id="add-post"
                            variant={'outlined'}
                            onChange={e => setPostContent(e.target.value)}
                            value={postContent}
                            multiline
                            fullWidth
                        />
                    </CardContent>
                    <CardActions>
                        <Button size="medium"
                            type={'submit'}
                            fullWidth>
                            Post
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </div>
    )
}

