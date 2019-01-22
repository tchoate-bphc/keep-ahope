import { takeEvery } from 'redux-saga/effects';

import Moment from 'moment';

import {
    REQUEST_SEARCH_BY_CRITERIA,
} from '../constants';

import { updateSearchByCriteriaResults } from 'actions';

function* requestSearchByCriteria( { searchCriteria } ) {

    // const query = {
    //     dateOfBirth: null, date
    //     hepCStatus: null,
    //     hivStatus: null,
    //     housingStatus: null,
    //     indexStart: 0,
    //     lastVisitRangeEnd: null,
    //     lastVisitRangeStart: null,
    // }

    const contact = window._Parse_.Object.extend('contacts')
    const query = new window._Parse_.Query(contact);
    
    if (searchCriteria.dateOfBirth !== undefined && searchCriteria.dateOfBirth !== null) {
        query.greaterThanOrEqualTo('dateOfBirth', Moment(searchCriteria.dateOfBirth).startOf('day').toDate());
        query.lessThanOrEqualTo('dateOfBirth', Moment(searchCriteria.dateOfBirth).startOf('day').add(1, 'day').toDate());
    } 
    if (searchCriteria.hepCStatus !== undefined && searchCriteria.hepCStatus !== null) {
        query.equal('hepCStatus', searchCriteria.hepCStatus);
    } 
    if (searchCriteria.hivStatus !== undefined && searchCriteria.hivStatus !== null) {
        query.equal('hivStatus', searchCriteria.hivStatus);
    } 
    if (searchCriteria.housingStatus !== undefined && searchCriteria.housingStatus !== null) {
        query.equal('housingStatus', searchCriteria.housingStatus);
    } 
    if (searchCriteria.lastVisitRangeStart !== undefined && searchCriteria.lastVisitRangeStart !== null) {
        query.greaterThanOrEqualTo('dateOfLastVisit', Moment(searchCriteria.lastVisitRangeStart).startOf('day').toDate());
    } 
    if (searchCriteria.lastVisitRangeEnd !== undefined && searchCriteria.lastVisitRangeEnd !== null) {
        query.greaterThanOrEqualTo('dateOfLastVisit', Moment(searchCriteria.lastVisitRangeEnd).startOf('day').add(1, 'day').toDate());
    } 

    // pagination
    // skip some indexes if indexStart is truthy and a number
    if (searchCriteria.indexStart && typeof searchCriteria.indexStart === 'number') {
        query.skip( searchCriteria.indexStart );
    } 
    
    const getTotalCount = query.count();

    query.limit(20)
    query.descending('dateOfLastVisit')

    const getResults = query.find();

    Promise.all([
        getTotalCount,
        getResults,
    ])
        .then( ([
            totalCount,
            contactsObj,
        ]) => {
            const searchResults = { 
                totalCount: totalCount,
                indexStart: searchCriteria.indexStart || 0,
                indexEnd: (searchCriteria.indexStart || 0) + (contactsObj.length -1),
                contacts: contactsObj.map( c => c.attributes)
            };
            window._UI_STORE_.dispatch( updateSearchByCriteriaResults( { 
                searchCriteria,
                searchResults,
            }));
        });

    yield;
}

export default function* () {
    yield [
        takeEvery(REQUEST_SEARCH_BY_CRITERIA, requestSearchByCriteria),
    ];
}
