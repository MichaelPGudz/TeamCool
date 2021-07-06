import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    cardHeader : {
        textAlign: "left"
    },
    shape: {
        width: "99%"
    }
}));

export default function Post({post}) {
    const classes = useStyles();
    console.log(post)
    return (
        <div>
            <Card id={post.id} className={classes.shape}>
                <CardHeader
                    avatar={
                        <Avatar >
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

