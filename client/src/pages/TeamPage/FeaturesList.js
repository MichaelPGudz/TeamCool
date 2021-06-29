import React from "react";
import {List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {GitHub} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( () => ({
    shape: {
        maxHeight: 450
    }
}))

export default function FeaturesList({features}) {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.shape}>
                <List>
                    {features.map(({id, name, url}) => (
                        <ListItem button key={id} component="a" href={url} target="_blank" rel="noopener noreferrer">
                            <ListItemAvatar>
                                <Avatar>
                                    <GitHub/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name} secondary="Test"/>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}