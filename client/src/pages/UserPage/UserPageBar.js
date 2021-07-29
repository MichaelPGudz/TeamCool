import React from "react";
import {Avatar, Grid, Paper, Typography} from "@material-ui/core";
//import SettingsMenu from "./SettingsMenu";
import {Image, Transformation} from "cloudinary-react";
import UserSettingsMenu from "./UserSettingsMenu";


export default function UserPageBar({loadedUser, loggedUser, setLoadedUser}) {

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
                                <Grid item style={{marginLeft: 10}}>
                                </Grid>
                            <Grid item style={{marginLeft: 10}}>
                                <Typography variant={"h4"}>
                                    This is page of {loadedUser.firstName} {loadedUser.lastName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    { loadedUser.id === loggedUser.id ?
                    <Grid item>
                        <UserSettingsMenu setLoadedUser = {setLoadedUser}/>
                    </Grid> : null }
                </Grid>
            </Paper>
        </div>
    )
}