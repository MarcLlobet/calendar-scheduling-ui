import {
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR,
  GET_SELECTED_WEEK,
  SELECTED_WEEK
} from '../constants'

const Reducer = (state = {}, action) => {

  switch (action.type) {
    case GET_WEEKLY_SLOTS:
      return { ...state, loadingWeeklySlots: true }

    case WEEKLY_SLOTS_RECEIVED: {
      const { loadingWeeklySlots, weeklySlotsError, ...rest } = state

      return { ...rest, weeklySlots: action.weeklySlots }
    }

    case WEEKLY_SLOTS_ERROR: {
      const { loadingWeeklySlots, ...rest } = state
      const { weeklySlotsError } = action

      return { ...rest, weeklySlotsError }
    }


    case BOOK_SLOT:
      return { ...state, loadingBookSlot: true }

    case BOOK_SLOT_SUCCESSFUL: {
      const { loadingBookSlot, bookSlotError, ...rest } = state
      const { bookSlot } = action

      return { ...rest, bookSlot }
    }

    case BOOK_SLOT_ERROR: {
      const { loadingBookSlot, ...rest } = state
      const { bookSlotError } = action

      return { ...rest, bookSlotError }
    }


    case GET_SELECTED_WEEK:
      return { ...state, loadingIntervalWeek: action.date }

    case SELECTED_WEEK: {
      const { loadingIntervalWeek, ...rest } = state

      return { ...rest, selectedWeek: loadingIntervalWeek }
    }

    default:
      return state
  }
}

export default Reducer