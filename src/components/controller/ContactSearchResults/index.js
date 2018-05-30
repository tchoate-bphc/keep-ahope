import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getContact, setCurrentSearchQuery } from 'actions';
import ContactSearchResults from 'components/view/ContactSearchResults';

const mapStateToProps = (state) => {
    return {
        searchResults: state.contacts.searchResults,
        contactSearchQuery: state.contacts.searchQuery,
        contactSearchQueryValidity: state.contacts.searchQueryValidity,
        currentContactUid: state.contact.uid,
    };
};

const mapDispatchToProps = {
    getContact,
    setCurrentSearchQuery,
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactSearchResults));
