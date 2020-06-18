import React from 'react';

import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Material UI
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 290,
    margin: '1em',
    textAlign: 'center',
    margin: '2em',
    padding: '1em',
  },
  media: {
    minHeight: 315,
  },
});

const CardPlayList = ({ image, name, total }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} />
      <CardContent>
        <Typography component="p" variant="h6">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <p> Total Track's: {total} </p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardPlayList;
