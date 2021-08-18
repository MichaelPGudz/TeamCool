import React from "react";
import {Grid, TextField} from "@material-ui/core";
import AddMemberToChildTeam from "./AddMemberToChildTeam";

export default function AddChildTeam({members}) {
    const [childTeamName, setChildTeamName] = React.useState("New Child Team Name");


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
                    <AddMemberToChildTeam members={members}/>
                </Grid>
            </Grid>
        </div>
    )

}