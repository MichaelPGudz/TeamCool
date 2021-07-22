import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";



export default function DeleteSkillBtn({setSkills, skills, skillId}) {

    const handleDelete = () => {
        deleteFromServer(skillId);
        setSkills(skills.filter((skill) => {
            return skill.id !== skillId
        }));
    }

    const deleteFromServer = (skillId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            body: null
        };
        fetch(`https://localhost:5001/api/skill/${skillId}`, requestOptions)
            .then(response => response)
    }

    return (
        <div>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                <Delete />
            </IconButton>
        </div>
    )
}