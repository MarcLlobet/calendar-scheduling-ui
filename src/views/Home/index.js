import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MeetingDetails from '../../components/meetingDetails'

import CancelMeeting from '../../components/cancelMeeting'
import Calendar from '../../components/calendar'
import Modal from '../../components/modal'

import {
  getInitialData,
  getWeeklySlots,
  weeklySlotsReceived,
  bookSlot
} from '../../actions'


function App({ getInitialData, professional }) {

  useEffect(() => {
    getInitialData()
  }, [getInitialData])


  const classes = useStyles()

  return (
    <>
      <Modal></Modal>
      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="h5" component="h1">
          <span>Confirma tu cita con <b>{professional}</b></span>
        </Typography>

        <MeetingDetails />
      </Grid>

      <Divider variant="middle" />

      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="h5" component="h2">
          <b>¿Te ha surgido algun imprevisto?</b>
        </Typography>
        <Typography variant="subtitle1" component="p">
          <span>Puedes cambiar la cita para cuando vaya mejor</span>
        </Typography>
        <Calendar />
      </Grid>

      <Divider variant="middle" />

      <Grid item xs={12} className={classes.gridItem}>
        <CancelMeeting />
      </Grid>
    </>
  );
}


const mapStateToProps = ({
  professional,
  weeklySlots,
  weeklySlotsError,
  bookSlot,
  bookSlotError
}) => ({
  professional,
  weeklySlots,
  weeklySlotsError,
  bookSlot,
  bookSlotError
})

const mapDispatchToProps = {
  getInitialData,
  getWeeklySlots
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


const useStyles = makeStyles((theme) => ({
  '@global': {
    '.MuiButton-root': {
      textTransform: 'none'
    },
    '.MuiPaper-root': {
      marginTop: theme.spacing(2)
    }
  },
  gridItem: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  }
}))