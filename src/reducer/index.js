import {
  GET_INITIAL_DATA,
  INITIAL_DATA,
  GET_WEEKLY_SLOTS,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  BOOK_SLOT,
  BOOK_SLOT_SUCCESSFUL,
  BOOK_SLOT_ERROR,
  GET_SELECTED_WEEK,
  SELECTED_WEEK,
  HANDLE_MODAL
} from '../constants'

const Reducer = (state = {}, action) => {

  switch (action.type) {
    case GET_INITIAL_DATA: {
      return { ...state, loadingInitialData: true }
    }
    case INITIAL_DATA: {
      const { loadingInitialData, ...restState } = state,
        { type, ...restAction } = action
      return { ...restState, ...restAction }
    }

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
      const { loadingBookSlot, bookSlot, ...rest } = state
      const { bookSlotError } = action

      return { ...rest, bookSlotError }
    }


    case GET_SELECTED_WEEK:
      return { ...state, loadingIntervalWeek: action.date }

    case SELECTED_WEEK: {
      const { loadingIntervalWeek, ...rest } = state

      return { ...rest, selectedWeek: loadingIntervalWeek }
    }

    case HANDLE_MODAL: {
      const { isModalOpen: slot } = action,
        { modalInfo, ...rest } = state,
        isModalOpen = !!slot

      return { ...rest, isModalOpen, ...(isModalOpen && { modalInfo: slot }) }
    }

    default:
      return state
  }
}

export default Reducer