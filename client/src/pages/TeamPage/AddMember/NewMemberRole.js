import React from "react";
import {
    Avatar, FormControl, Grid, InputLabel,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select
} from "@material-ui/core";


export default function NewMemberRole({member, roles}) {
    const [role, setRole] = React.useState(roles[1].name);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <div>
            <Grid container
                  direction="row">
                <Grid item xs={6}>
                    <ListItem button key={member.id}
                    >
                        <ListItemIcon>
                            <Avatar/>
                        </ListItemIcon>
                        <ListItemText>
                            {`${member.firstName} ${member.lastName}`}
                        </ListItemText>
                        <ListItemSecondaryAction>

                        </ListItemSecondaryAction>
                    </ListItem>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant={"filled"} fullWidth>
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