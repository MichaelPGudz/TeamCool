import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {ExpandLess, ExpandMore, PeopleAlt, PeopleAltOutlined, Settings} from "@material-ui/icons";
import {CircularProgress, Collapse} from "@material-ui/core";



export default function Sidebar({addedClasses, openDrawer, menuClick}) {
    const classes = addedClasses;
    const theme = useTheme();
    const [openMyTeams, setOpenMyTeams] = React.useState(false);
    const [userTeams, setUserTeams] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://localhost:5001/api/user/1')
            .then(response => response.json())
            .then(data => {
                setUserTeams(data.myTeams);
                setLoading(false)
            });
    }, []);


    const handleMyTeamsClick = () => {
        setOpenMyTeams(!openMyTeams);
    }

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: openDrawer,
                    [classes.drawerClose]: !openDrawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: openDrawer,
                        [classes.drawerClose]: !openDrawer,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={menuClick}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button key={"My Teams"} onClick={handleMyTeamsClick}>
                        <ListItemIcon><PeopleAlt/></ListItemIcon>
                        <ListItemText primary={"My Teams"}/>
                        {openMyTeams ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={openMyTeams} timeout={"auto"} unmountOnExit>
                        <List>
                            {loading ?
                                <ListItem button className={classes.nested}>
                                <CircularProgress/>
                                </ListItem>
                                :
                                userTeams.map(({id, role, team}) => (
                                    <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <PeopleAltOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={team.name} secondary={role.name}/>
                                    </ListItem>
                                ))}
                        </List>
                    </Collapse>
                </List>
                <Divider/>
                <List>
                    <ListItem button key={"Settings"}>
                        <ListItemIcon><Settings/></ListItemIcon>
                        <ListItemText primary={"Settings"}/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}
