import { connect } from 'react-redux';
import Search from 'components/view/Search';

import { requestSearchByCriteria } from 'actions';

const mapStateToProps = (state) => {
    return {
        searchByCriteriaResults: state.searchByCriteriaResults,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestSearchByCriteria: ({searchCriteria}) => dispatch(requestSearchByCriteria({searchCriteria})),
    };
};

const SearchController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);

export default SearchController;