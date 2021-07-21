import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import { UserContext } from "../../../Store/Store";
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from "@material-ui/core";
import DeleteUserBtn from "./DeleteUserBtn.js";


export default function DeleteUserManager() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [state, dispatch] = React.useContext(UserContext);

    const handleOpen = () => {
        getUsers();
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };


    const getUsers = (() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:5001/api/users`, requestOptions)
            .then(response => response.json())
            .then(data => setUsers(data))

    })


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
            <Button
                variant="contained"
                size={'large'}
                endIcon={<AddCircle />}
                onClick={handleOpen}
            >
                Delete Users
            </Button>
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
                            <ListItem key={id}>
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