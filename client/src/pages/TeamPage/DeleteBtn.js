import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";



export default function DeleteBtn({updateFeatures, features, teamId, featureId}) {

    const handleDelete = () => {
        deleteFromServer(featureId);
        updateFeatures(features.filter((feature) => {
            return feature.id !== featureId
        }));
    }

    const deleteFromServer = (featureId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: null
        };
        fetch(`https://localhost:5001/api/team/${teamId}/feature/${featureId}`, requestOptions)
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