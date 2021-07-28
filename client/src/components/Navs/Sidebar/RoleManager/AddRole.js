import React from "react";
import Button from "@material-ui/core/Button";
import {Card, CardActions, CardContent, CardHeader, Switch, TextField} from "@material-ui/core";
import { AddCircle, RotateLeftSharp } from "@material-ui/icons";

export default function AddRole({roles, setRoles}) {

    const [newRole, setNewRole] = React.useState();
    const token = window.localStorage.getItem('token');


    const handleSubmit = (event) => {
        event.preventDefault();
        addRole();
    }


    const addRole = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ name: newRole })
        };
        fetch(`https://localhost:5001/api/role/add`, requestOptions)
            .then(response => response.json())
            .then(data => setRoles([...roles, data]))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <TextField
                        id="add-role"
                        variant={'outlined'}
                        onChange={e => setNewRole(e.target.value)}
                        value={newRole}
                        multiline
                        fullWidth
                    />
                </CardContent>
                <CardActions>
                    <Button size="medium"
                        type={'submit'}
                        fullWidth>
                        Add New Role
                    </Button>
                </CardActions>
            </form>
        </div>
    )
}