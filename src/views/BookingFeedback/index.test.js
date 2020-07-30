import React from 'react'
import configureStore from 'redux-mock-store'
import TestRenderer from 'react-test-renderer';

import { Provider } from 'react-redux'
import BookingFeedback from './'

const defaultState = {
  professional: 'Jo',
  appointment: '20000612',
  location: 'Aqui',
  bookSlot: { data: { Start: '20400612' } }
}

const createComponent = (state = {}) => {


  const initialState = {
    ...defaultState,
    ...state
  }

  const mockStore = configureStore()
  const store = mockStore(initialState)

  return TestRenderer.create(
    <Provider store={store}>
      <BookingFeedback />
    </Provider>
  )
}

test('BookingFeedback is rendering successful state', () => {
  const card = createComponent().root.findByType('div')

  expect(card.props.className).toEqual(expect.stringContaining('cardSuccess'))
})

test('BookingFeedback is rendering the title', () => {
  const h3 = createComponent().root.findByType('h3'),
    [b] = h3.children,
    [title] = b.children

  expect(title).toEqual('¡Cita modificada correctamente!')
})

test("BookingFeedback's state comes from store", () => {
  const card = createComponent()

  expect(card.root.props.store.getState()).toEqual(defaultState)
})

test("BookingFeedback's state gets updated", () => {
  const newBookSlotState = { bookSlot: undefined }
  const card = createComponent(newBookSlotState)

  expect(card.root.props.store.getState()).toEqual({
    ...defaultState,
    ...newBookSlotState
  })
})