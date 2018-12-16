import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ContactIntake from 'components/view/ContactIntake';

import {updateIntakeFormField, updateIntakeFormWithContact} from 'actions';

const mapStateToProps = (state) => {
    return {
        // user: state.user,
        intakeForm: state.intakeForm,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateIntakeFormField: ({key, val}) => dispatch(updateIntakeFormField({key, val})),
        updateIntakeFormWithContact: ({contact}) => dispatch(updateIntakeFormWithContact({contact})),
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactIntake));