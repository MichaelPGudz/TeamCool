import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Footer from "../Footer/Footer";
import {ExpandLess, ExpandMore, PeopleAlt, PeopleAltOutlined, Settings, StarBorder} from "@material-ui/icons";
import {CircularProgress, Collapse} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(true);
    const [openMyTeams, setOpenMyTeams] = React.useState(false);
    const [userTeams, setUserTeams] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://localhost:5001/api/user/1')
            .then(reponse => reponse.json())
            .then(data => {
                setUserTeams(data.myTeams);
                setLoading(false)
            });
    }, []);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
        setOpenMyTeams(false);
    };

    const handleMyTeamsClick = () => {
        setOpenMyTeams(!openMyTeams);
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: openDrawer,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
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
                    <IconButton onClick={handleDrawerClose}>
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
            <Footer additionalClasses={clsx(classes.appBar, {
                [classes.appBarShift]: openDrawer,
            })}/>
        </div>
    );
}
