import React from "react";
import {AppBar, Box, Paper, Tab, Tabs} from "@material-ui/core";
import {AccountTree, People,} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    shape: {
        maxHeight: "75vh",
        // overflow: "auto",
        // overflowX: "hidden",
        // width: "100%"
    },

}))

export default function TeamPageTab({members, setMembers, childTeams, setChildTeams}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    scrollButtons={'on'}
                >
                    <Tab icon={<People />} aria-label="members" />
                    <Tab icon={<AccountTree />} aria-label="child-teams" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </Paper>
        </div>
    )


}