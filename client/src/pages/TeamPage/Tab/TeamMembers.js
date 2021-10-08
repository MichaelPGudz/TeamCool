import React from "react";
import {Grid, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {Person} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import AddMember from "../ManageMember/AddMember";
import {Image, Transformation} from "cloudinary-react";
import DeleteMember from "../ManageMember/DeleteMember";
import {UserContext} from "../../../components/Store/Store";


const useStyles = makeStyles(() => ({
    shape: {
        maxHeight: "80vh",
        overflow: "auto",
        overflowX: "hidden"
    },

}))

export default function TeamMembers({members, setMembers, team, currentUser}) {
    const classes = useStyles();
    const [state, dispatch] = React.useContext(UserContext);
    var adminRole = "Admin";
    var teamOwnerRole = "Team Owner";


    return (
        <div>
            <List className={classes.shape}>
                <AddMember team={team} setTeamMembers={setMembers}/>
                {members.map(({id, user, role}) => (
                    <Grid container key={id}
                          direction="row">
                        <Grid item xs={6}>
                            <ListItem button component={Link} to={`/user/${user.id}`}>
                                <ListItemAvatar>
                                    {user.logo ?
                                        <Avatar>
                                            <Image publicId={user.logo}>
                                                <Transformation width="45" height="45" crop="fill"/>
                                            </Image>
                                        </Avatar>
                                        :
                                        <Avatar>
                                            <Person/>
                                        </Avatar>}
                                </ListItemAvatar>
                                <ListItemText primary={`${user.firstName} ${user.lastName} `}
                                              secondary={`${role.name}`}/>
                            </ListItem>
                        </Grid>
                        {(currentUser != null && currentUser.role.name == teamOwnerRole) || state.globalRole == adminRole ?
                            <Grid item xs={6}>
                                <DeleteMember edge="end" aria-label="delete" teamId={team.id} memberId={id}
                                              userMember={user} setMembers={setMembers} members={members}/>
                            </Grid> :
                            null}
                    </Grid>
                ))}
            </List>
        </div>
    )
}