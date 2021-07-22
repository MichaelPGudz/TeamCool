import React from "react";
import Button from "@material-ui/core/Button";
import {Card, CardActions, CardContent, CardHeader, Switch, TextField} from "@material-ui/core";
import { AddCircle, RotateLeftSharp } from "@material-ui/icons";

export default function AddSkill({skills, setSkills}) {

    const [newSkill, setNewSkill] = React.useState();
    const token = window.localStorage.getItem('token');


    const handleSubmit = (event) => {
        event.preventDefault();
        addSkill();
    }


    const addSkill = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ firstName: newSkill })
        };
        fetch(`https://localhost:5001/api/skill/add`, requestOptions)
            .then(response => response.json())
            .then(data => setSkills([...skills, data]))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <TextField
                        id="add-skill"
                        variant={'outlined'}
                        onChange={e => setNewSkill(e.target.value)}
                        value={newSkill}
                        multiline
                        fullWidth
                    />
                </CardContent>
                <CardActions>
                    <Button size="medium"
                        type={'submit'}
                        fullWidth>
                        Add New Skill
                    </Button>
                </CardActions>
            </form>
        </div>
    )
}