import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";



export default function DeleteRoleBtn({setRoles, roles, roleId}) {

    const handleDelete = () => {
        deleteFromServer(roleId);
        setRoles(roles.filter((role) => {
            return role.id !== roleId
        }));
    }

    const deleteFromServer = (roleId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            
            body: null
        };
        fetch(`https://localhost:5001/api/role/${roleId}`, requestOptions)
            .then(response => response)
    }

    return (
        <div>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                <Delete />
            </IconButton>
        </div>
    )
}