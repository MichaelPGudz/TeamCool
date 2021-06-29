import React from 'react';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';


const UserPage = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:5001/api/user/${props.id}`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUser(data);
            });
    }, [props]);

    return (
        <div>
            {console.log(loadedUser)}
            <List>
                <React.Fragment key={loadedUser.id}>
                    <ListItem button>
                        <ListItemText primary={loadedUser.id + " " + loadedUser.firstName + " " + loadedUser.lastName} secondary={loadedUser.email} />
                    </ListItem>
                </React.Fragment>
            </List>
        </div>
    )
}


export default UserPage;