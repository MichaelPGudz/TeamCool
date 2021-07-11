import React from "react";
import {Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles(() => ({
    cardHeader : {
        textAlign: "left"
    },
    shape: {
        width: "99%"
    },
}));

export default function AddPost({wallId, posts, setPosts}) {
    const classes = useStyles();
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('id');
    const firstName = window.localStorage.getItem('firstName');
    const lastName = window.localStorage.getItem('lastName');
    const [postContent, setPostContent] = React.useState('');
    const user = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addPost();
        setPostContent('');
    }

    const addPost = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({postContent: postContent, author: user})
        };
        fetch(`https://localhost:5001/api/wall/${wallId}`, requestOptions)
            .then(response => response.json())
            .then(data => setPosts([data, ...posts]))
    }

    return (
        <div>
            <Card className={classes.shape}>
                <CardHeader
                    avatar={
                        <Avatar >
                            {firstName[0]}
                        </Avatar>
                    }
                    title={`${firstName} ${lastName}`}
                    subheader={new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    }).format(Date.now())}
                    className={classes.cardHeader}
                />
                <form onSubmit={handleSubmit}>
                <CardContent>
                        <TextField
                            id="add-post"
                            variant={'outlined'}
                            onChange={ e => setPostContent(e.target.value)}
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

