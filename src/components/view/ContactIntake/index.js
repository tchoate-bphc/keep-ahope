import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

// TODO: this should be mapped via props instead
import { createEvent } from 'actions';

import PeriodicQuestionsForm from 'components/view/ContactIntake/periodicQuestions.form';
import NewContactQuestionsForm from 'components/view/ContactIntake/newContactQuestions.form';
import VisitOrOutreachQuestions from 'components/view/ContactIntake/visitOrOutreachQuestions.form';

import './styles.css';


class IntakeForm extends Component {

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.updateIntakeFormField = this.props.updateIntakeFormField;
    }


    // i'm sure we'll want to change names on the db in the future at some time
    // or locally within state. so I'm abstracting this call to make it clear what data
    // we send in event creation
    packageFormDataForSubmission({initialState, userStateForDisplay}) {
        const visitOrOutreach = {
            isOutreach: initialState.isOutreach !== initialState.isOutreach.isOutreach ? userStateForDisplay.isOutreach : null,
            referrals: initialState.referrals !== initialState.referrals.referrals ? userStateForDisplay.referrals : null,
            syringesGiven: initialState.syringesGiven !== initialState.syringesGiven.syringesGiven ? userStateForDisplay.syringesGiven : null,
            syringesTaken: initialState.syringesTaken !== initialState.syringesTaken.syringesTaken ? userStateForDisplay.syringesTaken : null,
            narcanWasOffered: initialState.narcanWasOffered !== initialState.narcanWasOffered.narcanWasOffered ? userStateForDisplay.narcanWasOffered : null,
            narcanWasTaken: initialState.narcanWasTaken !== initialState.narcanWasTaken.narcanWasTaken ? userStateForDisplay.narcanWasTaken : null,
            enrollment: initialState.enrollment !== initialState.enrollment.enrollment ? userStateForDisplay.enrollment : null,
            numberOfOthersHelping: initialState.numberOfOthersHelping !== initialState.numberOfOthersHelping.numberOfOthersHelping ? userStateForDisplay.numberOfOthersHelping : null,
        }
        
        const periodic = userStateForDisplay.showPeriodic ? {
            housingStatus: initialState.housingStatus !== initialState.housingStatus.housingStatus ? userStateForDisplay.housingStatus : null,
            hivStatus: initialState.hivStatus !== initialState.hivStatus.hivStatus ? userStateForDisplay.hivStatus : null,
            isInCareForHiv: initialState.isInCareForHiv !== initialState.isInCareForHiv.isInCareForHiv ? userStateForDisplay.isInCareForHiv : null,
            hepCStatus: initialState.hepCStatus !== initialState.hepCStatus.hepCStatus ? userStateForDisplay.hepCStatus : null,
            isInCareForHepC: initialState.isInCareForHepC !== initialState.isInCareForHepC.isInCareForHepC ? userStateForDisplay.isInCareForHepC : null,
            healthInsurer: initialState.healthInsurer !== initialState.healthInsurer.healthInsurer ? userStateForDisplay.healthInsurer : null,
            primaryDrug: initialState.primaryDrug !== initialState.primaryDrug.primaryDrug ? userStateForDisplay.primaryDrug : null,
            didOdLastYear: initialState.didOdLastYear !== initialState.didOdLastYear.didOdLastYear ? userStateForDisplay.didOdLastYear : null,
            didSeeOdLastYear: initialState.didSeeOdLastYear !== initialState.didSeeOdLastYear.didSeeOdLastYear ? userStateForDisplay.didSeeOdLastYear : null,
            hasHealthInsurance: initialState.hasHealthInsurance !== initialState.hasHealthInsurance.hasHealthInsurance ? userStateForDisplay.hasHealthInsurance : null,
            otherDrugs: initialState.otherDrugs !== initialState.otherDrugs.otherDrugs ? userStateForDisplay.otherDrugs : null,
        } : null;
        
        const contactData = userStateForDisplay.showNewContactQuestions ? {
            newContactDate: userStateForDisplay.newContactDate,
            contactDateOfBirth: initialState.contactDateOfBirth !== initialState.contactDateOfBirth.contactDateOfBirth ? userStateForDisplay.contactDateOfBirth : null,
            contactGenderIdentity: initialState.contactGenderIdentity !== initialState.contactGenderIdentity.contactGenderIdentity ? userStateForDisplay.contactGenderIdentity : null,
            contactEthnicity: initialState.contactEthnicity !== initialState.contactEthnicity.contactEthnicity ? userStateForDisplay.contactEthnicity : null,
            contactIsHispanic: initialState.contactIsHispanic !== initialState.contactIsHispanic.contactIsHispanic ? userStateForDisplay.contactIsHispanic : null,
            contactCountryOfBirth: initialState.contactCountryOfBirth !== initialState.contactCountryOfBirth.contactCountryOfBirth ? userStateForDisplay.contactCountryOfBirth : null,
            contactAgeOfFirstInjection: initialState.contactAgeOfFirstInjection !== initialState.contactAgeOfFirstInjection.contactAgeOfFirstInjection ? userStateForDisplay.contactAgeOfFirstInjection : null,
        } : null;

        // dirty check to only submit data for visible forms
        let prunedEventData = {
            ...visitOrOutreach,
            ...periodic,
            ...contactData,
            profileNotes: userStateForDisplay.profileNotes,
            eventNotes: userStateForDisplay.eventNotes,
            date: userStateForDisplay.eventDate,
            contactUid: userStateForDisplay.uid,
        };
        return prunedEventData;
    }

    submitForm({initialState, userStateForDisplay}) {
        // TODO: Ultimately should change these cases to prompts, not alert; but React errors for now
        // TODO: what about validation?
        if (initialState === userStateForDisplay) {
            alert("Cannot post empty form");
        } else {
            // TODO: should call an action 'SUBMIT_FORM' or something
            // which should take the event and contact info, and call the update contact
            // action from within
            let eventData = this.packageFormDataForSubmission({initialState, userStateForDisplay});
            this.props.dispatch( createEvent( { eventData, history: this.props.history } ) );
        }
    }

    // helpers to build controlled input elements
    buildRadio(title, radioOptionsList, name, updateCallback) {
        let radioControls = radioOptionsList.map(option => (
            <RadioButton
                key={option.label}
                name={option.name}
                label={option.label}
                value={option.value}
            />
        ));

        let labelStyle = {
            color: this.props.palette.primary3Color,
            margin: '2rem 0 1rem 0'
        };

        return (
            <div>
                <div style={labelStyle}>{title}</div>
                <RadioButtonGroup
                    name={name}
                    onChange={updateCallback}
                    defaultSelected={this.props[name]}
                    valueSelected={this.props[name]}
                >
                    {radioControls}
                </RadioButtonGroup>
            </div>
        )
    };

    buildToggle(toggleName, stateName, updateCallback) {
        return (
            <Toggle
                label={toggleName}
                defaultToggled={false}
                labelPosition="right"
                toggled={this.props[stateName]}
                onToggle={(event, isInputChecked) => {
                    updateCallback(stateName, isInputChecked)
                }}
            />
        )
    };

    buildSelectField(title, selectOptionsList, name, updateCallback, multiple=false) {
        const selectControls = selectOptionsList.map(selectOption => (
            <MenuItem
                key={selectOption.value}
                primaryText={selectOption.primaryText}
                value={selectOption.value}
                name={name}
            />
        ));

        const labelStyle = {
            color: this.props.palette.primary3Color,
            margin: '2rem 0 1rem 0'
        };

        return (
            <div>
                <div style={labelStyle}>{title}</div>
                <SelectField
                    multiple={multiple}
                    value={ this.props[name] }
                    style={{color: this.props.palette.primary1Color}}
                    name={name}
                    onChange={(e, index, value) => {
                        updateCallback(name, value, multiple, this.props[name])
                    }}
                >
                    {selectControls}
                </SelectField>
            </div>
        )
    };

    buildSlider(sliderName, labelText, sliderValue, updateCallback, overrides = {}) {
        let labelStyle = {
            color: this.props.palette.primary3Color,
            margin: '2rem 0 1rem 0'
        }
        const options = {
            defaultValue: overrides.defaultValue || 0,
            step: overrides.step || 10,
            min: overrides.min || 0,
            max: overrides.max || 50,
        }
        return (
            <div id={sliderName}>
            <div style={labelStyle}>{labelText}<span style={{paddingLeft: '.5rem', fontSize: '.5rem'}}>({sliderValue}/{options.max})</span></div>
                <Slider
                    name={sliderName}
                    defaultValue={options.defaultValue}
                    step={options.step}
                    min={options.min}
                    max={options.max}
                    value={this.props[sliderName]}
                    onChange={(e, value) => updateCallback(sliderName, value)}
                />
            </div>
        )
    }

    handleSliderChange(name, value) {
        this.updateIntakeFormField({
            key: name,
            val: value,
        });
    };

    handleChildInputChange(event, value) {
        const target = event.target;
        const name = target.name;

        this.updateIntakeFormField({
            key: name,
            val: value,
        });
    };

    handleChildSelectChange(name, value, multiple = false, prevVal) {

        if (multiple) {
            value = this.handleMultiSelectChangeWithNull({newVal: value, prevVal});
        }

        this.updateIntakeFormField({
            key: name,
            val: value,
        });
    };

    handleMultiSelectChangeWithNull({newVal, prevVal}) {
        
        const selectedCount = newVal.length;
        const indexOfNullInCurr = newVal.findIndex( item => item === null );
        const indexOfNullInPrev = prevVal.findIndex( item => item === null );

        // if only one item selected, no action to take
        if (selectedCount === 1) {
            return newVal;
        } else if (selectedCount > 1 && indexOfNullInCurr > -1 ) {
            // if greater than 1 item and has null, then either return null or the other values
            if (indexOfNullInPrev > -1) {
                // if previously had null, then remove it
                return newVal.filter( item => item !== null );
            } else {
                // if previously didn't have null, then remove all others
                return newVal.filter( item => item === null );
            }
        } else {
            // else no changes needed
            return newVal;
        }
    }

    handleChildToggleChange(name, isInputChecked) {
        this.updateIntakeFormField({
            key: name,
            val: isInputChecked,
        })
    }

    addDefaultValuesToIntakeForm({initialState, userState}) {

        return {
            showPeriodic: userState.showPeriodic !== initialState.showPeriodic ? userState.showPeriodic : false,
            showNewContactQuestions: userState.showNewContactQuestions !== initialState.showNewContactQuestions ? userState.showNewContactQuestions : false,
        
            eventNotes: userState.eventNotes !== initialState.eventNotes ? userState.eventNotes : '',
            profileNotes: userState.profileNotes !== initialState.profileNotes ? userState.profileNotes : '',
        
            // form
            eventDate: userState.eventDate !== initialState.eventDate ? userState.eventDate : new Date(),
        
            // periodic
            housingStatus: userState.housingStatus !== initialState.housingStatus ? userState.housingStatus : 'homeless',
            hivStatus: userState.hivStatus !== initialState.hivStatus ? userState.hivStatus : 'neverTested',
            isInCareForHiv: userState.isInCareForHiv !== initialState.isInCareForHiv ? userState.isInCareForHiv : false,
            hepCStatus: userState.hepCStatus !== initialState.hepCStatus ? userState.hepCStatus : 'neverTested',
            isInCareForHepC: userState.isInCareForHepC !== initialState.isInCareForHepC ? userState.isInCareForHepC : false,
            healthInsurer: userState.healthInsurer !== initialState.healthInsurer ? userState.healthInsurer : null,
            primaryDrug: userState.primaryDrug !== initialState.primaryDrug ? userState.primaryDrug : null,
            didOdLastYear: userState.didOdLastYear !== initialState.didOdLastYear ? userState.didOdLastYear : true,
            didSeeOdLastYear: userState.didSeeOdLastYear !== initialState.didSeeOdLastYear ? userState.didSeeOdLastYear : true,
            hasHealthInsurance: userState.hasHealthInsurance !== initialState.hasHealthInsurance ? userState.hasHealthInsurance : false,
            otherDrugs: userState.otherDrugs !== initialState.otherDrugs ? userState.otherDrugs : [null],
        
            // new contact
            newContactDate: userState.newContactDate !== initialState.newContactDate ? userState.newContactDate : new Date(),
            contactDateOfBirth: userState.contactDateOfBirth !== initialState.contactDateOfBirth ? userState.contactDateOfBirth : new Date(1980, 0, 1),
            contactGenderIdentity: userState.contactGenderIdentity !== initialState.contactGenderIdentity ? userState.contactGenderIdentity : 'male',
            contactEthnicity: userState.contactEthnicity !== initialState.contactEthnicity ? userState.contactEthnicity : 'White',
            contactIsHispanic: userState.contactIsHispanic !== initialState.contactIsHispanic ? userState.contactIsHispanic : true,
            contactCountryOfBirth: userState.contactCountryOfBirth !== initialState.contactCountryOfBirth ? userState.contactCountryOfBirth : '',
            contactAgeOfFirstInjection: userState.contactAgeOfFirstInjection !== initialState.contactAgeOfFirstInjection ? userState.contactAgeOfFirstInjection : 0,
        
            // visit or isOutreach
            uid: userState.uid !== initialState.uid ? userState.uid : '',
            isOutreach: userState.isOutreach !== initialState.isOutreach ? userState.isOutreach : false,
            referrals: userState.referrals !== initialState.referrals ? userState.referrals : [null],
            syringesGiven: userState.syringesGiven !== initialState.syringesGiven ? userState.syringesGiven : 0,
            syringesTaken: userState.syringesTaken !== initialState.syringesTaken ? userState.syringesTaken : 0,
            narcanWasOffered: userState.narcanWasOffered !== initialState.narcanWasOffered ? userState.narcanWasOffered : false,
            narcanWasTaken: userState.narcanWasTaken !== initialState.narcanWasTaken ? userState.narcanWasTaken : false,
            enrollment: userState.enrollment !== initialState.enrollment ? userState.enrollment : '',
            numberOfOthersHelping: userState.numberOfOthersHelping !== initialState.numberOfOthersHelping ? userState.numberOfOthersHelping : 0,
        };
    }

    render() {

        const { intakeForm: {userState, initialState }, muiTheme: {palette} } = this.props;

        const userStateForDisplay = this.addDefaultValuesToIntakeForm({initialState, userState});

        const clearLabelStyle = {
            color: palette.errorColor
        }

        const fieldsStyle = {
            padding: '2rem',
        };

        // checkboxes to select which forms to show
        const formCheckboxOptionsArray = [
            {
                label: 'Visit or Outreach',
                defaultChecked: true, disabled: true
            },
            {
                label: 'First Contact',
                defaultChecked: false, disabled: false, onCheckCallback: () => this.updateIntakeFormField({key: 'showNewContactQuestions', val: !userStateForDisplay.showNewContactQuestions})
            },
            {
                label: 'Periodic',
                defaultChecked: false, disabled: false, onCheckCallback: () => this.updateIntakeFormField({key: 'showPeriodic', val: !userStateForDisplay.showPeriodic})
            },
        ];

        console.log('userStateForDisplay.eventDate', userStateForDisplay.eventDate);

        return (
            <form className="form">

                <Card>
                    <CardTitle title='Form Questions' titleColor={palette.primary1Color}/>
                    <div style={fieldsStyle}>
                    <DatePicker
                        hintText="Date"
                        floatingLabelText="Date"
                        value={userStateForDisplay.eventDate}
                        onChange={(e, date) => this.updateIntakeFormField({key: 'eventDate', val: date})}
                        autoOk={true}
                    />
                    </div>
                    <div
                        className="row"
                        style={{padding: '2rem'}}
                        >
                        {formCheckboxOptionsArray.map(option => (
                            <Checkbox
                                className="col-xs-12 col-sm-6 col-md-3"
                                key={option.label}
                                labelStyle={option.labelStyle}
                                style={option.style}
                                label={option.label}
                                defaultChecked={option.defaultChecked}
                                disabled={option.disabled}
                                onCheck={option.onCheckCallback}
                            />
                        ))}
                    </div>
                </Card>


                <VisitOrOutreachQuestions
                    // helpers
                    palette={palette}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    handleSliderChange={this.handleSliderChange.bind(this)}
                    buildSelectField={this.buildSelectField}
                    buildToggle={this.buildToggle}
                    buildRadio={this.buildRadio}
                    buildSlider={this.buildSlider}
                    // form data
                    isOutreach={userStateForDisplay.isOutreach}
                    referrals={userStateForDisplay.referrals}
                    syringesGiven={userStateForDisplay.syringesGiven}
                    syringesTaken={userStateForDisplay.syringesTaken}
                    narcanWasOffered={userStateForDisplay.narcanWasOffered}
                    narcanWasTaken={userStateForDisplay.narcanWasTaken}
                    enrollment={userStateForDisplay.enrollment}
                    numberOfOthersHelping={userStateForDisplay.numberOfOthersHelping}
                />

                {userStateForDisplay.showNewContactQuestions && <NewContactQuestionsForm
                    // helpers
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    handleSliderChange={this.handleSliderChange.bind(this)}
                    buildToggle={this.buildToggle}
                    buildSelectField={this.buildSelectField}
                    buildRadio={this.buildRadio}
                    buildSlider={this.buildSlider}
                    palette={palette}
                    // form data
                    contactDateOfBirth={userStateForDisplay.contactDateOfBirth}
                    contactGenderIdentity={userStateForDisplay.contactGenderIdentity}
                    contactEthnicity={userStateForDisplay.contactEthnicity}
                    contactIsHispanic={userStateForDisplay.contactIsHispanic}
                    contactCountryOfBirth={userStateForDisplay.contactCountryOfBirth}
                    contactAgeOfFirstInjection={userStateForDisplay.contactAgeOfFirstInjection}
                />}

                {userStateForDisplay.showPeriodic && <PeriodicQuestionsForm
                    // helpers
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    buildToggle={this.buildToggle}
                    buildSelectField={this.buildSelectField}
                    buildRadio={this.buildRadio}
                    palette={palette}
                    // form data
                    housingStatus={userStateForDisplay.housingStatus}
                    hivStatus={userStateForDisplay.hivStatus}
                    isInCareForHiv={userStateForDisplay.isInCareForHiv}
                    hepCStatus={userStateForDisplay.hepCStatus}
                    isInCareForHepC={userStateForDisplay.isInCareForHepC}
                    hasHealthInsurance={userStateForDisplay.hasHealthInsurance}
                    healthInsurer={userStateForDisplay.healthInsurer}
                    primaryDrug={userStateForDisplay.primaryDrug}
                    otherDrugs={userStateForDisplay.otherDrugs}
                    didOdLastYear={userStateForDisplay.didOdLastYear}
                    didSeeOdLastYear={userStateForDisplay.didSeeOdLastYear}
                />}

                <Card>
                    <div className="textAreaContainer">
                    <TextField
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        id="eventNotes"
                        floatingLabelText="Event Notes"
                        onChange={(e, value) => this.updateIntakeFormField({key: 'eventNotes', val: value})}
                    />
                    </div>
                </Card>

                <Card>
                    <div className="textAreaContainer">
                    <TextField
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        id="profileNotes"
                        floatingLabelText="Profile Notes"
                        onChange={(e, value) => this.updateIntakeFormField({key: 'profileNotes', val: value})}
                    />
                    </div>
                </Card>

                <Card>
                    <div className="submitButtons">
                    {/* TODO: handle this in a more elegant way than just reloading the page */}
                    <FlatButton label="Clear Form" labelStyle={clearLabelStyle} onClick={() => window.location.reload()} />
                    <FlatButton label="Save" primary={true} onClick={() => this.submitForm({initialState, userStateForDisplay})} />
                    </div>
                </Card>
            </form>
        )
    }
}

export default muiThemeable()(IntakeForm);
