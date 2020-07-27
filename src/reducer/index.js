import {
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR
} from '../constants'

const Reducer = (state = {}, action) => {

  switch (action.type) {
    case GET_WEEKLY_SLOTS:
      return { ...state, loadingWeeklySlots: true }
    case WEEKLY_SLOTS_RECEIVED:
      return { ...state, loadingWeeklySlots: false, weeklySlots: action.weeklySlots }
    case WEEKLY_SLOTS_ERROR:
      return { ...state, loadingWeeklySlots: false, weeklySlotsError: action.weeklySlotsError }


    case BOOK_SLOT:
      return { ...state, loadingBookSlot: true }
    case BOOK_SLOT_SUCCESSFUL:
      return { ...state, loadingBookSlot: false, bookSlot: action.bookSlot }
    case BOOK_SLOT_ERROR:
      return { ...state, loadingBookSlot: false, bookSlotError: action.bookSlotError }


    default:
      return state
  }
}

export default Reducer