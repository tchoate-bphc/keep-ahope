import {
    UPDATE_SEARCH_BY_CRITERIA_CRITERIA,
    UPDATE_SEARCH_BY_CRITERIA_RESULTS,
} from '../constants';

const defaultState = {
    lastSearchCriteria: {
        dateOfBirth: null,
        hepCStatus: null,
        hivStatus: null,
        housingStatus: null,
        indexStart: 0,
        lastVisitRangeEnd: null,
        lastVisitRangeStart: null,
    },
    searchCriteria: {
        dateOfBirth: null,
        hepCStatus: null,
        hivStatus: null,
        housingStatus: null,
        indexStart: 0,
        lastVisitRangeEnd: null,
        lastVisitRangeStart: null,
    },
    searchResults: []
};

function searchByCriteria(state = defaultState, action) {

    const {
        searchResults,
        searchCriteria,
    } = action;

    switch (action.type) {
        case UPDATE_SEARCH_BY_CRITERIA_CRITERIA:
            return {
                ...state,
                searchCriteria,
            };
        case UPDATE_SEARCH_BY_CRITERIA_RESULTS:
            return {
                ...state,
                lastSearchCriteria: searchCriteria,
                searchCriteria,
                searchResults,
            };
        default:
            return state;
    }
}

export default searchByCriteria;
