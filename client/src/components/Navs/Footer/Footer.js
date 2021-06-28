import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    footer: {
        top: 'auto',
        bottom: 0
    },
}));


export default function Footer ({addedClasses, openDrawer })  {

        const classes = useStyles();
        return (
            <AppBar position="fixed" color="primary" className={classes.footer + " " + clsx(addedClasses.appBar, {
                [addedClasses.appBarShift]: openDrawer,
            })} >
                <Toolbar>
                    Made by RD, MG, JL
                </Toolbar>
            </AppBar>)
    }


