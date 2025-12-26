import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

import LeftArrow from '@material-ui/icons/ArrowBackIos';
import RightArrow from '@material-ui/icons/ArrowForwardIos';

import { getWeeklySlots, getSelectedWeek, bookSlot, handleModal } from '../../actions'
import {
  HOUR_MINUTE,
  INVERSED_DATE,
  SLASHED_DATE,
  DAY_LONGMONTH
} from '../../constants'

function Calendar({
  weeklySlots = {},
  weeklySlotsError,
  getWeeklySlots,
  selectedWeek = moment().week(),
  getSelectedWeek,
  bookSlot,
  handleModal
}) {

  const classes = useStyles();

  useEffect(() => {
    getWeeklySlots({ week: selectedWeek, weeklySlots })
  }, [getWeeklySlots, selectedWeek, weeklySlots])


  const initialShowMoreSlots = selectedWeek in weeklySlots
    ? Object.keys(weeklySlots[selectedWeek]).reduce((prev, day) => ({ ...prev, [day]: false }), {})
    : {}

  const [showMoreSlots, toggleShowSlots] = useState(initialShowMoreSlots)

  const getDaySlots = (selectedWeek, date) => {
    if (
      !(selectedWeek in weeklySlots)
      || !Array.isArray(weeklySlots[selectedWeek][date])
    ) return null

    const selectedSlots = weeklySlots[selectedWeek][date],
      visibleSlots = 7,
      slots = [...(showMoreSlots[date]
        ? selectedSlots
        : selectedSlots.slice(0, visibleSlots)
      )].map(slot =>
        (<Button
          key={slot.Start}
          variant="contained"
          disabled={slot.Taken}
          onClick={() => slot.Taken ? {} : handleModal(slot)}
        >
          {moment(slot.Start).format(HOUR_MINUTE)}
        </Button>)
      ),
      toggleShowButton = (
        <Button
          key={`${selectedWeek}-${date}`}
          variant="contained"
          className={classes.slot}
          onClick={() =>
            toggleShowSlots({
              ...showMoreSlots,
              [date]: !showMoreSlots[date]
            })}>
          <div className={classes.slot}>
            Ver {showMoreSlots[date] ? 'menos' : 'más'} horas
          </div>
        </Button>
      )

    return [
      ...slots,
      selectedSlots.length > visibleSlots && toggleShowButton
    ]

  }


  const agenda = moment.weekdays(true).map((weekDay, index) => {
    const day = moment().week(selectedWeek).day(index + 1)

    const date = moment(day).format(INVERSED_DATE),
      today = moment().format(INVERSED_DATE),
      isPrevThanToday = date < today,
      dayMonth = day.format(DAY_LONGMONTH)

    return (
      <div
        key={date}
        className={[
          classes.day,
          isPrevThanToday ? classes.dayBlocked : ''
        ].join(' ')}
      >
        <div className={classes.headerCell}>
          <div className={classes.headerCell__weekDay}>{weekDay}</div>
          <div className={classes.headerCell__dayMonth}>{dayMonth}</div>
        </div>
        <div className={classes.bodyCell}>
          {!isPrevThanToday && getDaySlots(selectedWeek, date)
          }
        </div>
      </div>
    )
  })


  const shouldLeftIntervalBeShown = moment().week(selectedWeek).day(1).format() >= moment().format()

  const nextIntervalWeek = () => selectWeek(selectedWeek + 1)
  const prevIntervalWeek = () => selectWeek(selectedWeek - 1)

  const selectWeek = week => {
    getSelectedWeek(week)
    if (!(week in weeklySlots)) getWeeklySlots({ week, weeklySlots })
  }

  const weekInterval = (
    <>
      {shouldLeftIntervalBeShown
        ? (<Button onClick={() => prevIntervalWeek()}>
          <LeftArrow />
        </Button>)
        : <div style={{ width: 64 }} />
      }
      <div>
        <span>{moment().week(selectedWeek).day(1).format(SLASHED_DATE)}</span>
        <span> - </span>
        <span>{moment().week(selectedWeek).day(7).format(SLASHED_DATE)}</span>
      </div>
      <Button onClick={() => nextIntervalWeek()}><RightArrow /></Button>
    </>
  )


  const CalendarContainer = (
    <Paper>
      <div className={classes.calendar}>
        <div className={classes.weekInterval}>
          {weekInterval}
        </div>
        <div className={classes.agenda}>
          {agenda}
        </div>
      </div>
    </Paper>
  )
  return CalendarContainer
}


const mapStateToProps = ({ weeklySlots, weeklySlotsError, selectedWeek }) => ({
  weeklySlots,
  weeklySlotsError,
  selectedWeek
})

const mapDispatchToProps = {
  getWeeklySlots,
  getSelectedWeek,
  bookSlot,
  handleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)


const useStyles = makeStyles((theme) => ({
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.9em'
  },
  weekInterval: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  agenda: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 468
  },
  day: {
    display: 'flex',
    flexDirection: 'column',
    width: '1fr',
    flexBasis: 70,
    flexShrink: 0,
    flexGrow: 1,
  },
  dayBlocked: {
    '& $headerCell__weekDay': {
      color: grey[500],
      fontWeight: 'normal'
    },
    '& $headerCell__dayMonth': {},
    '& $bodyCell': {
      backgroundColor: grey[100]
    }
  },
  headerCell: {
    textAlign: 'center',
    borderTop: `1px solid ${grey[200]}`,
    borderBottom: `1px solid ${grey[200]}`,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  headerCell__weekDay: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  headerCell__dayMonth: {
    color: grey[500]
  },
  bodyCell: {
    flexGrow: 1,
    '& .MuiButton-root': {
      backgroundColor: blue[50],
      textDecoration: 'underline',
      color: blue[700],
      width: 'calc(100% - 10px)',
      margin: 5,
      textTransform: 'none',
    },
    '& .Mui-disabled': {
      backgroundColor: grey[300],
      color: grey[600]
    }
  }
}))