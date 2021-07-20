import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { GitHub } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DeleteFeatureBtn from './DeleteFeatureBtn';

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

export default function FeaturesList({ calendar, updateFeatures, teamId }) {
  const classes = useStyles();

  return (
    <List>
      {calendar
        // .filter(feature => feature.type === 'calendar')
        .map(({ id, name, url }) => (
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
                <GitHub />
              </Avatar>
            </ListItemAvatar>
            {name == 'Calendar' ? (
              <iframe src={url} className={classes.calendar}></iframe>
            ) : (
              <ListItemText primary={name} />
            )}
            <ListItemSecondaryAction>
              <DeleteFeatureBtn
                teamId={teamId}
                updateFeatures={updateFeatures}
                calendar={calendar}
                featureId={id}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
}
