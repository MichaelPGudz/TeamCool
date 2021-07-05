import React from 'react';
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from "@material-ui/core";
import UserDataTable from "./UserDataTable";
import UserSkills from "./UserSkills";
import {useParams} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import image from '../../static/images/avatar.jpg'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },

    avatarSize: {
        width: theme.spacing(25),
        height: theme.spacing(25)
    }
}));

const UserPage = () => {


    const classes = useStyles();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState([]);
    const [loadedSkills, setLoadedSkills] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://localhost:5001/api/user/${id}`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUser(data);
                setLoadedSkills(data.mySkills);
            });
    }, [id]);


    function createData(name, property) {
        return {name, property};
    }

    const rows = [
        createData("Id", loadedUser.id),
        createData("Name", loadedUser.firstName),
        createData("Lastname", loadedUser.lastName),
        createData("e-mail", loadedUser.email)
    ];

    if (isLoading) {
        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    User Page Loading...
                    <CircularProgress/>
                </Typography>
            </div>
        );
    }

    return (

        <div>
            <Typography variant="h3">
                User Page
            </Typography>

            <Avatar src={image} className={classes.avatarSize}/>

            <UserDataTable rows={rows} classes={classes}/>

            <Typography variant="h4">
                Skills
            </Typography>

            <UserSkills loadedUser={loadedUser} loadedSkills={loadedSkills} classes={classes}/>

        </div>
    )
}


export default UserPage;