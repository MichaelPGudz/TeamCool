import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import SkillUsersModal from "./SkillUsersModal";
import DeleteSkillFromUserBtn from './DeleteSkillFromUserBtn';
import AddSkillsToUser from './AddSkillsToUser';


const UserSkills = ({ loadedUser, skills, setSkills, loggedUser }) => {

    var adminRole = "Admin"

    useEffect(() => {
        fetch(`https://localhost:5001/api/user/${loadedUser.id}/skills`)
            .then(reponse => reponse.json())
            .then(data => {
                setSkills(data);
            });
    }, [skills]);

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
                            <Grid item style={{ marginLeft: 10 }}>
                            </Grid>
                            <Grid item style={{ marginLeft: 10 }}>
                                <Typography variant={"h4"}>
                                    Skills
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {(loadedUser.id === loggedUser.id || loggedUser.globalRole === adminRole) ?
                        <Grid item>
                            <AddSkillsToUser loadedUser={loadedUser} userSkills={skills} setUserSkills={setSkills} />
                        </Grid> :
                        null}
                </Grid>
            </Paper>

            <Grid container spacing={2}>


                <React.Fragment key={loadedUser.id}>
                    {skills.map(({ id, firstName }) =>
                        <React.Fragment>
                            <Grid item>
                                <SkillUsersModal id={id} skillName={firstName} />
                            </Grid>
                            <Grid item>
                                {(loadedUser.id === loggedUser.id || loggedUser.globalRole === adminRole) ?
                                    <DeleteSkillFromUserBtn skillId={id} userId={loadedUser.id} />
                                    : null}
                            </Grid>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </Grid>
        </div>
    )
}

export default UserSkills