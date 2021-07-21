import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import {UserContext} from "../Store/Store";
import {useHistory} from "react-router-dom";


export default function Logout() {

    const [state, dispatch] = React.useContext(UserContext);
    
    let history = useHistory();

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('id');
        window.localStorage.clear();
        dispatch({type: 'LOGOUT'});
        history.push('/');
        window.location.reload();
    }


    return (
        <div>
            <Button
                variant="contained"
                size={'large'}
                endIcon={<AddCircle />}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    )
}