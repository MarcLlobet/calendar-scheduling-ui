import { loadState, saveState } from './'

import { STATE } from '../constants'

import { act } from 'react-dom/test-utils'

test('loadState', () => {
  act(() => loadState())
  expect(localStorage.getItem).toHaveBeenLastCalledWith(STATE)
})

test('saveState', () => {
  const mockObject = { abc: 123 }
  act(() => saveState(mockObject))
  expect(localStorage.setItem)
    .toHaveBeenLastCalledWith(STATE, JSON.stringify(mockObject))
})

test('saveState', () => {
  const mockObject = { abc: 123 }
  act(() => saveState(mockObject))
  expect(localStorage.__STORE__[STATE])
    .toEqual(JSON.stringify(mockObject))
})