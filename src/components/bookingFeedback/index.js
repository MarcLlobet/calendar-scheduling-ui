import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Cancel';



function BookingFeedback() {
  const classes = useStyles()
  const isSuccessFul = true
  return (
    <Grid container spacing={3} justify="center">
      <Grid
        item
        sm={12}
        md={8}
        lg={6}
        className={[
          classes.card,
          isSuccessFul
            ? classes.cardSuccess
            : classes.cardError
        ].join(' ')}
      >
        <Paper>
          <Grid item xs={12} className={classes.gridItem}>
            <div className={classes.icon}>
              {isSuccessFul
                ? <CheckIcon />
                : <ErrorIcon />
              }
            </div>

            <Typography variant="h5" component="h3">
              <b>{
                isSuccessFul
                  ? '¡Cita modificada correctamente!'
                  : 'Ha ocurrido un error'
              }</b>
            </Typography>

          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default BookingFeedback

const padding = 12,
  iconPadding = `${80 * 100 / 96}%`

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    textAlign: 'center',
    '& .MuiGrid-item': {
      paddingTop: 160
    },
    '&:before': {
      position: 'absolute',
      top: padding,
      left: padding,
      right: padding,
      content: '""',
      height: 92,
      width: `calc(100% - ${padding * 2}px)`,
      backgroundColor: 'grey'
    },
    '&$cardSuccess': {
      '&:before': {
        backgroundColor: green[100]
      }
    },
    '&$cardError': {
      '&:before': {
        backgroundColor: red[100]
      }
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
  }
}))