import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
      top: 'auto',
      bottom: 0
    },
  }));


const Footer = ((props) => {
    const classes = useStyles();

    return (
    <AppBar position="fixed" color="primary" className={classes.footer +" "+ props.additionalClasses}>
        <Toolbar>
            Made by RD, MG, JL
        </Toolbar>
    </AppBar>)
}
)

export default Footer;