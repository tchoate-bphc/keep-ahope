import { takeEvery, take, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    CREATE_EVENT,
    DEBOUNCE_REFRESH_EVENTS,
    FETCH_EVENTS,
    UPDATE_EVENT,
    REFRESH_EVENTS,
} from '../constants';

import { refreshEvents } from '../actions';


function* createEvent({ eventData }) {

    // let options = {
    //     enableHighAccuracy: true,
    //     timeout: 1000,
    //     maximumAge: 0
    // };

    const updates = {};
    const eventUid = '2018/03/'+ Math.round(Math.random()*1000000);
    updates['events/' + eventUid] = {
        ...eventData,
        // add timestamp?
    };

    navigator.geolocation.getCurrentPosition(
        (position => {
            updates['events/' + eventUid].latitude = position.coords.latitude;
            updates['events/' + eventUid].longitude = position.coords.longitude;
            window._FIREBASE_DB_.ref().update(updates);
        }),
        (error => {
            console.log(error);
            window._FIREBASE_DB_.ref().update(updates);
        })
    );

    yield;

}


export default function* () {
    yield [
        takeEvery(CREATE_EVENT, createEvent),
    ];
}
