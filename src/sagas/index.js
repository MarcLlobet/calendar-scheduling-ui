import { all, put, takeEvery } from 'redux-saga/effects';

import {
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR
} from '../constants'

const api = 'unlloc' // 'https://draliatest.azurewebsites.net/api/availability'

export function* GetWeeklySlots(action) {
  const a = 1
  try {
    const { date } = action,
      // dateParam = Moment(date).format('yyyyMMDD'),
      endpoint = `${api}/GetWeeklySlots/${date}`;

    const weeklySlots = yield fetch(endpoint)
      .then(response => response.json())

    yield put({ type: WEEKLY_SLOTS_RECEIVED, weeklySlots })

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

export function* actionWatcher() {
  yield takeEvery(GET_WEEKLY_SLOTS, GetWeeklySlots)
  yield takeEvery(BOOK_SLOT, BookSlot)
}

export default function* rootSaga() {
  yield all([actionWatcher()])
}