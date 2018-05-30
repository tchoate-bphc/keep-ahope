import { takeEvery, call } from 'redux-saga/effects';

import {
    GET_CONTACT,
    CREATE_CONTACT,
} from '../constants';

import { updateCurrentContact } from 'actions';

function* getContact({ uid }) {
    const contactRef = `/contacts/${uid}`
    yield window._FIREBASE_DB_.ref(contactRef)
        .once('value', (snapshot) => {
            let contactData;
            if(snapshot.val()) {
                contactData = Object.assign({}, snapshot.val(), { uid: uid });
            } else {
                // set the contact to null if it doesn't exist
                contactData = Object.assign({}, snapshot.val());
            }
            window._UI_STORE_.dispatch(updateCurrentContact(contactData))
        })
}

function* createContact({ uid, data }) {
    let contactsRef = window._FIREBASE_DB_.ref(`/contacts/${uid}`);
    contactsRef.update(data);
    // TODO: i need to understand better how sagas work before I'm confident in this
    yield call(getContact, {uid});

};

export default function* () {
    yield [
        takeEvery(GET_CONTACT, getContact),
        takeEvery(CREATE_CONTACT, createContact),
    ];
}
