import {
    UPDATE_CURRENT_CONTACT,
    // TODO: why is this undefined if i change it to 'constants'?
} from '../constants'

// TODO: should this be something other than an empty object?
const defaultCurrentContactState = {};

function contact(state = defaultCurrentContactState, action) {
    const { contact } = action;
    switch (action.type) {
        case UPDATE_CURRENT_CONTACT:
            return Object.assign({}, contact);

        default:
            return state;

    }
}

export default contact;
