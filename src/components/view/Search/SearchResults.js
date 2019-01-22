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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const NO_VAL_PROVIDED = '-'

function dateTranslation ({val}) {
    return val instanceof Date ? Moment(val).format('l') : NO_VAL_PROVIDED;
}

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
            RANGE_CURRENT_WEEK,
            RANGE_PREVIOUS_WEEK,
            RANGE_CURRENT_YEAR,
            RANGE_PREVIOUS_YEAR,
            RANGE_ALL_TIME,
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
            agg[col.key] = col.show;
            return agg;
        }, {});
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
                                                {column.filerByCalendar === true && (
                                                        <DatePicker
                                                        hintText="Date"
                                                        floatingLabelText="Date"
                                                        onChange={(e, date) => {}}
                                                        autoOk={true}
                                                    />
                                                )}
                                                {!column.filterOptions || !column.filterOptions.length ? '' : (
                                                    <SelectField
                                                        floatingLabelText="Frequency"
                                                        value={this.state.value}
                                                        onChange={this.handleChange}
                                                        // labelStyle={{ width: '100%' }}
                                                        menuStyle={{width:'10em'}}
                                                        // width='100%'
                                                        autoWidth={true}
                                                        >
                                                        <MenuItem value={null} primaryText="" />
                                                        <MenuItem value={1} primaryText="Auto width" />
                                                        <MenuItem value={2} primaryText="Every Night" />
                                                        <MenuItem value={3} primaryText="Weeknights" />
                                                        <MenuItem value={4} primaryText="Weekends" />
                                                        <MenuItem value={5} primaryText="Weekly" />
                                                    </SelectField>
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