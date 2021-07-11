import React from 'react';
import Wall from '../../components/Wall/Wall';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";


const Home = (props) => {


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
          <Grid container
          >
              <Grid item xs={3}>

              </Grid>
              <Grid item xs={6}>
                  <Wall id={props.userId} WallForUser/>
              </Grid>
              <Grid item xs={3}>

              </Grid>
          </Grid>
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
