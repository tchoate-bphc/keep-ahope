import React, { Component } from 'react'

import { Card, CardTitle } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';

import {radioButtonGenderList, enthnicityOptionsList, countryOfBirthList } from '../../../utils/fieldValueLists';


class NewContactQuestionsForm extends Component {

    constructor(props) {
        super(props);

        this.buildSelectField = this.props.buildSelectField.bind(this);
        this.buildRadio = this.props.buildRadio.bind(this);
        this.buildToggle = this.props.buildToggle.bind(this);
        this.buildSlider = this.props.buildSlider.bind(this);
    };


    render() {

        const { palette, updateIntakeFormField } = this.props;

        const options = {
            defaultValue: 0,
            step: 1,
            min: 0,
            max: 100,
        }

        // rest of the stuff for this form
        return (
            <Card>
                <CardTitle title='First Contact' titleColor={palette.primary1Color}/>

                <div style={{padding: '2rem'}}>
                    <DatePicker
                        hintText="Date of Birth"
                        floatingLabelText="Date of Birth"
                        value={this.props.contactDateOfBirth}
                        onChange={(e, date) => updateIntakeFormField({key: 'contactDateOfBirth', val: date})}
                        autoOk={true}
                        openToYearSelection={true}
                    />
                </div>

                <div style={{padding: '2rem 2rem 0rem 2rem'}}>
                    {this.buildSlider('contactAgeOfFirstInjection', 'Age of First Injection', this.props.contactAgeOfFirstInjection, this.props.handleSliderChange, options)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildRadio('Gender Identity', radioButtonGenderList, 'contactGenderIdentity', this.props.handleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildSelectField({title: 'Ethnicity', selectOptionsList: enthnicityOptionsList, name: 'contactEthnicity', val: this.props.contactEthnicity, updateCallback: this.props.handleSelectChange, multiple: false })}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildRadio('Country of Birth', countryOfBirthList, 'contactCountryOfBirth', this.props.handleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Hispanic?', 'contactIsHispanic', this.props.handleChildToggleChange)}
                </div>
            </Card>
        )
    }

}

export default NewContactQuestionsForm;
