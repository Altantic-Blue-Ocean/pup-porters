import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function BackButton() {
  const history = useHistory()

  return (
      <Button
      onClick={() => history.go(-1)}
      variant="contained" >
      Back
    </Button>
  );
}