import React from 'react';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
    },[skills]);
    
    return (
        <List>
            <React.Fragment key={loadedUser.id}>
                {(loadedUser.id === loggedUser.id || loggedUser.globalRole === adminRole) ?
                <AddSkillsToUser loadedUser={loadedUser} userSkills={skills} setUserSkills={setSkills}/>:
                null }
                <ListItem>
                    {skills.map(({ id, firstName }) =>
                        <React.Fragment key={id}>
                            <SkillUsersModal id={id} skillName={firstName} />
                            {(loadedUser.id === loggedUser.id || loggedUser.globalRole === adminRole) ?
                                <DeleteSkillFromUserBtn skillId={id} userId={loadedUser.id} />
                                : null}
                        </React.Fragment>
                    )}
                </ListItem>
            </React.Fragment>
        </List>
    )
}

export default UserSkills