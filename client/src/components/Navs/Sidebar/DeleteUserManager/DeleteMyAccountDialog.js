import React from "react";
import { Link, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { UserContext } from "../../../Store/Store";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Dialog, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";



export default function DeleteMyAccountDialog({ openDialog, setOpenDialog }) {

    const [state, dispatch] = React.useContext(UserContext);
    const userId = state.user.id;
    const history = useHistory();

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        deleteFromServer(userId);
        handleClose();
        window.localStorage.clear();
        history.push('/');
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
            .then(dispatch({type: 'DELETE_USER'}))
    }

    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"delete-current-user-account"}>
                <DialogTitle>Are you sure you want to delete your account with all the content?</DialogTitle>
                <DialogContent>
                    <List>
                        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                            <ListItemText primary={"Yes, delete!"} />
                            <Delete />
                        </IconButton>
                        <IconButton edge="end" aria-label="ndelete" onClick={handleClose}>
                            <ListItemText primary={"No!"} />
                            <Delete />
                        </IconButton>
                    </List>
                </DialogContent>
            </Dialog>

        </div>
    )
}