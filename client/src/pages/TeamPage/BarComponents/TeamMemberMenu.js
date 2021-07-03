import React from "react";
import {Button, ListItem, ListItemAvatar, ListItemText, Menu} from "@material-ui/core";
import {PermIdentity, Person} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";


export default function TeamMemberMenu({teamMembers}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Button
                aria-controls="team-members-menu"
                aria-haspopup="true"
                size={"large"}
                startIcon={<Person/>}
                onClick={handleClick}>
                Team Members
            </Button>
            <Menu
                id="team-members-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {teamMembers.map( ({id, user, role}) => (
                    <ListItem key={id} button component={Link} to={`/user/${user.id}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <PermIdentity />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${user.firstName} ${user.lastName} `} secondary={`${role.name}`}/>
                    </ListItem>
                ))}
            </Menu>
        </div>
    )
}