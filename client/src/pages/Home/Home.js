import React from 'react';
import Wall from '../../components/Wall';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  btn: {
    float: 'right',
    marginRight: '20%',
  },
}));

const Home = (props) => {
  const classes = useStyles();

  const userGreeting = (
    <Typography variant="h3">
      Welcome {props.firstName} {props.lastName}!
    </Typography>
  )

  const guestGreeting = (
    <Typography variant="h3">
      Welcome dear guest! Please login to see your team! :D
    </Typography>
  )

  if (props.firstName !== null || props.lastName !== null){
    return (
      <div>
        {userGreeting}
        <Button variant="contained" color="primary" className={classes.btn}>
          Add New Team
        </Button>
        <Wall id="1" WallForUser />
      </div>
    );
  }

  return (
    <div>
      {guestGreeting}
    </div>
  )

};

export default Home;
