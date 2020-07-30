import Reducer from './'

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


const state = { data: true }

test('GET_INITIAL_DATA', () => {
  expect(Reducer(state, { type: GET_INITIAL_DATA }))
    .toEqual(expect.objectContaining(state))
})

test('INITIAL_DATA', () => {
  expect(Reducer(state, { type: INITIAL_DATA }))
    .toEqual(expect.objectContaining(state))
})

test('GET_WEEKLY_SLOTS', () => {
  expect(Reducer(state, { type: GET_WEEKLY_SLOTS }))
    .toEqual(expect.objectContaining(state))
})

test('WEEKLY_SLOTS_RECEIVED', () => {
  expect(Reducer(state, { type: WEEKLY_SLOTS_RECEIVED }))
    .toEqual(expect.objectContaining(state))
})

test('WEEKLY_SLOTS_ERROR', () => {
  expect(Reducer(state, { type: WEEKLY_SLOTS_ERROR }))
    .toEqual(expect.objectContaining(state))
})

test('BOOK_SLOT', () => {
  expect(Reducer(state, { type: BOOK_SLOT }))
    .toEqual(expect.objectContaining(state))
})

test('BOOK_SLOT_SUCCESSFUL', () => {
  expect(Reducer(state, { type: BOOK_SLOT_SUCCESSFUL }))
    .toEqual(expect.objectContaining(state))
})

test('BOOK_SLOT_ERROR', () => {
  expect(Reducer(state, { type: BOOK_SLOT_ERROR }))
    .toEqual(expect.objectContaining(state))
})

test('GET_SELECTED_WEEK', () => {
  expect(Reducer(state, { type: GET_SELECTED_WEEK }))
    .toEqual(expect.objectContaining(state))
})

test('SELECTED_WEEK', () => {
  expect(Reducer(state, { type: SELECTED_WEEK }))
    .toEqual(expect.objectContaining(state))
})

test('HANDLE_MODAL', () => {
  expect(Reducer(state, { type: HANDLE_MODAL }))
    .toEqual(expect.objectContaining(state))
})
