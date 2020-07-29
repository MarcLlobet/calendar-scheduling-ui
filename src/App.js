import React from 'react';
import { connect } from 'react-redux'

import Home from './views/Home'
import BookingFeedback from './views/BookingFeedback'
import Footer from './components/footer'

import Grid from '@material-ui/core/Grid';

function App({ bookSlot, bookSlotError }) {
  const Main = () => {
    if (bookSlot || bookSlotError)
      return <BookingFeedback />
    return <Home />
  }

  return (
    <Grid container spacing={3} justify="center">
      <Grid item sm={12} md={8} lg={6}>
        <Main />
      </Grid>
      <Footer />
    </Grid>
  )
}


const mapStateToProps = ({
  bookSlot,
  bookSlotError
}) => ({
  bookSlot,
  bookSlotError
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)