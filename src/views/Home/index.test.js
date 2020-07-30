import React from 'react'
import configureStore from 'redux-mock-store'
import TestRenderer, { act } from 'react-test-renderer';

import { Provider } from 'react-redux'
import Home from './'


jest.mock('../../components/calendar', () => () => null)

const mockGetInitialData = jest.fn(),
  mockActions = {
    getInitialData: mockGetInitialData
  }

jest.doMock('../../actions', () => mockActions)


const initialState = {
  professional: 'Marc Llobet',
  getInitialData: mockActions.getInitialData
}
const mockStore = configureStore();
let wrapper;
let store;

beforeEach(() => {
  store = mockStore(initialState)
  wrapper = TestRenderer.create(<Provider store={store}><Home /></Provider>)
})

test('Home is rendering state', () => {
  const h1 = wrapper.root.findByType('h1'),
    b = h1.findByType('b'),
    [professional] = b.children

  expect(professional).toEqual(initialState.professional)
})

test('getInitialData is being called', done => {

  setTimeout(() => {
    expect(mockGetInitialData).toBeDefined()
    done()
  }, 0)
})