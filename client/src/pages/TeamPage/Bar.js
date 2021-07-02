import React from "react";
import {Button, Grid, Paper} from "@material-ui/core";
import {AccountTree, Settings, SupervisorAccount} from "@material-ui/icons";
import TeamMemberMenu from "./TeamMemberMenu";


export default function Bar({teamMembers}) {
    const [teamMemberMenu, setTeamMemberMenu] = React.useState(null);
    const [childTeamsMenu, setChildTeamsMenu] = React.useState(null);
    const [settingsMenu, setSettingsMenu] = React.useState(null);

    const handleTeamMemberMenu = (event) => {
        setTeamMemberMenu(event.currentTarget);
    };

    const handleChildTeamMenu = (event) => {
        setChildTeamsMenu(event.currentTarget);
    };

    const handleSettingsMenu= (event) => {
        setSettingsMenu(event.currentTarget);
    };


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
                        <Button
                            size={"large"}
                            startIcon={<AccountTree/>}>
                            Child Teams
                        </Button>
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