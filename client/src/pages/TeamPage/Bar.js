import React from "react";
import {Button, Grid, Paper} from "@material-ui/core";
import {Settings} from "@material-ui/icons";
import TeamMemberMenu from "./BarComponents/TeamMemberMenu";
import ChildTeamsMenu from "./BarComponents/ChildTeamsMenu";


export default function Bar({teamMembers, childTeams}) {

    return (
        <div>
            <Paper>
                <Grid container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                    <Grid item>
                        <TeamMemberMenu teamMembers={teamMembers} />
                    </Grid>
                    <Grid item>
                        <ChildTeamsMenu childTeams={childTeams}/>
                    </Grid>
                    <Grid item>
                        <Button
                            size={"large"}
                        startIcon={<Settings/>}>
                            Options
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}