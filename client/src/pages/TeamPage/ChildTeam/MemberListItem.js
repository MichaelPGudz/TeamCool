import React from "react";
import {Avatar, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";


export default function MemberListItem({member, setChildTeamMembers, childTeamMembers, membersToAdd, setMembersToAdd}) {

    const handleMemberClick = () => {
        setChildTeamMembers([...childTeamMembers, member]);
        setMembersToAdd(
            membersToAdd.filter((memberToAdd) => {
                return memberToAdd.id !== member.id;
            })
        );
    }

    return (
        <div>
            <ListItem button
                      key={member.id}
                      onClick={handleMemberClick}>
                <ListItemIcon>
                    <Avatar/>
                </ListItemIcon>
                <ListItemText>
                    {`${member.firstName} ${member.lastName}`}
                </ListItemText>
            </ListItem>
        </div>
    );
}

