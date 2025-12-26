import React from 'react'
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

function Footer() {

  const classes = useStyles()

  return (
    <>
      <Grid item xs={12} className={classes.footer__logo}>
      </Grid>
      <Grid item sm={12} md={8} lg={6} className={classes.footer__text}>
        <p>2019 - ¡Reserva cita sin necesidad de llamar!</p>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <p>Utilizamos cookies propias y de terceros para mejorar nuestra servicio. Puede configurar el acceso a dichas cookies desde su navegador u obtener más información en nuestras <a href="#">condiciones generales</a>.</p>
      </Grid>
    </>
  )
}

export default Footer


const useStyles = makeStyles((theme) => ({
  footer__logo: {
    textAlign: 'center',
    color: 'white',
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
    backgroundColor: '#00bb9c'
  },
  footer__text: {
    color: grey[500]
  }
}))