import Navbar from './Navbar/Navbar';
import classes from './Layout.module.css';
import Sidebar from "./Sidebar/Sidebar";
import {makeStyles, ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import React from "react";
import {CssBaseline, useMediaQuery} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root:{
        display: "flex",
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

function Layout(props) {
    const addedClasses = useStyles();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const handleMenuClick = () => {
        setOpenDrawer(!openDrawer);
    };
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <div className={addedClasses.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
            <Navbar addedClasses={addedClasses} menuClick={handleMenuClick} openDrawer={openDrawer} token={props.token} id = {props.id}/>
            <Sidebar addedClasses={addedClasses} menuClick={handleMenuClick} openDrawer={openDrawer} userId={props.id}/>
            <main className={classes.main}>{props.children}</main>
            </ThemeProvider>
        </div>
    );
}

export default Layout;
