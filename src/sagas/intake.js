import { takeEvery, take, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    CREATE_EVENT,
    UPDATE_CURRENT_CONTACT
} from '../constants';

import { createEvent, updateCurrentContact } from '../actions';

export default function* () {
  yield [
    takeEvery(CREATE_EVENT, createEvent),
    takeEvery(UPDATE_CURRENT_CONTACT, updateCurrentContact),
  ]
}
