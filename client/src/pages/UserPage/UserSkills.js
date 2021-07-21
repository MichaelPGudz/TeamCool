import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SkillUsersModal from "./SkillUsersModal";
import DeleteSkillBtn from './DeleteSkillBtn';


const UserSkills = ({ loadedUser, skills, setSkills, loggedUser }) => {

    var adminRole = "Admin"
    
    return (
        <List>
            <React.Fragment key={loadedUser.id}>
                <ListItem>
                    {skills.map(({ id, firstName }) =>
                        <React.Fragment key={id}>
                            <SkillUsersModal id={id} skillName={firstName} />
                            {(loadedUser.id === loggedUser.id || loggedUser.globalRole === adminRole) ?
                                <DeleteSkillBtn setSkills={setSkills} skills={skills} skillId={id} userId={loadedUser.id} />
                                : null}
                        </React.Fragment>
                    )}
                </ListItem>
            </React.Fragment>
        </List>
    )
}

export default UserSkills