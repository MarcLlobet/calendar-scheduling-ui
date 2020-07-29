import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import moment from 'moment'

import {
  GET_INITIAL_DATA,
  INITIAL_DATA,
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR,
  SELECTED_WEEK,
  GET_SELECTED_WEEK,
  INVERSED_DATE
} from '../constants'

export function* InitialData() {
  yield put({
    type: INITIAL_DATA,
    professional: 'Simon Molas Ramos',
    appointment: '20171001T09',
    location: "Ps. de l'Estació, 12 (bajos) 43800 Valls Tarragona"
  })
}

const api = 'https://draliatest.azurewebsites.net/api/availability'

const getSlotsByDay = weeklySlots =>
  weeklySlots.reduce((prev, slot) => {
    const day = moment(slot.Start).format(INVERSED_DATE)
    return {
      ...prev,
      ...(prev[day]
        ? { [day]: [...prev[day], slot] }
        : { [day]: [slot] }
      )
    }
  }, {})

export function* GetWeeklySlots(action) {
  try {
    const { week, weeklySlots } = action
    if (!week) throw new Error('bad Api call: date is undefined')

    const monday = moment().week(week).day(1).format(INVERSED_DATE)

    const endpoint = `${api}/GetWeeklySlots/${monday}`,
      apiResponse = yield fetch(endpoint)
        .then(response => response.json())

    const slotsByDay = getSlotsByDay(apiResponse)

    yield put({
      type: WEEKLY_SLOTS_RECEIVED,
      weeklySlots: { ...weeklySlots, [week]: slotsByDay }
    })

  } catch (weeklySlotsError) {
    yield put({ type: WEEKLY_SLOTS_ERROR, weeklySlotsError })
  }
}

export function* BookSlot({ slot }) {
  const extraData = {
    Patient: {
      Name: 'Mario',
      SecondName: 'Neta',
      Email: 'mario@myspace.es',
      Phone: '555 44 33 22'
    },
    Comments: 'my arm hurts a lot'
  },
    data = { ...slot, ...extraData },
    body = JSON.stringify(data)

  try {
    const endpoint = `${api}/BookSlot`,
      apiResponse = yield fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body
      })
        .then(response => response)

    // apiResponse: {
    //   body: ReadableStream
    //   bodyUsed: false
    //   headers: Headers {}
    //   ok: true
    //   redirected: false
    //   status: 200
    //   statusText: "OK"
    //   type: "cors"
    //   url: "https://draliatest.azurewebsites.net/api/availability/BookSlot"
    // }

    yield put({
      type: BOOK_SLOT_SUCCESSFUL,
      bookSlot: {
        data,
        response: apiResponse
      }
    })

  } catch (error) {
    yield put({
      type: BOOK_SLOT_ERROR,
      bookSlotError: {
        data,
        error
      }
    })
  }
}

export function* GetIntervalWeek({ selectedWeek }) {
  yield put({
    type: SELECTED_WEEK,
    selectedWeek: moment().week(selectedWeek)
  })
}


export function* actionWatcher() {
  yield takeLatest(GET_INITIAL_DATA, InitialData)
  yield takeEvery(GET_WEEKLY_SLOTS, GetWeeklySlots)
  yield takeEvery(GET_SELECTED_WEEK, GetIntervalWeek)
  yield takeEvery(BOOK_SLOT, BookSlot)
}

export default function* rootSaga() {
  yield all([actionWatcher()])
}