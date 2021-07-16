import React from "react";
import {Card, CardContent, CardHeader, Chip, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => ({
    cardHeader: {
        textAlign: "left"
    },
    shape: {
        margin: '1%',
    },

}));

export default function Post({post}) {
    const classes = useStyles();

    return (
        <div>

            <Card key={post.id} className={`${classes.shape}`}
                  elevation={post.postStatus === 2 ? 3 : 1}>
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
                    }).format(post.postTime)}
                    className={classes.cardHeader}
                    action={post.teamId ? <Chip label={post.teamName}
                                                component={Link}
                                                to={`/team/${post.teamId}`}
                                                clickable
                                                color={"primary"}/> : null}
                />
                <CardContent>
                    <Typography variant={"body1"} align={"left"}
                                style={post.postStatus === 2 ? {fontWeight: 500} : null}>
                        {post.postContent}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

