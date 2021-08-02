import React, {useEffect} from "react";
import NewMemberRole from "./NewMemberRole";
import {List} from "@material-ui/core";


export default function NewMemberList({newMembers}) {

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
                'Add new members' :
                newMembers.map((member) => (
                    <NewMemberRole key={member.id} member={member} roles={roles}/>
                ))}
            </List>
        </div>
    )

}