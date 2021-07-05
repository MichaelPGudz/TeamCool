import React from "react";
import {Button, ListItem, ListItemAvatar, ListItemText, Menu} from "@material-ui/core";
import {GroupWork, SupervisorAccount} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";


export default function ChildTeamsMenu({childTeams}) {
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
                aria-controls="child-team-menu"
                aria-haspopup="true"
                size={"large"}
                startIcon={<SupervisorAccount/>}
                onClick={handleClick}>
                Child Teams
            </Button>
            <Menu
                id="child-team-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                {childTeams.map( ({id, name}) => (
                    <ListItem key={id} button component={Link} to={`/team/${id}`} >
                        <ListItemAvatar>
                            <Avatar>
                                <GroupWork/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`${name}`}/>
                    </ListItem>
                ))}
            </Menu>
        </div>
    )
}