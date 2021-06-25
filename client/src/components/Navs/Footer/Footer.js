import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
  }));


const Footer = (() => {
    const classes = useStyles();

    return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
            Made by RD, MG, JL
        </Toolbar>
    </AppBar>)
}
)

export default Footer;