import React from "react";
import Button from "@material-ui/core/Button";
import {PersonAdd} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Dialog, Grid, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    shape: {
        maxWidth: "100%"
    },
}))

export default function AddMemberToChildTeam({members}) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Button
                size={'large'}
                fullWidth
                className={classes.shape}
                onClick={() => {
                    setOpenDialog(true)
                }}
            >
                <PersonAdd/>
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"addMember"}
            >
                <Grid container spacing={2} direction={"column"}>
                    <Grid item>
                        <List>
                            {members.map((member) => (
                                <ListItem button key={member.user.id}>
                                    <ListItemIcon>
                                        <Avatar/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {`${member.user.firstName} ${member.user.lastName}`}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}

