import {
    SET_CONTACT_SEARCH_RESULTS,
    SET_CURRENT_SEARCH_QUERY,
    SET_CURRENT_SEARCH_QUERY_VALIDITY,
} from '../constants'

const defaultState = {
    // array of filtered contacts based on user search
    searchResults: [],
    searchQuery: '',
    searchQueryValidity: true,
    selectedContact: '',
};

function contacts(state = defaultState, action) {

    const {
        searchResultArray,
        searchQuery,
        isValid,
    } = action;

    switch (action.type) {
        case SET_CONTACT_SEARCH_RESULTS:
            return Object.assign({}, state, {
                searchResults: searchResultArray,
            });
        case SET_CURRENT_SEARCH_QUERY:
            return Object.assign({}, state, {
                searchQuery,
            });
        case SET_CURRENT_SEARCH_QUERY_VALIDITY:
            return Object.assign({}, state, {
                searchQueryValidity: isValid,
            })
        default:
            return state
    }
}

export default contacts
