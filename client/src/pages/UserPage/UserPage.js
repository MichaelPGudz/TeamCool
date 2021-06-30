import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";
import UserDataTable from "./UserDataTable";
import UserSkills from "./UserSkills";
import SkillUsersModal from "./SkillUsersModal";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    button: {
        margin: "1%"
    }
});

const UserPage = () => {


    const classes = useStyles();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState([]);
    const [loadedSkills, setLoadedSkills] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:5001/api/user/${id}`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUser(data);
                setLoadedSkills(data.mySkills);
            });
    },[id]);


    function createData(name, property) {
        return { name, property };
    }

    const rows = [
        createData("Your id", loadedUser.id),
        createData("Your name", loadedUser.firstName),
        createData("Your lastname", loadedUser.lastName),
        createData("Your e-mail", loadedUser.email)
    ];

    if (isLoading) {
        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    User Page Loading...
                    <CircularProgress />
                </Typography>
            </div>
        );
    }

    return (

        <div>
            <Typography variant="h3">
                User Page
            </Typography>

            <UserDataTable rows={rows} classes={classes} />

            <Typography variant="h4">
                Your skills
            </Typography>

            <UserSkills loadedUser={loadedUser} loadedSkills={loadedSkills} classes={classes} />

            <SkillUsersModal id='1' />

        </div >
    )
}


export default UserPage;