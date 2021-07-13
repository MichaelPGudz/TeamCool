import React from "react";
import {Avatar, Grid, Paper, Typography} from "@material-ui/core";
import SettingsMenu from "./SettingsMenu";
import {Image, Transformation} from "cloudinary-react";


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
                        <Grid container
                              direction={"row"}
                              spacing={2}
                              justify="center"
                              alignItems="center">
                            {team.logo ?
                                <Grid item style={{marginLeft: 10}}>
                                    <Avatar>
                                    <Image publicId={team.logo}>
                                        <Transformation width="50" height="50"  crop="fill"/>
                                    </Image>
                                    </Avatar>
                                </Grid>
                                : null}
                            <Grid item>
                                <Typography variant={"h5"}>
                                    {team.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <SettingsMenu team={team} setTeam={setTeam}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}