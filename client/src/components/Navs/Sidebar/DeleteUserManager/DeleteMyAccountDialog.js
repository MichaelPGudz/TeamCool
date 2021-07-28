import React from "react";
import { Link, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { UserContext } from "../../../Store/Store";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";



export default function DeleteMyAccountDialog({ openDialog, setOpenDialog }) {

    const [state, dispatch] = React.useContext(UserContext);
    const [successfulDelete, setSuccessfulDelete] = React.useState(false);
    const userId = state.user.id;
    const history = useHistory();

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleAlertClose = () => {
        setSuccessfulDelete(false);
    }

    const handleAlertOpen = () => {
        setSuccessfulDelete(true)
        setTimeout(function () { dispatch({ type: 'DELETE_USER' }) }, 5000);
    }

    const handleDelete = () => {
        deleteFromServer(userId);
        handleAlertOpen();
        handleClose();
        window.localStorage.clear();
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
            .then(handleAlertOpen)
            .catch((error => console.log(error)))
    }

    return (
        <div>
            <Dialog open={successfulDelete} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="info">
                    <AlertTitle>
                        Your account has been successfully deleted!
                        <strong> Now you can close browser window</strong>
                    </AlertTitle>
                    Thank you for using TeamCool!
                    <strong> In 5 seconds</strong>, there will be redirect to login page
                </Alert>
            </Dialog>
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