import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { UserContext } from "../../../components/Store/Store";
import {useHistory} from "react-router-dom";


export default function DeleteMember({ teamId, memberId, userMember, members, setMembers }) {
    const [state, dispatch] = React.useContext(UserContext);
    const history = useHistory();

    const handleDelete = () => {
        deleteFromServer(memberId);
        setMembers(
            members.filter(member => {
                return member.id !== memberId;
            })
        );
        if (state.user.id == userMember.id){
            history.push('/')
            window.location.reload();
        }
    };

    const deleteFromServer = memberId => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('token'),
            },

            body: null,
        };
        fetch(
            `https://localhost:5001/api/team/${teamId}/${memberId}`,
            requestOptions
        ).then(response => response);
    };

    return (
        <div>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                <Delete />
            </IconButton>
        </div>
    );
}
