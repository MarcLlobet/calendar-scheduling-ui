import {
  InitialData,
  GetWeeklySlots,
  BookSlot,
  GetIntervalWeek,
  getSlotsByDay
} from './'

import { put } from 'redux-saga/effects'

import moment from 'moment'

import {
  INITIAL_DATA,
  WEEKLY_SLOTS_RECEIVED,
  WEEKLY_SLOTS_ERROR,
  SELECTED_WEEK,
  INVERSED_DATE
} from '../constants'


beforeEach(() => {
  fetch.resetMocks();
});

test('InitialData', () => {
  const generator = InitialData()
  expect(generator.next().value)
    .toEqual(
      put({
        type: INITIAL_DATA,
        professional: 'Simon Molas Ramos',
        appointment: '20171001T09',
        location: "Ps. de l'Estació, 12 (bajos) 43800 Valls Tarragona"
      })
    )
})

const api = 'https://draliatest.azurewebsites.net/api/availability'


test('GetWeeklySlots endpoint', () => {
  const randomWeek = 25,
    generator = GetWeeklySlots({ week: randomWeek }),
    monday = moment().week(randomWeek).day(1).format(INVERSED_DATE),
    endpoint = `${api}/GetWeeklySlots/${monday}`

  fetch.once()

  generator.next()

  expect(fetch).toHaveBeenCalledWith(endpoint)
})

test('GetWeeklySlots no data error', () => {
  const generator = GetWeeklySlots({})
  expect(generator.next().value).toEqual(
    put({
      type: WEEKLY_SLOTS_ERROR,
      weeklySlotsError: Error('bad Api call: date is undefined')
    })
  )
})

test('GetWeeklySlots api reject', () => {
  const randomWeek = 25,
    generator = GetWeeklySlots({ week: randomWeek })

  fetch.mockRejectOnce()
  generator.next()
  expect(generator.next().value).toEqual(
    put({
      type: WEEKLY_SLOTS_RECEIVED,
      weeklySlots: { [randomWeek]: {} }
    })
  )
})


test('getSlotsByDay', () => {
  const mockApiResponse = [
    { Start: "2020-07-27T09:00:00", End: "2020-07-27T09:10:00" },
    { Start: "2020-07-27T09:10:00", End: "2020-07-27T09:20:00" },
    { Start: "2020-08-03T09:00:00", End: "2020-08-03T09:10:00" },
    { Start: "2020-08-03T09:10:00", End: "2020-08-03T09:20:00" },
    { Start: "2020-08-05T09:00:00", End: "2020-08-05T09:10:00" },
    { Start: "2020-08-05T09:10:00", End: "2020-08-05T09:20:00" }
  ]

  const dailySlots = {
    20200727: [
      { Start: "2020-07-27T09:00:00", End: "2020-07-27T09:10:00" },
      { Start: "2020-07-27T09:10:00", End: "2020-07-27T09:20:00" }
    ],
    20200803: [
      { Start: "2020-08-03T09:00:00", End: "2020-08-03T09:10:00" },
      { Start: "2020-08-03T09:10:00", End: "2020-08-03T09:20:00" }
    ],
    20200805: [
      { Start: "2020-08-05T09:00:00", End: "2020-08-05T09:10:00" },
      { Start: "2020-08-05T09:10:00", End: "2020-08-05T09:20:00" }
    ]
  }

  expect(getSlotsByDay(mockApiResponse)).toEqual(dailySlots)
})


test('BookSlot endpoint', () => {
  const extraData = {
    Patient: {
      Name: 'Mario',
      SecondName: 'Neta',
      Email: 'mario@myspace.es',
      Phone: '555 44 33 22'
    },
    Comments: 'my arm hurts a lot'
  },
    params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(extraData)
    },
    generator = BookSlot({}),
    endpoint = `${api}/BookSlot`

  fetch.once()

  generator.next()

  expect(fetch).toHaveBeenCalledWith(endpoint, params)
})


test('GetIntervalWeek', () => {
  const randomWeek = 20,
    generator = GetIntervalWeek({ selectedWeek: randomWeek })

  expect(generator.next().value).toEqual(
    put({
      type: SELECTED_WEEK,
      selectedWeek: randomWeek
    })
  )
})

