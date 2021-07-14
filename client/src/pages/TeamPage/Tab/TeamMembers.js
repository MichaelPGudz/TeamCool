import React from "react";
import {List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Person} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    shape: {
        maxHeight: "75vh",
        overflow: "auto",
        overflowX: "hidden"
    },

}))

export default function TeamMembers({members, setMembers}) {
    const classes = useStyles();


    return (
        <div>
                <List className={classes.shape}>
                    {members.map(({id, user, role}) => (
                        <ListItem button key={id} component={Link} to={`/user/${user.id}`} >
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${user.firstName} ${user.lastName} `} secondary={`${role.name}`}/>
                        </ListItem>
                    ))}
                </List>
        </div>
    )
}