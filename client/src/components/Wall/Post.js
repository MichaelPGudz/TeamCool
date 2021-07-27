import React from "react";
import { Card, CardContent, CardHeader, Chip, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Image, Transformation } from "cloudinary-react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    cardHeader: {
        textAlign: "left"
    },
    shape: {
        margin: '1%',
    },
    important: {
        boxShadow:
            "3px 6px 4px -2px darkred,0px 2px 2px 0px rgba(100,0,0,0.9),0px 1px 5px 0px rgba(0,0,0,0.12)"
    },
}));

export default function Post({ post }) {
    const classes = useStyles();

    return (
        <div>

            <Card key={post.id} className={`${classes.shape} ${post.postStatus === 2 ? classes.important : null}`}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {post.author.logo ?
                                <Image publicId={post.author.logo}>
                                    <Transformation width="45" height="45" crop="fill" />
                                </Image> : post.author.firstName[0]}
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
                        color={"primary"} /> : null}
                />
                <CardContent>
                    <Typography variant={"body1"} align={"left"}
                        style={post.postStatus === 2 ? { fontWeight: 500 } : null}>
                        {post.postContent}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

