import React from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";


export default function DeleteTeam({team}) {


    const handleClick = () => {
        deleteTeam();
        window.location.replace('http://localhost:3000');
    }

    const deleteTeam = () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: null
        };
        fetch(`https://localhost:5001/api/team/${team.id}`, requestOptions)
            .then(response => response.json())
    }

    return (
        <div>
            <ListItem button
                      onClick={handleClick}>
                <ListItemAvatar>
                    <Avatar>
                        <Delete/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Delete team"}/>
            </ListItem>
        </div>
    )
}