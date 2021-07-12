import React from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
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
                                    <Image publicId={team.logo}>
                                        <Transformation width="30" height="30" radius="max" crop="fill"  border="2px_solid_rgb:544f4f" effect="vectorize"/>
                                    </Image>
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