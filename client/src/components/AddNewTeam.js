import React from "react";
import {
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core";

import Button from "@material-ui/core/Button";
import {UserContext} from "./Store/Store";
import {useHistory} from "react-router-dom";


export default function AddNewTeam({openDialog, setOpenDialog}) {

    const [name, setName] = React.useState("");
    const [state, dispatch] = React.useContext(UserContext);
    const history = useHistory();
    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleBtnClick = () => {
        let newTeam = {name: name};
        addTeam(newTeam);
        setOpenDialog(false);
    }


    const addTeam = (newTeam) => {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: JSON.stringify(newTeam)
        };
        fetch(`https://localhost:5001/api/team`, requestOptions)
            .then(response => response.json())
            .then(data => {
                dispatch({type: "addTeam", payload: [data]});
                history.push(`/team/${data.team.id}`);
            })
    }

    return (
        <div>

            <Dialog
                open={openDialog}
                onClose={handleClose}
            >
                <DialogTitle>Add Team</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item>
                            <TextField
                                id={'name'}
                                label={'Name'}
                                onChange={e => setName(e.target.value)}
                                fullWidth
                                variant={'outlined'}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBtnClick}
                            variant="contained"
                            size={'large'}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}