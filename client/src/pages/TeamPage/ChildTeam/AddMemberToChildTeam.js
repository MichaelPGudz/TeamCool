import React from "react";
import Button from "@material-ui/core/Button";
import {PersonAdd} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    shape: {
        maxWidth: "100%"
    },
}))

export default function AddMemberToChildTeam() {
    const classes = useStyles();

    const handleBtnClick = () => {

    }

    return (
        <div>
            <Button
                size={'large'}
                fullWidth
                className={classes.shape}
                onClick={handleBtnClick}
            >
                <PersonAdd/>
            </Button>
        </div>
    )

}