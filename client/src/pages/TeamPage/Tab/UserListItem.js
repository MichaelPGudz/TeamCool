import React from "react";
import {
    Avatar,
    ListItem,
    ListItemIcon, ListItemText, Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default function UserListItem({ user, team, setTeamMembers }) {

    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState({ severity: "success", message: "" });

    const handleAddMember = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        };
        fetch(`https://localhost:5001/api/team/${team.id}/AddTeamMember/${user.id}/${1}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(response)
            })
            .then(data => {
                setTeamMembers([...team.members, data]);
                setAlert({
                    severity: "success",
                    message: `${data.user.firstName} ${data.user.lastName} added to ${team.name}!`
                });
                setOpen(true);
            })
            .catch(error =>
                error.json()
                    .then(result => {
                        setAlert({ severity: "error", message: `Error! ${result}` });
                        setOpen(true);
                    })
            )
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <ListItem button
                onClick={handleAddMember}>
                <ListItemIcon>
                    <Avatar />
                </ListItemIcon>
                <ListItemText>
                    {`${user.firstName} ${user.lastName}`}
                </ListItemText>
            </ListItem>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert onClose={handleClose} severity={alert.severity} variant={"filled"}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    )

}