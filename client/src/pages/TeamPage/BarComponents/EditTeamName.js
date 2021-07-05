import React from "react";
import {
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField
} from "@material-ui/core";
import {Edit} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";


export default function EditTeamName({team, setTeam}) {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [name, setName] = React.useState();

    const handleBtnClick = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editTeamName(name);
    }

    const editTeamName = (name) => {
        const requestOptions = {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        };
        fetch(`https://localhost:5001/api/team/${team.id}`, requestOptions)
            .then(response => response.json())
            .then(data => setTeam(data))
    }

    return (
        <div>
            <ListItem button
                      onClick={handleBtnClick}>
                <ListItemAvatar>
                    <Avatar>
                        <Edit/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Edit name"}/>
            </ListItem>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"edit-name-form"}>
                <DialogTitle id={"edit-name-form"}>Edit name</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2} direction={"column"}>
                            <Grid item>
                                <TextField
                                    id={'name'}
                                    label={'Name'}
                                    onChange={e => setName(e.target.value)}
                                    defaultValue={team.name}
                                    fullWidth
                                    variant={'outlined'}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                                variant="contained"
                                type={'submit'}
                                size={'large'}>
                            Edit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}