import React from "react";
import Button from "@material-ui/core/Button";
import {PersonAdd} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog, Grid, List} from "@material-ui/core";
import MemberListItem from "./MemberListItem";

const useStyles = makeStyles(() => ({
    shape: {
        maxWidth: "100%"
    },
}))

export default function AddMemberToChildTeam({members, setChildTeamMembers, childTeamMembers}) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [membersToAdd, setMembersToAdd] = React.useState(
        members.map((member) => {
            return member.user
        })
    );


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
                            {membersToAdd.map((member) => (
                                <MemberListItem key={member.id}
                                                member={member}
                                                setChildTeamMembers={setChildTeamMembers}
                                                childTeamMembers={childTeamMembers}
                                                membersToAdd={membersToAdd}
                                                setMembersToAdd={setMembersToAdd}/>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}

