import React, {useEffect} from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import AddRole from "./AddRole.js";
import DeleteRoleBtn from "./DeleteRoleBtn.js";


export default function RoleManager({openDialog, setOpenDialog}) {

    const [roles, setRoles] = React.useState([]);

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect( () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:5001/api/roles`, requestOptions)
            .then(response => response.json())
            .then(data => setRoles(data))

    },[openDialog])


    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"roles-list"}>
                <DialogTitle>Here you can manage roles</DialogTitle>
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