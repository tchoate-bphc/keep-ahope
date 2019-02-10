import React, { Component } from 'react';

import moment from 'moment';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import './react-datepicker-override.css'

import { defaultState as searchByCriteriaResultsDefaultState } from '../../../reducers/searchByCriteriaResults';

import { enthnicityOptionsList, genderOptionsList } from '../../../utils/fieldValueLists';

import {
    RANGE_CURRENT_WEEK,
    RANGE_PREVIOUS_WEEK,
    RANGE_CURRENT_YEAR,
    RANGE_PREVIOUS_YEAR,
    RANGE_ALL_TIME,
} from '../../../constants';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import DatePicker from 'material-ui/DatePicker';

import Select from 'react-select';

const NO_VAL_PROVIDED = '-';

function dateTranslation ({val}) {
    return val instanceof Date ? moment(val).format('l') : NO_VAL_PROVIDED;
}

const nullOption = { value: null, label: '---' };

const columns = [
    {
        key: 'rowNum',
        label: '#',
        style: {width: '2em'},
        show: true,
    },
    // primary
    {
        key: 'uid',
        label: 'UID',
        style: { width: '10em', marginRight: 0, paddingRight: 0 },
        filterOptions: [],
        show: true,
    },
    {
        key: 'dateOfLastVisit',
        label: 'Date of Last Visit',
        filterOptions: [
            nullOption,
            { value: RANGE_CURRENT_WEEK, label: 'Current Week' },
            { value: RANGE_PREVIOUS_WEEK, label: 'Previous Week' },
            { value: RANGE_CURRENT_YEAR, label: 'Current Year' },
            { value: RANGE_PREVIOUS_YEAR, label: 'Previous Year' },
            { value: RANGE_ALL_TIME, label: 'All Time' },
        ],
        displayTranslation: dateTranslation,
        show: true,
    },
    // constants
    {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        filterByCalendar: true,
        displayTranslation: dateTranslation,
        show: true,
    },
    {
        key: 'hispanic',
        label: 'Hispanic',
        filterOptions: [
            nullOption,
            { value: true, label: 'Hispanic' },
            { value: false, label: 'Not hispanic' },
        ],
        show: false,
    },
    {
        key: 'countryOfBirth',
        label: 'Country of Birth',
        filterOptions: [
            nullOption,
            { value: 'US', label: 'US' },
            { value: 'PR', label: 'PR' },
            { value: 'Other', label: 'Other' },
        ],
        show: true,
    },
    {
        key: 'ethnicity',
        label: 'Ethnicity',
        filterOptions: [
            nullOption,
            ...enthnicityOptionsList,
        ],
        show: true,
    },
    {
        key: 'genderIdentity',
        label: 'Gender Identity',
        filterOptions: [
            nullOption,
            ...genderOptionsList,
        ],
        show: true,
    },
    // insurance and housing
    {
        key: 'hasHealthInsurance',
        label: 'Has Health Insurance',
        filterOptions: [
            nullOption,
            { value: true, label: 'Has' },
            { value: false, label: 'Does not have' },
        ],
        show: false,
    },
    {
        key: 'housingStatus',
        label: 'Housing Status',
        filterOptions: [],
        show: false,
    },
    // drug info
    {
        key: 'primaryDrug',
        label: 'Primary Drug',
        filterOptions: [],
        show: false,
    },
    {
        key: 'didOdLastYear',
        label: 'Did Od Last Year',
        filterOptions: [
            nullOption,
            { value: true, label: 'Did OD' },
            { value: false, label: 'Did not OD' },
        ],
        show: false,
    },
    {
        key: 'hivStatus',
        label: 'Hiv Status',
        filterOptions: [
            nullOption,
            { value: 'positive', label: 'Positive' },
            { value: 'negative', label: 'Negative' },
            { value: 'not-tested', label: 'Not tested' },
        ],
        show: false,
    },
    {
        key: 'isInCareForHiv',
        label: 'Is In Care For Hiv',
        filterOptions: [
            nullOption,
            { value: true, label: 'In care' },
            { value: false, label: 'Not in care' },
        ],
        show: false,
    },
    {
        key: 'hepCStatus',
        label: 'Hep C Status',
        filterOptions: [],
        show: false,
    },
    {
        key: 'isInCareForHepC',
        label: 'Is In Care For Hep C',
        filterOptions: [],
        show: false,
    },
    {
        key: 'ageOfFirstInjection',
        label: 'Age of First Injection',
        filterOptions: [],
        show: false,
    },
];

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = columns.reduce( (agg, col) => {
            agg[col.key] = {
                show: col.show,
            };
            return agg;
        }, {});
    }

    handleChange({key, value}) {
        const { requestSearchByCriteria,  searchByCriteriaResults: { searchCriteria } } = this.props;
        searchCriteria[key] = value;
        requestSearchByCriteria({searchCriteria});
    }

    render() {

        const {
            requestSearchByCriteria,
            searchByCriteriaResults: { searchResults, searchCriteria, lastSearchCriteria },
        } = this.props;

        const {
            totalCount = 0,
            indexStart = 0,
            indexEnd = 0,
            contacts = [],
        } = searchResults || {};

        if ( searchResults.length === 0 && searchByCriteriaResultsDefaultState.searchCriteria === searchCriteria ) {
            requestSearchByCriteria({ searchCriteria });
        }

        return (
            <section>
                {contacts && (
                    <Table
                        height='30em'
                        selectable={false}
                        style={{minWidth:'800px'}}
                        bodyStyle={{minWidth:'800px'}}
                        >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            >
                            <TableRow>
                                {columns
                                    .filter( column => {
                                        return this.state[column.key].show === true;
                                    })
                                    .map( column => {
                                        return (
                                            <TableHeaderColumn
                                                style={{
                                                    ...column.style,
                                                    whiteSpace: 'normal'
                                                }}
                                                key={column.key}
                                                >
                                                {column.label}
                                            </TableHeaderColumn>
                                        );
                                    })
                                }
                            </TableRow>
                            <TableRow>
                                {columns
                                    .filter( column => {
                                        return this.state[column.key].show === true;
                                    })
                                    .map( column => {
                                        return (
                                            <TableHeaderColumn
                                                style={{
                                                    ...column.style,
                                                    whiteSpace: 'normal'
                                                }}
                                                key={column.key}
                                                >
                                                {column.filterByCalendar === true && (
                                                    <DatePicker
                                                        selected={searchCriteria[column.key] ? moment(searchCriteria[column.key]) : null}
                                                        onChange={(date) => this.handleChange({key: column.key, value: date})}
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                    />
                                                )}
                                                {!column.filterOptions || !column.filterOptions.length ? '' : (
                                                    <Select
                                                        key={'dropdown-' + column.key}
                                                        defaultValue={searchCriteria[column.key]}
                                                        onChange={(e) => this.handleChange({key: column.key, value: e.value})}
                                                        options={column.filterOptions}
                                                    />
                                                )}
                                            </TableHeaderColumn>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableHeader>

                        <TableBody
                            showRowHover={true}
                            displayRowCheckbox={false}
                            >
                            {contacts.map( (contact, contactIndex) => (
                                <TableRow
                                    key={contact.uid}
                                    >
                                    {columns
                                        .filter( column => {
                                            return this.state[column.key].show === true;
                                        })
                                        .map( (column) => {
                                            let value = contact[column.key] === undefined ? NO_VAL_PROVIDED : contact[column.key];
                                            if (column.key === 'rowNum') {
                                                value = indexStart + contactIndex + 1;
                                            } else if ('function' === typeof column.displayTranslation) {
                                                value = column.displayTranslation({val: value});
                                            }
                                            return (
                                                <TableRowColumn
                                                    style={column.style || {}}
                                                    key={contact.uid + '-' +column.key}
                                                    >
                                                    {value}
                                                </TableRowColumn>
                                            );
                                        })
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableRowColumn colSpan="6" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                    {contacts && contacts.length && (
                                        `Showing ${indexStart + 1} - ${indexEnd + 1} of ${totalCount}`
                                    )}
                                </TableRowColumn>
                            </TableRow>
                        </TableFooter>
                    </Table>
                )}
            </section>
        );
    }
}

export default Search;