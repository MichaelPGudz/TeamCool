import React from "react";
import { Grid, Paper} from "@material-ui/core";
import TeamMemberMenu from "./BarComponents/TeamMemberMenu";
import ChildTeamsMenu from "./BarComponents/ChildTeamsMenu";
import SettingsMenu from "./BarComponents/SettingsMenu";


export default function Bar({teamMembers, childTeams, team, setTeam}) {

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
                        <SettingsMenu team={team} setTeam={setTeam}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}