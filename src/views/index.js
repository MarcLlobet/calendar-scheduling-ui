import React from 'react'
// import { connect } from 'react-redux'

import Home from './Home'
import BookingFeedback from './BookingFeedback'

const BookingOk = BookingFeedback

const BookingKo = BookingFeedback

const NotFound = () => <h3>404</h3>

// const User = ({ userId }) => <h3>{`User ${userId}`}</h3>
// const mapStateToProps = ({ location }) => ({
//   userId: location.payload.id
// })
// const ConnectedUser = connect(mapStateToProps)(User)



export { Home, BookingOk, BookingKo, NotFound }