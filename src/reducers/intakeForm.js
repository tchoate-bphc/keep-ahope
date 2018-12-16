import {
    UPDATE_INTAKE_FORM_FIELD,
    UPDATE_INTAKE_FORM_WITH_CONTACT,
} from '../constants';

const initialFormState = {

    showPeriodic: null, // false,
    showNewContactQuestions: null, // false,

    eventNotes: null, // '',
    profileNotes: null,

    // form
    eventDate: null,

    // periodic
    housingStatus: null, // 'homeless',
    hivStatus: null, // 'neverTested',
    isInCareForHiv: null, //false,
    hepCStatus: null, // 'neverTested',
    isInCareForHepC: null, // false,
    healthInsurer: null,
    primaryDrug: null,
    didOdLastYear: null, // true,
    didSeeOdLastYear: null, // true,
    hasHealthInsurance: null, // false,
    otherDrugs: [null],

    // new contact
    newContactDate: null,
    contactDateOfBirth: null, // new Date(1980, 0, 1),
    contactGenderIdentity: null, // 'male',
    contactEthnicity: null, // 'White',
    contactIsHispanic: null, // true,
    contactCountryOfBirth: null, // '',
    contactAgeOfFirstInjection: null, // 0,

    // visit or isOutreach
    uid: null, // params.uid,
    isOutreach: null, // false,
    referrals: [null],
    syringesGiven: null, // 0,
    syringesTaken: null, // 0,
    narcanWasOffered: null, // false,
    narcanWasTaken: null, // false,
    enrollment: null, // '',
    numberOfOthersHelping: null, // 0,
};

const intakeFormState = {
    userState: initialFormState,
    initialState : initialFormState,
};

function intakeForm(state = intakeFormState, action) {

    const { key, val, contact } = action;
    
    switch (action.type) {
        case UPDATE_INTAKE_FORM_FIELD:

            console.log('reducer: ', key, val)

            let updatedStateValObj = {};
            updatedStateValObj[key] = val;

            return {
                ...state,
                ...{userState: {
                    ...state.userState,
                    ...updatedStateValObj,
                }}
            };

        case UPDATE_INTAKE_FORM_WITH_CONTACT:

            const initialStateWithContactInfo = getInitialStateWithContactInfo({contact, initialState: state.initialState});

            return {
                ...state,
                ...{initialState: {
                    ...state.initialState,
                    ...initialStateWithContactInfo,
                }},
                ...{userState: {
                    ...state.userState,
                    ...updatedStateValObj
                }}
            };

        default:
            return state;

    }
}

export default intakeForm;

function getInitialStateWithContactInfo({contact, initialState}) {
    return initialState;
}