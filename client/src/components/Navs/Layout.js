import Navbar from './Navbar/Navbar';
import classes from './Layout.module.css';
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";

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

function Layout(props) {
    const addedClasses = useStyles();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const handleMenuClick = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <div>

            <Navbar addedClasses={addedClasses} menuClick={handleMenuClick} openDrawer={openDrawer}/>
            <Sidebar addedClasses={addedClasses} menuClick={handleMenuClick} openDrawer={openDrawer}/>
            <main className={classes.main}>{props.children}</main>
            <Footer addedClasses={addedClasses} openDrawer={openDrawer}/>
        </div>
    );
}

export default Layout;
