import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createContact, createEvent } from 'actions';
import ContactIntake from 'components/view/ContactIntake';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        form: state.intakeForm,
        contact: state.contact,
    }
};

const mapDispatchToProps = {
    createContact,
    createEvent,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactIntake));
