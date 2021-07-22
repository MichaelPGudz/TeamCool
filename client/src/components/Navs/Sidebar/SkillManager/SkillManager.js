import React, {useEffect} from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteSkillBtn from "./DeleteSkillBtn";



export default function SkillManager({openDialog, setOpenDialog}) {

    const [skills, setSkills] = React.useState([]);

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect( () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://localhost:5001/api/skills`, requestOptions)
            .then(response => response.json())
            .then(data => setSkills(data))

    },[openDialog])


    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"skills-list"}>
                <DialogTitle>Here you can manage skills</DialogTitle>
                <List>
                    {skills.map(({ id, firstName }) =>
                        <ListItem key={id}>
                            <ListItemText primary={firstName} />
                            <ListItemSecondaryAction>
                                <DeleteSkillBtn setSkills={setSkills} skills={skills} skillId={id}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </Dialog>
        </div>
    )
}