import {
  GET_INITIAL_DATA,
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR,
  GET_SELECTED_WEEK,
  HANDLE_MODAL
} from '../constants'

export const getInitialData = () => ({
  type: GET_INITIAL_DATA
})

export const getWeeklySlots = ({ week, weeklySlots }) => ({
  type: GET_WEEKLY_SLOTS,
  week,
  weeklySlots
})

export const weeklySlotsReceived = ({ weeklySlots }) => ({
  type: WEEKLY_SLOTS_RECEIVED,
  weeklySlots
})

export const weeklySlotsError = param => ({
  type: WEEKLY_SLOTS_ERROR,
  param
})

export const bookSlot = slot => ({
  type: BOOK_SLOT,
  slot
})

export const bookSlotSuccessful = param => ({
  type: BOOK_SLOT_SUCCESSFUL,
  param
})

export const bookSlotError = param => ({
  type: BOOK_SLOT_ERROR,
  param
})

export const getSelectedWeek = date => ({
  type: GET_SELECTED_WEEK,
  date
})

export const handleModal = slot => ({
  type: HANDLE_MODAL,
  isModalOpen: slot
})
