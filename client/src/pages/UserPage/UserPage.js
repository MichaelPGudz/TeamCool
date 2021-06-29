import React from 'react';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import UserDataTable from "./UserDataTable";

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    button: {
        margin: "1%"
    }
});

const UserPage = (props) => {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState([]);
    const [loadedSkills, setLoadedSkills] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:5001/api/user/${props.id}`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUser(data);
                setLoadedSkills(data.mySkills);
            });
    }, [props]);


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
            {console.log(loadedUser)}

            <Typography variant="h3">
                User Page
            </Typography>

            <UserDataTable rows={rows} classes={classes} />
            
            <Typography variant="h4">
                Your skills
            </Typography>
            
            <List>
                <React.Fragment key={loadedUser.id}>
                    <ListItem>
                        {loadedSkills.map(({ id, firstName }) =>
                            <React.Fragment key={id}>
                                <Button variant="contained" color="secondary" className = {classes.button}>{firstName}</Button>
                            </React.Fragment>
                        )}
                    </ListItem>
                </React.Fragment>
            </List>
        </div >
    )
}


export default UserPage;