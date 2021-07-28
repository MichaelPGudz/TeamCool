import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Schedule } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DeleteCalendar from './DeleteCalendar';

const useStyles = makeStyles(() => ({
  shape: {
    maxHeight: '75vh',
    overflow: 'auto',
  },
  calendar: {
    height: '30vh',
    width: '85%',
  },
}));

export default function FeaturesList({ calendar, teamId, updateCalendar }) {
  const classes = useStyles();

  return (
    <List>
      {calendar.map(({ id, name, url }) => (
        <ListItem
          button
          key={id}
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemAvatar>
            <Avatar>
              <Schedule />
            </Avatar>
          </ListItemAvatar>
          <iframe src={url} className={classes.calendar}></iframe>
          <ListItemSecondaryAction>
            <DeleteCalendar
              teamId={teamId}
              features={calendar}
              updateCalendar={updateCalendar}
              calendar={calendar}
              featureId={id}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
