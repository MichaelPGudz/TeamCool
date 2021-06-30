import React from 'react';
import Wall from '../../components/Wall';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  btn: {
    float: 'right',
    marginRight: '20%',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.btn}>
        Add New Team
      </Button>
      <Wall id="1" WallForUser/>
    </div>
  );
};

export default Home;
