import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import { UserContext } from "../../components/Store/Store";
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from "@material-ui/core";


export default function AddSkills({loadedUser, userSkills, setUserSkills}) {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [skills, setSkills] = React.useState([]);
    const [state, dispatch] = React.useContext(UserContext);

    const handleOpen = () => {
        getSkills();
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const addSkill = (skillId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:5001/api/user/${loadedUser.id}/skill/${skillId}`, requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data); setUserSkills([...userSkills, data])})
    }
    

    const getSkills = (() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:5001/api/skills`, requestOptions)
            .then(response => response.json())
            .then(data => setSkills(data))

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
        fetch(`https://localhost:5001/api/skill/search`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setSkills(data);
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
                Add Skills
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"users-list"}>
                <DialogTitle>Click on skill to add</DialogTitle>
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
                        {skills.map(({ id, firstName }) =>
                            <ListItem button key={id} onClick={() => addSkill(id)}>
                                <ListItemText primary={firstName}/>
                                <ListItemSecondaryAction>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    )
}