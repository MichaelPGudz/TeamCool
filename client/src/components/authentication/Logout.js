import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import {UserContext} from "../../components/Store/Store";


export default function Logout() {

    const [state, dispatch] = React.useContext(UserContext);


    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('id');
        dispatch({type: 'LOGOUT'});
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