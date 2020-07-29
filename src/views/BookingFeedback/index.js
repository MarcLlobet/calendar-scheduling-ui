import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Cancel';



function BookingFeedback({
  bookSlot,
  bookSlotError,
  professional,
  appointment,
  location
}) {
  const classes = useStyles()

  const isSuccessful = !!bookSlot
    ? '¡Cita modificada correctamente!'
    : 'Ha ocurrido un error'

  return (
    <div className={[
      classes.card,
      isSuccessful
        ? classes.cardSuccess
        : classes.cardError
    ].join(' ')}>
      <Paper>
        <Grid item xs={12} className={classes.gridItem}>
          <div className={classes.icon}>
            {isSuccessful
              ? <CheckIcon />
              : <ErrorIcon />
            }
          </div>

          <Typography variant="h5" component="h3">
            <b>{isSuccessful
              ? '¡Cita modificada correctamente!'
              : 'Ha ocurrido un error'
            }</b>
          </Typography>
          {isSuccessful
            ? (
              <div className={classes.body}>
                <Typography variant="body" component="p">
                  <b>{professional}</b>
                </Typography>
                <Typography variant="body" component="p">
                  <s>{moment(appointment).format('dddd[,] D [de] MMMM [de] YYYY[,] H:mm')}</s>
                </Typography>
                <Typography variant="body" component="p">
                  <b>{moment(bookSlot.data.Start).format('dddd[,] D [de] MMMM [de] YYYY[,] H:mm')}</b>
                </Typography>
                <Typography variant="body" component="p">
                  {location}
                </Typography>
              </div>
            )
            : bookSlotError}
        </Grid>
      </Paper>
    </div>
  )
}

const mapStateToProps = ({
  bookSlot,
  bookSlotError,
  professional,
  appointment,
  location
}) => ({
  bookSlot,
  bookSlotError,
  professional,
  appointment,
  location
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BookingFeedback)

const iconPadding = `${80 * 100 / 96}%`

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(5),
    position: 'relative',
    textAlign: 'center',
    '& .MuiGrid-item': {
      paddingTop: 160
    },
    '&:before': {
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: 100,
      position: 'absolute',
      content: '""',
    }
  },
  cardSuccess: {
    '&:before': {
      backgroundColor: green[100]
    },
    '& .MuiSvgIcon-root': {
      fill: green[600]
    }
  },
  cardError: {
    '&:before': {
      backgroundColor: red[100]
    },
    '& .MuiSvgIcon-root': {
      fill: red[600]
    }
  },
  icon: {
    position: 'absolute',
    margin: 'auto',
    marginTop: -48,
    top: 100,
    left: 0,
    right: 0,
    width: 96,
    height: 96,
    zIndex: 0,
    '& .MuiSvgIcon-root': {
      height: '100%',
      width: '100%'
    },
    '&:before': {
      content: '""',
      width: iconPadding,
      height: iconPadding,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      borderRadius: '50%',
      backgroundColor: 'white',
      position: 'absolute',
      zIndex: -1
    }
  },
  gridItem: {
    padding: theme.spacing(2)
  },
  body: {
    '& .MuiTypography-root:first-letter': {
      textTransform: 'capitalize'
    }
  }
}))