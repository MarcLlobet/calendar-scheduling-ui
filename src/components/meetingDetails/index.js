import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import lightGreen from '@material-ui/core/colors/lightGreen';

import Paper from '@material-ui/core/Paper';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import LocationIcon from '@material-ui/icons/LocationOn';
import AgendaIcon from '@material-ui/icons/DateRange';


import Button from '@material-ui/core/Button';

import { LONG_DATE } from '../../constants'


function MeetingDetails({ professional, appointment, location }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.gridItem}>
        <Paper>


          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Profesional"
                secondary={professional}
              />
            </ListItem>
            <ListItem className={classes['listItem--active']}>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <AgendaIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Fecha de la cita"
                secondary={moment(appointment).format(LONG_DATE)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <LocationIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Instalación"
                secondary={location}
              />
            </ListItem>
          </List>


        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Button variant="contained" className={classes.confirmButton}>Confirmar cita</Button>
      </Grid>
    </>
  )
}


const mapStateToProps = ({ professional, appointment, location }) => ({
  professional,
  appointment,
  location
})

const mapDispatchToProps = {
  // confirmar cita
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetails)



const useStyles = makeStyles((theme) => ({
  avatarIcon: {
    color: grey[400],
    backgroundColor: 'transparent'
  },
  'listItem--active': {
    backgroundColor: blue[50],
    '& .MuiSvgIcon-root': {
      color: blue[500]
    }
  },
  confirmButton: {
    marginTop: theme.spacing(2),
    backgroundColor: lightGreen[800],
    color: 'white',
    textTransform: 'none'
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      color: grey[500]
    },
    '& .MuiListItemText-secondary': {
      color: 'black'
    }
  }
}));