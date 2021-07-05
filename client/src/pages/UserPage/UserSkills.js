import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SkillUsersModal from "./SkillUsersModal";


const UserSkills = (props) => {
    return (
        <List>
            <React.Fragment key={props.loadedUser.id}>
                <ListItem>
                    {props.loadedSkills.map(({ id, firstName }) =>
                        <React.Fragment key={id}>
                            <SkillUsersModal id={id} skillName={firstName} />
                        </React.Fragment>
                    )}
                </ListItem>
            </React.Fragment>
        </List>
    )
}

export default UserSkills