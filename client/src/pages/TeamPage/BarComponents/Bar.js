import React from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import SettingsMenu from "./SettingsMenu";


export default function Bar({team, setTeam}) {

    return (
        <div>
            <Paper>
                <Grid container
                      spacing={1}
                      direction="row"
                      justify="space-between"
                      alignItems="center">
                    <Grid item>
                        <Typography variant={"h5"}
                                    style={{marginLeft: 10}}>
                            {team.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SettingsMenu team={team} setTeam={setTeam}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}