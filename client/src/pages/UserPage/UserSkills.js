import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const UserSkills = (props) => {
    return (
        <List>
            <React.Fragment key={props.loadedUser.id}>
                <ListItem>
                    {props.loadedSkills.map(({ id, firstName }) =>
                        <React.Fragment key={id}>
                            <Button variant="contained" color="secondary" className={props.classes.button}>{firstName}</Button>
                        </React.Fragment>
                    )}
                </ListItem>
            </React.Fragment>
        </List>
    )
}

export default UserSkills