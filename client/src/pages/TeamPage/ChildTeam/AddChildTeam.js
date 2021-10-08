import React, {useEffect} from "react";
import {Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import AddMemberToChildTeam from "./AddMemberToChildTeam";
import {useSnackbar} from "notistack";
import {Image, Transformation} from "cloudinary-react";

export default function AddChildTeam({
                                         members,
                                         childTeam,
                                         nbOfNewChildTeam,
                                         setNbOfNewChildTeam,
                                         startFetch,
                                         setChildTeams,
                                         team,
                                         childTeams
                                     }) {

    const [childTeamName, setChildTeamName] = React.useState("New Child Team Name");
    const [childTeamMembers, setChildTeamMembers] = React.useState([]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (startFetch) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify({name: childTeamName}),
            };
            fetch(`https://localhost:5001/api/team/${team.id}`, requestOptions)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(response)
                })
                .then(data => {
                    enqueueSnackbar(`Team ${data.name} created successfully!`, {variant: "success"});
                    addChildTeamMembers(data);
                    setChildTeams([...childTeams, data]);
                    setReadyToGo();
                })
                .catch(error =>
                    error.json()
                        .then(result => {
                            enqueueSnackbar(`Error!`, {variant: "error"})
                        })
                )
        }
    }, [startFetch])


    const setReadyToGo = () => {
        setNbOfNewChildTeam(nbOfNewChildTeam.map((newChildTeam) => {
            if (newChildTeam.id === childTeam.id) {
                return {id: childTeam.id, ready: true};
            } else {
                return newChildTeam;
            }
        }));
    }

    const addChildTeamMembers = (childTeam) => {
        childTeamMembers.forEach((member) => {
            addTeamMemberFetch(member, childTeam)
        })
    }

    const addTeamMemberFetch = (member, childTeam) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
        };
        fetch(`https://localhost:5001/api/team/${childTeam.id}/AddTeamMember/${member.id}/6`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(response)
            })
            .then(data => {
                enqueueSnackbar(`${member.firstName} ${member.lastName} added to ${childTeam.name}!`, {variant: "success"});
            })
            .catch(error =>
                error.json()
                    .then(result => {
                        enqueueSnackbar(`Error! ${result}`, {variant: "error"})
                    })
            )
    }

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
                    <AddMemberToChildTeam members={members}
                                          setChildTeamMembers={setChildTeamMembers}
                                          childTeamMembers={childTeamMembers}/>
                    {childTeamMembers.length > 0 ?
                        <List>
                            {childTeamMembers.map((member) => (
                                <ListItem button key={member.id}>
                                    <ListItemIcon>
                                        {member.logo ? <Avatar>
                                                <Image publicId={member.logo}>
                                                    <Transformation width="45" height="45" crop="fill"/>
                                                </Image>
                                            </Avatar>
                                            :
                                            <Avatar/>}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {`${member.firstName} ${member.lastName}`}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List> :
                        null}
                </Grid>
            </Grid>
        </div>
    )

}