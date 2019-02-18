import {
    UPDATE_SEARCH_BY_CRITERIA_CRITERIA,
    UPDATE_SEARCH_BY_CRITERIA_RESULTS,
    RANGE_CURRENT_WEEK,
} from '../constants';

const defaultSearchCriteria = () => ({
    isFirstRequest: true,
    indexStart: 0,

    dateOfLastVisit: null,
    dateOfBirth: null,
    hispanic: null,
    countryOfBirth: null,
    ethnicity: null,
    genderIdentity: null,
    hasHealthInsurance: null,
    housingStatus: null,
    primaryDrug: null,
    didOdLastYear: null,
    hivStatus: null,
    isInCareForHiv: null,
    hepCStatus: null,
    isInCareForHepC: null,
    ageOfFirstInjection: null,
});

export const defaultState = () => ({
    lastSearchCriteria: { ...defaultSearchCriteria() },
    searchCriteria: { ...defaultSearchCriteria() },
    searchResults: []
});

function searchByCriteria(state = { ...defaultState() }, action) {

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
