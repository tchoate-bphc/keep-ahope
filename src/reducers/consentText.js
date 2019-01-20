import {
    UPDATE_CONSENT_TEXT
} from '../constants'

const defaultState = {
    consentText
};

function consentText(state = defaultState, action) {

    const { consentText } = action;

    switch (action.type) {
        case UPDATE_CONSENT_TEXT:

            return {
                ...state,
                consentText,
            };

        default:
            return state;
    }
}

export default consentText;
