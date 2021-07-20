import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";



export default function DeleteRoleBtn({setUsers, users, userId}) {

    const handleDelete = () => {
        deleteFromServer(userId);
        setUsers(users.filter((user) => {
            return user.id !== userId
        }));
    }

    const deleteFromServer = (userId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            
            body: null
        };
        fetch(`https://localhost:5001/api/user/${userId}`, requestOptions)
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