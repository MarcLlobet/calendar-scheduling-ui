// import 'jest-dom/extend-expect'
import {
  getInitialData,
  getWeeklySlots,
  weeklySlotsReceived,
  weeklySlotsError,
  bookSlot,
  bookSlotSuccessful,
  bookSlotError,
  getSelectedWeek,
  handleModal
} from './'

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



test('getInitialData', () => {
  expect(getInitialData()).toHaveProperty('type')
  expect(getInitialData().type)
    .toEqual(expect.stringContaining(GET_INITIAL_DATA))
})

test('getWeeklySlots', () => {
  expect(getWeeklySlots({})).toHaveProperty('type')
  expect(getWeeklySlots({}).type)
    .toEqual(expect.stringContaining(GET_WEEKLY_SLOTS))
})

test('weeklySlotsReceived', () => {
  expect(weeklySlotsReceived({})).toHaveProperty('type')
  expect(weeklySlotsReceived({}).type)
    .toEqual(expect.stringContaining(WEEKLY_SLOTS_RECEIVED))
})

test('weeklySlotsError', () => {
  expect(weeklySlotsError()).toHaveProperty('type')
  expect(weeklySlotsError().type)
    .toEqual(expect.stringContaining(WEEKLY_SLOTS_ERROR))
})

test('bookSlot', () => {
  expect(bookSlot()).toHaveProperty('type')
  expect(bookSlot().type)
    .toEqual(expect.stringContaining(BOOK_SLOT))
})

test('bookSlotSuccessful', () => {
  expect(bookSlotSuccessful()).toHaveProperty('type')
  expect(bookSlotSuccessful().type)
    .toEqual(expect.stringContaining(BOOK_SLOT_SUCCESSFUL))
})

test('bookSlotError', () => {
  expect(bookSlotError()).toHaveProperty('type')
  expect(bookSlotError().type)
    .toEqual(expect.stringContaining(BOOK_SLOT_ERROR))
})

test('getSelectedWeek', () => {
  expect(getSelectedWeek()).toHaveProperty('type')
  expect(getSelectedWeek().type)
    .toEqual(expect.stringContaining(GET_SELECTED_WEEK))
})

test('handleModal', () => {
  expect(handleModal()).toHaveProperty('type')
  expect(handleModal().type)
    .toEqual(expect.stringContaining(HANDLE_MODAL))
})

