import React from "react";
import {Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import AddMemberToChildTeam from "./AddMemberToChildTeam";

export default function AddChildTeam({members}) {
    const [childTeamName, setChildTeamName] = React.useState("New Child Team Name");
    const [childTeamMembers, setChildTeamMembers] = React.useState([]);

    return (
        <div>
            <Grid container
                  spacing={2}
                  direction={"column"}>
                <Grid item>
                    <TextField
                        onChange={e => setChildTeamName(e.target.value)}
                        value={childTeamName}
                        fullWidth>
                    </TextField>
                </Grid>
                <Grid item>
                    <AddMemberToChildTeam members={members}
                                          setChildTeamMembers={setChildTeamMembers}
                                          childTeamMembers={childTeamMembers}/>
                    {childTeamMembers.length > 0 ?
                        <List>
                            {childTeamMembers.map((member) => (
                                <ListItem button key={member.id}>
                                    <ListItemIcon>
                                        <Avatar/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {`${member.firstName} ${member.lastName}`}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List> :
                        null }
                </Grid>
            </Grid>
        </div>
    )

}