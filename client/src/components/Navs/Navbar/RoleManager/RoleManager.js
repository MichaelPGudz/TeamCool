import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import { UserContext } from "../../../Store/Store";
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper } from "@material-ui/core";
import AddRole from "./AddRole.js";
import DeleteRoleBtn from "./DeleteRoleBtn.js";
import Alert from '@material-ui/lab/Alert';


export default function RoleManager() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [roles, setRoles] = React.useState([]);
    const [state, dispatch] = React.useContext(UserContext);

    const handleOpen = () => {
        getRoles();
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };


    const getRoles = (() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:5001/api/roles`, requestOptions)
            .then(response => response.json())
            .then(data => setRoles(data))

    })


    return (
        <div>
            <Button
                variant="contained"
                size={'large'}
                endIcon={<AddCircle />}
                onClick={handleOpen}
            >
                Manage Roles
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"roles-list"}>
                <List>
                    {roles.map(({ id, name }) =>
                        <ListItem key={id}>
                            <ListItemText primary={name} />
                            <ListItemSecondaryAction>
                                <DeleteRoleBtn roles={roles} setRoles={setRoles} roleId={id} />
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                    <AddRole roles={roles} setRoles={setRoles} />
                </List>
            </Dialog>
        </div>
    )
}