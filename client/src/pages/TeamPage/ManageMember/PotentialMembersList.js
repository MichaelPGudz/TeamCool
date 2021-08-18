import React, {useEffect} from "react";
import MemberRole from "./MemberRole";
import {Button, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {PanTool} from "@material-ui/icons";


export default function PotentialMembersList({
                                                 newMembers,
                                                 addMember,
                                                 setAddMember,
                                                 team,
                                                 setTeamMembers,
                                                 setNewMembers,
                                             }) {

    const [roles, setRoles] = React.useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        fetch(`https://localhost:5001/api/roles`, requestOptions)
            .then(response => response.json())
            .then(data => setRoles(data))

    }, [])

    return (
        <div>
            <List>
                {newMembers.length === 0 ?
                    <ListItem key={'noFound'}>
                        <ListItemIcon>
                            <PanTool/>
                        </ListItemIcon>
                        <ListItemText>
                            Select new members!
                        </ListItemText>
                    </ListItem> :
                    newMembers.map((member) => (
                        <MemberRole key={member.id}
                                    member={member}
                                    roles={roles}
                                    addMember={addMember}
                                    team={team}
                                    setTeamMembers={setTeamMembers}
                                    newMembers={newMembers}
                                    setNewMembers={setNewMembers}
                                    setAddMember={setAddMember}/>
                    ))}
            </List>
            {newMembers.length === 0 ?
                null :
                <Button variant="contained"
                        fullWidth
                        disableElevation
                        onClick={() => {
                            setAddMember(true);
                        }}>
                    Add new members
                </Button>}
        </div>
    )

}