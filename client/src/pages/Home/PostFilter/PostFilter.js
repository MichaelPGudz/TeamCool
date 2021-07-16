import React from "react";
import {
    List,
    Paper,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {UserContext} from "../../../components/Store/Store";
import Filter from "./Filter";


const useStyles = makeStyles(() => ({
    shape: {
        maxHeight: "75vh",
        overflow: "auto"
    }
}))

export default function PostFilter() {
    const classes = useStyles();
    const [state, dispatch] = React.useContext(UserContext);


    return (
        <div>
            <Paper className={classes.shape}>
                <List>
                    {state.user.myTeams.map(({team}) =>(
                         <Filter key={team.id} team={team}/>
                    ))}
                </List>
            </Paper>
        </div>
    )
}