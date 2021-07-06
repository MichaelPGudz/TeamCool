import React from "react";
import {List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Person} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    shape: {
        maxHeight: "75vh",
        overflow: "auto",
    },

}))

export default function TeamMembers({members, setMembers}) {
    const classes = useStyles();


    return (
        <div>
            <Paper className={classes.shape}>
                <List>
                    {members.map(({id, user, role}) => (
                        <ListItem button key={id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${user.firstName} ${user.lastName} `} secondary={`${role.name}`}/>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    )
}