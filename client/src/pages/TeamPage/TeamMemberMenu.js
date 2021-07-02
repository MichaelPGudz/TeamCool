import React from "react";
import {Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Menu, Paper} from "@material-ui/core";
import {AccountTree, PermIdentity, Settings, SupervisorAccount} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";


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
                startIcon={<SupervisorAccount/>}
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
                    <ListItem key={id} button>
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