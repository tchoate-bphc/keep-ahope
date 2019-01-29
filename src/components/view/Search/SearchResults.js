import React, { Component } from 'react';

import Moment from 'moment';

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
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

import Select from 'react-select';

const NO_VAL_PROVIDED = '-';

function dateTranslation ({val}) {
    return val instanceof Date ? Moment(val).format('l') : NO_VAL_PROVIDED;
}

const nullOption = { value: null, label: '---' };

const columns = [
    // primary
    {
        key: 'uid',
        label: 'UID',
        style: { width: '10em' },
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
        filterOptionSelected: null,
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
        filterOptions: [],
        show: false,
    },
    {
        key: 'countryOfBirth',
        label: 'Country of Birth',
        filterOptions: [],
        show: true,
    },
    {
        key: 'ethinicity',
        label: 'Ethinicity',
        filterOptions: [],
        show: true,
    },
    {
        key: 'genderIdentity',
        label: 'Gender Identity',
        filterOptions: [],
        show: true,
    },
    // insurance and housing
    {
        key: 'hasHealthInsurance',
        label: 'Has Health Insurance',
        filterOptions: [],
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
        filterOptions: [],
        show: false,
    },
    {
        key: 'hivStatus',
        label: 'Hiv Status',
        filterOptions: [],
        show: false,
    },
    {
        key: 'isInCareForHiv',
        label: 'Is In Care For Hiv',
        filterOptions: [],
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

class SearchResults extends Component {

    constructor(props) {
        super(props);

        this.state = columns.reduce( (agg, col) => {
            agg[col.key] = { 
                filterOption: null,
                show: col.show,
            };
            return agg;
        }, {});
    }

    handleChange = ({key, value}) => {
        const obj = {}; 
        obj[key] = {
            ...this.state[key],
            filterOption: value,
        };
        debugger;
        this.setState(obj);
        console.log(`Option selected:`, obj);
    }

    render() {

        const {
            criteriaMatch,
            lastSearchCriteria,
            searchResults: {
                totalCount,
                indexStart,
                indexEnd,
                contacts,
            },
        } = this.props;

        return (
            <div>
                {contacts && contacts.length && (
                    <div>
                        Showing {indexStart + 1} - {indexEnd + 1} of {totalCount}
                    </div>
                )}
                {contacts && contacts.length && (
                    <Table
                        height='30em'
                        selectable={false}
                        style={{minWidth:'700px'}}
                        bodyStyle={{minWidth:'700px'}}
                        >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            >
                            <TableRow>
                                {columns
                                    .filter( column => {
                                        return this.state[column.key] === true;
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
                                                {column.filerByCalendar === true && (
                                                        <DatePicker
                                                        hintText="Date"
                                                        floatingLabelText="Date"
                                                        onChange={(e, date) => {}}
                                                        autoOk={true}
                                                    />
                                                )}
                                                {!column.filterOptions || !column.filterOptions.length ? '' : (
                                                    <Select
                                                        value={this.state[column.key].filterOption}
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
                            {contacts.map( contact => (
                                <TableRow
                                    key={contact.uid}
                                    >
                                    {columns
                                        .filter( column => {
                                            return this.state[column.key] === true;
                                        })
                                        .map( column => {
                                            let value = contact[column.key] === undefined ? NO_VAL_PROVIDED : contact[column.key];
                                            if ('function' === typeof column.displayTranslation) {
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
                    </Table>
                )}
            </div>
        );
    }
}

export default SearchResults;