import React from 'react'
import configureStore from 'redux-mock-store'
import TestRenderer, { act } from 'react-test-renderer';

import { Provider } from 'react-redux'
import Calendar from './'

const defaultState = {
  selectedWeek: 50,
  weeklySlots: {
    50: {
      20201207: [
        { Start: "2020-12-07T09:00:00", End: "2020-12-07T09:10:00" }
      ],
      20201210: [
        { Start: "2020-12-10T10:00:00", End: "2020-12-10T10:10:00" }
      ]
    },
    51: {
      20201214: [
        { Start: "2020-12-14T11:00:00", End: "2020-12-14T11:10:00" }
      ]
    }
  }
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
      <Calendar />
    </Provider>
  )
}

const countSlots = component => {
  const slots = component.root.findAllByProps({ variant: 'contained' })
    .reduce((prev, slot) => ({
      ...prev,
      ...(prev[slot.props.children]
        ? { [slot.props.children]: [...prev[slot.props.children], slot] }
        : { [slot.props.children]: [slot] }
      )
    }), {})

  return Object.keys(slots)

}


test('Calendar is rendering slots of the selected week', () => {
  const component = createComponent(),
    slots = countSlots(component),
    slotsLength = Object
      .values(defaultState.weeklySlots[defaultState.selectedWeek])
      .reduce((prev, daySlots) => prev + Object.keys(daySlots).length, 0)


  expect(slots).toHaveLength(slotsLength)
})

describe('Calendar and show more button', () => {
  const
    day = 20201207,
    getState = (slot = []) => ({
      weeklySlots: {
        50: {
          [day]: [
            { Start: "2020-12-07T09:00:00", End: "2020-12-07T09:10:00" },
            { Start: "2020-12-07T10:00:00", End: "2020-12-07T10:10:00" },
            { Start: "2020-12-07T11:00:00", End: "2020-12-07T11:10:00" },
            { Start: "2020-12-07T12:00:00", End: "2020-12-07T12:10:00" },
            { Start: "2020-12-07T13:00:00", End: "2020-12-07T13:10:00" },
            { Start: "2020-12-07T14:00:00", End: "2020-12-07T14:10:00" },
            { Start: "2020-12-07T15:00:00", End: "2020-12-07T15:10:00" },
            ...slot
          ]
        }
      }
    })


  test('is not rendered if day slots are less than 8', () => {
    const state = getState(),
      component = createComponent(state),
      slots = countSlots(component),
      slotsLength = Object
        .values(state.weeklySlots[defaultState.selectedWeek])
        .reduce((prev, slots) => prev + Object.keys(slots).length, 0)


    expect(slots).toHaveLength(slotsLength)
  })

  test('is rendered if day slots are 8 or more', () => {
    const state = getState([
      { Start: "2020-12-07T16:00:00", End: "2020-12-07T16:10:00" },
      { Start: "2020-12-07T17:00:00", End: "2020-12-07T17:10:00" }
    ]),
      visibleSlots = 7

    const component = createComponent(state),
      slots = countSlots(component)

    expect(slots).toHaveLength(visibleSlots + 1)

    const buttons = component.root.findAllByProps({ variant: 'contained' }),
      [lastButton] = buttons.slice(-1),
      showMore = lastButton.props.children.props.children

    expect(showMore).toEqual(['Ver ', 'más', ' horas'])
  })


  test('if cliked shows "show less"', () => {
    const state = getState([
      { Start: "2020-12-07T16:00:00", End: "2020-12-07T16:10:00" },
      { Start: "2020-12-07T17:00:00", End: "2020-12-07T17:10:00" }
    ])

    const component = createComponent(state),
      buttons = component.root.findAllByProps({ variant: 'contained' }),
      [lastButton] = buttons.slice(-1)

    act(() => lastButton.props.onClick())

    const showLess = lastButton.props.children.props.children

    expect(showLess).toEqual(['Ver ', 'menos', ' horas'])
  })
})