import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    cardHeader: {
        textAlign: "left"
    },
    shape: {
        width: "99%",
    },
    important: {
        boxShadow:
            "0px 3px 1px -2px red,0px 2px 2px 0px rgba(100,0,0,0.9),0px 1px 5px 0px rgba(0,0,0,0.12)"
    },
}));

export default function Post({post}) {
    const classes = useStyles();

    return (
        <div>
            <Card key={post.id} className={`${classes.shape} ${post.postStatus === 2 ? classes.important : ''}`}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {post.author.firstName[0]}
                        </Avatar>
                    }
                    title={`${post.author.firstName} ${post.author.lastName}`}
                    subheader={new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    }).format(Date.parse(post.postTime))}
                    className={classes.cardHeader}
                />
                <CardContent>
                    <Typography variant={"body1"} align={"left"}>
                        {post.postContent}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

