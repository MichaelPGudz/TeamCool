import React from "react";
import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import SettingsMenu from "./SettingsMenu";
import { Image, Transformation } from "cloudinary-react";
import { UserContext } from "../../../components/Store/Store";



export default function Bar({ team, setTeam, currentUser}) {
    const [state, dispatch] = React.useContext(UserContext);
    
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
                                <Grid item style={{ marginLeft: 10 }}>
                                    <Avatar>
                                        <Image publicId={team.logo}>
                                            <Transformation width="45" height="45" crop="fill" />
                                        </Image>
                                    </Avatar>
                                </Grid>
                                :
                                null}
                            <Grid item style={{ marginLeft: 10 }}>
                                <Typography variant={"h4"}>
                                    {team.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {(currentUser != null && currentUser.role.name == "Team Owner") ||  state.globalRole == "Admin" ?
                        <Grid item>
                            <SettingsMenu team={team} setTeam={setTeam} />
                        </Grid> : null
                    }
                </Grid>
            </Paper>
        </div>
    )
}