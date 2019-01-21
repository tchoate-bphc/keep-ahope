import config from './config';
import consent from './consent';
import contact from './contact';
import contacts from './contacts';
import intakeForm from './intakeForm';
import notificationSingleton from './notificationSingleton';
import reportsData from './reportsData';
import user from './user';

function isLoggedIn(state = false) {
    return state;
}

const reducers = {
    config,
    consent,
    contact,
    contacts,
    intakeForm,
    isLoggedIn,
    notificationSingleton,
    reportsData,
    user,
};

export default reducers;
