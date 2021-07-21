import React from "react";
import Button from "@material-ui/core/Button";
import {AddCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    shape: {
        maxWidth: "100%"
    },

}))

export default function AddChildTeam() {
    const classes = useStyles();


    return (
        <div>
            <Button
                size={'large'}
                className={classes.shape}
                fullWidth
            >
                <AddCircle/>
            </Button>
        </div>
    )

}