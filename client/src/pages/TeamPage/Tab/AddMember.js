import React from "react";
import Button from "@material-ui/core/Button";
import {PersonAdd, YoutubeSearchedFor} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    TextField
} from "@material-ui/core";
import UserListItem from "../UserListItem";

const useStyles = makeStyles(() => ({
    shape: {
        maxWidth: "100%"
    },
    dialogSize: {
        maxHeight: '85%',
        height: '100%'
    }

}))

export default function AddMember({team, setTeamMembers}) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [users, setUsers] = React.useState([])


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

    const handleBtnClick = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Button
                size={'large'}
                fullWidth
                className={classes.shape}
                onClick={handleBtnClick}
            >
                <PersonAdd/>
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"addMember"}
                classes={{paper: classes.dialogSize}}>
                <DialogTitle id={"addMember"}>Search members</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} direction={"column"}>
                        <Grid item>
                            <TextField
                                id={'name'}
                                label={'Type name to search'}
                                onChange={handleSearch}
                                fullWidth
                                variant={'outlined'}/>
                        </Grid>
                        <Grid item>
                            <List>
                                {users.length === 0 ?
                                    <ListItem key={'noFound'}>
                                        <ListItemIcon>
                                            <YoutubeSearchedFor/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Not found!
                                        </ListItemText>
                                    </ListItem>
                                    :
                                    users.map((user) => (
                                        <UserListItem user={user}  key={user.id} team={team} setTeamMembers={setTeamMembers}/>
                                    ))}
                            </List>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )

}