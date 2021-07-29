import React from "react";
import { Button, Menu, MenuList } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import EditUserLogo from './EditUserLogo';


export default function UserSettingsMenu({setLoadedUser}) {
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
                aria-controls="settings-menu"
                aria-haspopup="true"
                size={"large"}
                startIcon={<Settings />}
                onClick={handleClick}
            >
                Settings
            </Button>
            <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MenuList>
                    <EditUserLogo setLoadedUser={setLoadedUser} />
                </MenuList>

            </Menu>
        </div>
    )
}