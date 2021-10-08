import React from "react";
import {Avatar, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Image, Transformation} from "cloudinary-react";


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
                    {member.logo ? <Avatar>
                            <Image publicId={member.logo}>
                                <Transformation width="45" height="45" crop="fill"/>
                            </Image>
                        </Avatar>
                        :
                        <Avatar/>}
                </ListItemIcon>
                <ListItemText>
                    {`${member.firstName} ${member.lastName}`}
                </ListItemText>
            </ListItem>
        </div>
    );
}

