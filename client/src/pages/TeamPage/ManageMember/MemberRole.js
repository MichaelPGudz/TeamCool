import React, {useEffect} from "react";
import {
    Avatar, FormControl, Grid, InputLabel,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {useSnackbar} from "notistack";


export default function MemberRole({member, roles, addMember, team, setTeamMembers, newMembers, setNewMembers, setAddMember}) {
    const [role, setRole] = React.useState(roles[1].name);
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    useEffect(() => {
        if (addMember) {
            let memberRole = roles.find(x => x.name === role);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
            };
            fetch(`https://localhost:5001/api/team/${team.id}/AddTeamMember/${member.id}/${memberRole.id}`, requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(response)
                })
                .then(data => {
                    setTeamMembers(data);
                    enqueueSnackbar(`${member.firstName} ${member.lastName} added to ${team.name}!`, {variant: "success"});
                })
                .catch(error =>
                    error.json()
                        .then(result => {
                            enqueueSnackbar(`Error! ${result}`, {variant: "error"})
                        })
                )
            setAddMember(false);
        }
    }, [addMember])

    const handleDeletePotentialMember = () => {
        setNewMembers(newMembers.filter((newMember) => {
            return newMember !== member;
        }))
    }

    return (
        <div>
            <Grid container
                  direction="row">
                <Grid item xs={6}>
                    <ListItem key={member.id}
                    >
                        <ListItemIcon>
                            <Avatar/>
                        </ListItemIcon>
                        <ListItemText>
                            {`${member.firstName} ${member.lastName}`}
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton edge="end"
                                        aria-label="delete"
                                        onClick={handleDeletePotentialMember}
                            >
                                <Delete/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="select-role">Role</InputLabel>
                        <Select
                            labelId="select-role"
                            id="select-role"
                            fullWidth
                            value={role}
                            onChange={handleChange}
                        >
                            {roles.map((role) => (
                                <MenuItem key={member.id + role.id} value={role.name}>{role.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )

}