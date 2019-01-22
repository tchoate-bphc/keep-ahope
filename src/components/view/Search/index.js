import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import SearchCriteria from './SearchCriteria';
import SearchResults from './SearchResults';

class Search extends Component {

    render() {

        // TODO
        // on navigate here, request default data
        // if array is empty and criteria is default, then make async request for top 20 results

        const { 
            searchByCriteriaResults: { lastSearchCriteria, searchCriteria, searchResults }, 
            requestSearchByCriteria 
        } = this.props;


        return (
            <section>
                <div>
                    <RaisedButton 
                        label='Update Filter'
                        primary={true}
                        onClick={() => requestSearchByCriteria({ searchCriteria })}
                        />
                </div>
                <SearchResults 
                    criteriaMatch={this.compareCriteria({a: searchCriteria, b: lastSearchCriteria})} // affect styling if criteria has been modified
                    lastSearchCriteria={lastSearchCriteria}
                    searchResults={searchResults}
                    />
            </section>
        );
    }

    compareCriteria({a, b}) {
        return a && b && Object.keys(a).every( aKey => {
            return a[aKey] === b[aKey];
        });
    }

}

export default Search;