import React from "react";
import {List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Person} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => ({
    shape: {
        maxHeight: "75vh",
        overflow: "auto",
        overflowX: "hidden"
    },

}))

export default function ChildTeams({childTeams, setChildTeams}) {
    const classes = useStyles();

    return (
        <div>
                <List className={classes.shape}>
                    {childTeams.map(({id, name}) => (
                        <ListItem button key={id} component={Link} to={`/team/${id}`}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
        </div>
    )
}