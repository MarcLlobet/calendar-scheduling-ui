import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MeetingDetails from './MeetingDetails'
import Reducer from './reducer'


import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import Moment from 'moment';

import { getWeeklySlots, weeklySlotsReceived } from './actions'


const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2)
  }
}))


function App() {
  const classes = useStyles();
  const profesional = 'Simon Molas Ramos'
  const meetingDetails = {
    profesional,
    location: "Ps. de l'Estació, 12 (bajos) 43800 Valls Tarragona",
    agenda: 'Viernes'
  }


  const [slots, loadWeeklySlots] = useReducer(Reducer, [])

  useEffect(() => {
    const todaysDate = Moment().format('yyyyMMDD')
    loadWeeklySlots(getWeeklySlots(todaysDate))
  }, [slots])

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} sm={10} md={8}>

        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h5" component="h1">
            <span>Confirma tu cita con <b>{profesional}</b></span>
          </Typography>
        </Grid>

        <MeetingDetails {...meetingDetails} />

        <Grid item xs={12} className={classes.gridItem}>
          <Divider variant="middle" />
        </Grid>


        <Grid item xs={12} className={classes.gridItem}>
          {/* <WeekCalendar
            scaleUnit={1440}
            cellHeight={200}
            dayFormat={`dddd
             DD MMMM.`}
            eventSpacing={5}
          /> */}
          {JSON.stringify(slots)}
        </Grid>


        <Grid item xs={12} className={classes.gridItem}>
          <Typography>
            <span>¿Quieres cancelar tu cita con {profesional}?</span>
          </Typography>
        </Grid>

      </Grid>
    </Grid >
  );
}


const mapStateToProps = ({ weeklySlots, weeklySlotsError }) => ({ weeklySlots, weeklySlotsError })

const mapDispatchToProps = {
  getWeeklySlots
}

export default connect(mapStateToProps, mapDispatchToProps)(App)