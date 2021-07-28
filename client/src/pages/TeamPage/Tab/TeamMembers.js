import React from "react";
import { List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AddMember from "./AddMember";
import { Image, Transformation } from "cloudinary-react";

const useStyles = makeStyles(() => ({
    shape: {
        maxHeight: "80vh",
        overflow: "auto",
        overflowX: "hidden"
    },

}))

export default function TeamMembers({ members, setMembers, team }) {
    const classes = useStyles();


    return (
        <div>
            <List className={classes.shape}>
                <AddMember team={team} setTeamMembers={setMembers} />
                {members.map(({ id, user, role }) => (
                    <ListItem button key={id} component={Link} to={`/user/${user.id}`} >
                        <ListItemAvatar>
                            {user.logo ?
                                <Image publicId={user.logo}>
                                    <Transformation width="45" height="45" crop="fill" />
                                </Image> :
                                <Avatar>
                                    <Person />
                                </Avatar>}
                        </ListItemAvatar>
                        <ListItemText primary={`${user.firstName} ${user.lastName} `} secondary={`${role.name}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}