import React from 'react';

import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useStyles } from './style';

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
          Total Track's: {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardPlayList;
