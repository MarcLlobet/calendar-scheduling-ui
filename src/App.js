import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MeetingDetails from './components/meetingDetails'

import CancelMeeting from './components/cancelMeeting'
import Calendar from './components/calendar'

import { getWeeklySlots, weeklySlotsReceived } from './actions'


const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2)
  }
}))


function App() {
  const classes = useStyles(),
    greenColor = '#00bb9c',
    professional = 'Simon Molas Ramos'




  return (
    <Grid container spacing={3} justify="center">
      <Grid item sm={12} md={8} lg={6}>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h5" component="h1">
            <span>Confirma tu cita con <b>{professional}</b></span>
          </Typography>

          <MeetingDetails professional={professional} />
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
          <CancelMeeting professional={professional} />
        </Grid>
      </Grid>
    </Grid >
  );
}


const mapStateToProps = ({ weeklySlots, weeklySlotsError }) => ({
  weeklySlots,
  weeklySlotsError
})

const mapDispatchToProps = {
  getWeeklySlots
}

export default connect(mapStateToProps, mapDispatchToProps)(App)