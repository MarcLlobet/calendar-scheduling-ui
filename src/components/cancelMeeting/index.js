import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';


function CancelMeeting({ professional }) {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Typography>
        <span>¿Quieres cancelar tu cita con {professional}?</span>
      </Typography>
      <Button
        variant="contained"
        className={classes.cancelButton}
      >
        Cancelar cita
      </Button>
    </Grid>
  )
}

const mapStateToProps = ({
  professional
}) => ({
  professional
})

const mapDispatchToProps = {
  // cancelar cita
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelMeeting)

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    backgroundColor: grey[200],
    color: red[900],
    textTransform: 'none'
  }
}))