import { all, put, call, takeEvery } from 'redux-saga/effects';
import moment from 'moment'

import {
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR,
  SELECTED_WEEK,
  GET_SELECTED_WEEK
} from '../constants'

const api = 'https://draliatest.azurewebsites.net/api/availability'

export function* GetWeeklySlots(action) {
  try {
    const { week, weeklySlots } = action
    if (!week) throw new Error('bad Api call: date is undefined')

    const monday = moment().week(week).day(1).format('YYYYMMDD')

    const endpoint = `${api}/GetWeeklySlots/${monday}`,
      apiResponse = yield fetch(endpoint)
        .then(response => response.json())

    const slotsByDay = apiResponse.reduce((prev, slot) => {
      const day = moment(slot.Start).format('YYYYMMDD')
      return {
        ...prev,
        ...(prev[day]
          ? { [day]: [...prev[day], slot] }
          : { [day]: [slot] }
        )
      }
    }, {})

    yield put({
      type: WEEKLY_SLOTS_RECEIVED,
      weeklySlots: { ...weeklySlots, [week]: slotsByDay }
    })

  } catch (weeklySlotsError) {
    yield put({ type: WEEKLY_SLOTS_ERROR, weeklySlotsError })
  }
}

export function* BookSlot(payload) {
  try {
    const endpoint = `${api}/BookSlot`,
      bookSlot = yield fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())

    yield put({ type: BOOK_SLOT_SUCCESSFUL, bookSlot })

  } catch (bookSlotError) {
    yield put({ type: BOOK_SLOT_ERROR, bookSlotError })
  }
}

export function* GetIntervalWeek({ selectedWeek }) {
  yield put({
    type: SELECTED_WEEK,
    selectedWeek: moment().week(selectedWeek)
  })
}


export function* actionWatcher() {
  yield takeEvery(GET_WEEKLY_SLOTS, GetWeeklySlots)
  yield takeEvery(BOOK_SLOT, BookSlot)
  yield takeEvery(GET_SELECTED_WEEK, GetIntervalWeek)
}

export default function* rootSaga() {
  yield all([actionWatcher()])
}