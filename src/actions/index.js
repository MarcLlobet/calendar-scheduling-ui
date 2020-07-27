import {
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR
} from '../constants'

export const getWeeklySlots = todaysDate => ({
  type: GET_WEEKLY_SLOTS,
  date: todaysDate
})

export const weeklySlotsReceived = ({ weeklySlots }) => ({
  type: WEEKLY_SLOTS_RECEIVED,
  weeklySlots
})

export const weeklySlotsError = param => ({
  type: WEEKLY_SLOTS_ERROR,
  param
})

export const bookSlot = param => ({
  type: BOOK_SLOT,
  param
})

export const bookSlotSuccessful = param => ({
  type: BOOK_SLOT_SUCCESSFUL,
  param
})

export const bookSlotError = param => ({
  type: BOOK_SLOT_ERROR,
  param
})