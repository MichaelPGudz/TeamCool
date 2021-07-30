import React from "react";

import {ExitToApp} from "@material-ui/icons";
import {UserContext} from "../Store/Store";
import {useHistory} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


export default function Logout() {

    const [state, dispatch] = React.useContext(UserContext);
    
    let history = useHistory();

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('id');
        window.localStorage.clear();
        dispatch({type: 'LOGOUT'});
        history.push('/login');
    }


    return (
        <div>
            <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToApp/>
                </ListItemIcon>
                <ListItemText primary={"Logout"}/>
            </ListItem>
        </div>
    )
}