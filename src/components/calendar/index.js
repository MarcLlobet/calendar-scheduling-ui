import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

import LeftArrow from '@material-ui/icons/ArrowBackIos';
import RightArrow from '@material-ui/icons/ArrowForwardIos';

import { getWeeklySlots, getSelectedWeek } from '../../actions'

function Calendar({
  weeklySlots = {},
  weeklySlotsError,
  getWeeklySlots,
  selectedWeek = moment().week(),
  getSelectedWeek
}) {

  const classes = useStyles();

  useEffect(() => {
    getWeeklySlots({ week: selectedWeek, weeklySlots })
  }, [])

  const buildSlot = children => (
    <Button variant="contained" className={classes.slot}>
      {children}
    </Button>
  )

  const getDaySlots = (selectedWeek, date) => {
    if (
      !(selectedWeek in weeklySlots)
      || !Array.isArray(weeklySlots[selectedWeek][date])
    )
      return null

    const selectedSlots = weeklySlots[selectedWeek][date]

    if (selectedSlots.length <= 8)
      return selectedSlots.map(slot =>
        buildSlot(moment(slot.Start).format('HH:mm'))
      )

    const showMoreButton = (
      <div className={classes.slot}>Ver más horas</div>
    )

    return [

      ...Array(8).fill().map((_, index) => (
        buildSlot(moment(selectedSlots[index].Start).format('HH:mm')))
      ),
      <Button variant="contained" className={classes.slot}>
        {showMoreButton}
      </Button>
    ]

  }


  const agenda = moment.weekdays(true).map((weekDay, index) => {
    const day = moment().week(selectedWeek).day(index + 1)

    const date = moment(day).format('YYYYMMDD'),
      dayMonth = day.format('DD MMM')

    return (
      <div key={date} className={classes.day}>
        <div className={classes.headerCell}>
          <div className={classes.headerCell__weekDay}>{weekDay}</div>
          <div className={classes.headerCell__dayMonth}>{dayMonth}</div>
        </div>
        <div className={classes.bodyCell}>
          {getDaySlots(selectedWeek, date)}
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
        : <div />
      }
      <div>
        <span>{moment().week(selectedWeek).day(1).format('DD/MM/YYYY')}</span>
        <span> - </span>
        <span>{moment().week(selectedWeek).day(7).format('DD/MM/YYYY')}</span>
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
  getSelectedWeek
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)


const useStyles = makeStyles((theme) => ({
  calendar: {
    display: 'flex',
    flexDirection: 'column',
  },
  weekInterval: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  agenda: {
    display: 'flex',
    flexDirection: 'row',
  },
  day: {
    display: 'flex',
    flexDirection: 'column',
    width: '1fr',
    flexBasis: 70,
    flexShrink: 0,
    flexGrow: 1
  },
  headerCell: {
    textAlign: 'center',
    borderTop: `1px solid ${grey[200]}`,
    borderBottom: `1px solid ${grey[200]}`
  },
  headerCell__weekDay: {
    fontWeight: 'bold'
  },
  headerCell__dayMonth: {
    color: 'grey'
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
    }
  }
}))