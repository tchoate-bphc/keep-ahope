import React, { Component } from 'react';

class SearchCriteria extends Component {

    render() {

        const { searchCriteria } = this.props

        return (
            <div>
                <h1>Search Criteria</h1>
                {JSON.stringify(searchCriteria)}
            </div>
        );
    }
}

export default SearchCriteria;