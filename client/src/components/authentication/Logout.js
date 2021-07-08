import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";



export default function Logout() {


    const handleLogout = () => {
        window.localStorage.setItem('token', null);
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