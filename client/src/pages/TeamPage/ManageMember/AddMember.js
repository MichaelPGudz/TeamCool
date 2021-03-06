import React from "react";
import Button from "@material-ui/core/Button";
import {PersonAdd, YoutubeSearchedFor} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    TextField
} from "@material-ui/core";
import PotentialMembersList from "./PotentialMembersList";
import Divider from "@material-ui/core/Divider";
import {Image, Transformation} from "cloudinary-react";

const useStyles = makeStyles(() => ({
    shape: {
        maxWidth: "100%"
    },
    dialogSize: {
        width: '100%',
        maxWidth: '65%',
        maxHeight: '85%',
        height: '100%'
    },
    gridChildren: {
        height: '100%',
        maxHeight: '100%',
        overflow: "auto"
    }

}))

export default function AddMember({team, setTeamMembers}) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [newMembers, setNewMembers] = React.useState([]);
    const [addMember, setAddMember] = React.useState(false);


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
                handleSetUser(data);
            })
    }

    const handleBtnClick = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
        setAddMember(false);
        setNewMembers([]);
    };


    // check if searched user is already in potential members, if true -> doesn't show in search column
    const handleSetUser = (users) => {
        setUsers(users.filter((user) => {
            return !newMembers.some((member) => member.id === user.id);
        }))
    }

    const handleUserClick = (addedUser) => {
        setNewMembers([...newMembers, addedUser]);
        setUsers(users.filter((user) => {
            return user !== addedUser;
        }))
    }

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
                <Grid container className={classes.gridChildren}>
                    <Grid item xs={3} className={classes.gridChildren}>
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
                                                <ListItem button key={user.id}
                                                          onClick={() => {
                                                              handleUserClick(user)
                                                          }}>
                                                    <ListItemIcon>
                                                        {user.logo ? <Avatar>
                                                                <Image publicId={user.logo}>
                                                                    <Transformation gravity="face" width="45" height="45" crop="fill"/>
                                                                </Image>
                                                            </Avatar>
                                                            :
                                                            <Avatar/>}
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        {`${user.firstName} ${user.lastName}`}
                                                    </ListItemText>
                                                </ListItem>
                                            ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </DialogContent>

                    </Grid>
                    <Grid item xs={1}>
                        <Divider orientation="vertical" flexItem className={classes.gridChildren}/>
                    </Grid>
                    <Grid item xs={8} className={classes.gridChildren}>
                        <PotentialMembersList newMembers={newMembers}
                                              addMember={addMember}
                                              team={team}
                                              setTeamMembers={setTeamMembers}
                                              setAddMember={setAddMember}
                                              setNewMembers={setNewMembers}
                        />
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )

}