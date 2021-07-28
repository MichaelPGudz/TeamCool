import React, {useEffect} from "react";
import { Dialog, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import { List, ListItem, ListItemSecondaryAction, ListItemText,} from "@material-ui/core";
import DeleteUserBtn from "./DeleteUserBtn.js";
import {Link} from "react-router-dom";

export default function DeleteUserManager({openDialog, setOpenDialog}) {

    const [users, setUsers] = React.useState([]);

    const handleClose = () => {
        setOpenDialog(false);
    };


    useEffect( () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:5001/api/users`, requestOptions)
            .then(response => response.json())
            .then(data => setUsers(data))

    }, [openDialog])


    const handleSearch = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(event.target.value)
        };
        fetch(`https://localhost:5001/api/user/search`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
    }


    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"users-list"}>
                <DialogTitle>Here you can delete users</DialogTitle>
                <DialogContent>
                    <Grid item>
                        <TextField
                            id={'name'}
                            label={'Type name to search'}
                            onChange={handleSearch}
                            fullWidth
                            variant={'outlined'} />
                    </Grid>
                    <List>
                        {users.map(({ id, firstName, lastName, email }) =>
                            <ListItem button key={id} component={Link} to={`/user/${id}`} onClick={handleClose}>
                                <ListItemText primary={firstName + " " + lastName} secondary={email} />
                                <ListItemSecondaryAction>
                                    <DeleteUserBtn setUsers={setUsers} users={users} userId={id} />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    )
}