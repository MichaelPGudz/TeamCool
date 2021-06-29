import React from "react";
import {useParams} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        display: "flex"
    }
}));

export default function TeamPage (){
    const classes = useStyles();
    const {id} = useParams();
    return(
        <div className={classes.main}>
            <h1>TEAM PAGE {id}</h1>
        </div>
    )
}