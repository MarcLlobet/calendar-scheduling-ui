// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import fetchMock from "jest-fetch-mock";

import 'jest-localstorage-mock'

Enzyme.configure({ adapter: new Adapter() });

fetchMock.enableMocks();




