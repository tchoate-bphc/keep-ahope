import { takeEvery } from 'redux-saga/effects';

import {
    SEARCH_CONTACTS,
} from '../constants';

import { setContactSearchResults, setCurrentSearchQuery, setCurrentSearchQueryValidity } from 'actions';

function isValid(value) {
    let regex;
    if (value.length > 0 && value.length <= 4) {
        regex = new RegExp('^[a-zA-z]{1,4}$');
    } else if (value.length > 4 && value.length <= 10) {
        regex = new RegExp('^[a-zA-z]{4}\\d{1,6}$');
    } else if (value.length > 10) {
        regex = new RegExp('^[a-zA-z]{4}\\d{6}[a-zA-z]{1,3}$');
    }

    if (value.length > 0 && regex.test(value)) {
        return true;
    }
    return false;
};

function* searchContacts({ searchStringUid }) {

    const isContactUidValid = isValid(searchStringUid);
    window._UI_STORE_.dispatch(setCurrentSearchQueryValidity(isContactUidValid));
    // set query in state
    window._UI_STORE_.dispatch(setCurrentSearchQuery(searchStringUid));
    // only search if the string is valid
    if(isContactUidValid) {
        // get results from backend
        window._FIREBASE_DB_.ref('/contacts/')
            .orderByKey()
            .startAt(searchStringUid)
            .limitToFirst(10)
            .once('value', (snapshot) => {
                const searchResultsArray = Object.keys(snapshot.val()).filter((uid) => {
                    const subString = uid.slice(0, searchStringUid.length);
                    return searchStringUid === subString;
                });
                // set results in state
                window._UI_STORE_.dispatch(setContactSearchResults(searchResultsArray))
            })
        yield;
    }
}

export default function* () {
    yield [
        takeEvery(SEARCH_CONTACTS, searchContacts),
    ];
}
