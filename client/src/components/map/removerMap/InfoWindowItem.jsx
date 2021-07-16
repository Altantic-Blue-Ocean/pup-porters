import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slide, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  info: {
    margin: 30,
  },
})

function InfoWindowItem({coordinates}) {
  const classes = useStyles();
  return (
    <div className={classes.info}>
      <Typography color="primary">POOP HERE</Typography>
      <Typography>Price: $5.00</Typography>
    </div>
  )
};

export default InfoWindowItem;
