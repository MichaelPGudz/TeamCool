import React from "react";
import {Paper, Tab, Tabs} from "@material-ui/core";
import {AccountTree, People,} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import TeamMembers from "./TeamMembers";
import ChildTeams from "./ChildTeams";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles(() => ({
    shape: {
        maxHeight: "80vh",
        overflow: "auto",
        overflowX: "hidden",
        overflowY: "hidden",
    },

}))

export default function TeamPageTab({members, setMembers, childTeams, setChildTeams, team, currentUser}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    }
    return (
        <div>
            <Paper className={classes.shape}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="team-tab"
                    // scrollButtons={'auto'}
                >
                    <Tab icon={<People/>}
                         style={{minWidth: "50%"}}
                         aria-label="members"/>
                    <Tab icon={<AccountTree/>}
                         style={{minWidth: "50%"}}
                         aria-label="child-teams"/>
                </Tabs>
                <SwipeableViews onChangeIndex={handleChangeIndex} index={value}>
                    <TeamMembers index={0} members={members} setMembers={setMembers} team={team}
                                 currentUser={currentUser}/>
                    <ChildTeams index={1} childTeams={childTeams} setChildTeams={setChildTeams} members={members} team={team}/>
                </SwipeableViews>
            </Paper>
        </div>
    )


}