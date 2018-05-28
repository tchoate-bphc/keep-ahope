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

import { createEvent } from 'actions';

import EverySixForm from 'components/view/ContactIntake/everySix.form';
import NewContactQuestionsForm from 'components/view/ContactIntake/newContactQuestions.form';
import OutreachQuestionsForm from 'components/view/ContactIntake/outreachQuestions.form';
import StandardQuestionsForm from 'components/view/ContactIntake/standardQuestions.form';

import * as moment from 'moment';

import './styles.css';


class IntakeForm extends Component {

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this)

        const todayDate = new Date();
        todayDate.setFullYear(todayDate.getFullYear());
        todayDate.setHours(0, 0, 0, 0);

        const initDateOfBirth = new Date(1980, 0, 1)

        // TODO: prepopulate with personal info
        this.state = {

            showEverySix: false,
            showOutreach: false,
            showNewContactQuestions: false,

            uid: this.props.user.uid,
            eventNotes: '',

            // form
            eventDate: todayDate,

            // every six
            housingStatus: 'homeless',
            hivStatus: 'neverTested',
            isInCareForHiv: false,
            hepCStatus: 'neverTested',
            isInCareForHepC: false,
            healthInsurer: 'MH',
            primaryDrug: 'heroin',
            didOdLastYear: false,
            didSeeOdLastYear: false,
            hasHealthInsurance: false,
            otherDrugs: null,

            // new contact
            newContactDate: '',
            contactDateOfBirth: initDateOfBirth,
            contactGenderIdentity: 'male',
            contactEthnicity: 'White',
            contactIsHispanic: false,
            contactCountryOfBirth: '',
            contactAgeOfFirstInjection: 0,

            // outreach
            syringesGiven: 0,
            syringesTaken: 0,
            narcanWasOffered: false,
            narcanWasTaken: false,
            enrollment: '',
            numberOfOthersHelping: 0,

            // standard
            referral: null,

            contactData: {
                uid: this.props.user.uid,
                dateOfBirth: initDateOfBirth,
                gender: "Male",
                race: "White",
                hispanic: false,
                countryOfBirth: "United States",
                ageOfFirstInjection: 0,
                profileNotes: "",
            }
        }

        this.initialState = this.state;
        this.submittedState = this.state;
    }



    submitForm() {
        // TODO: Ultimately should change these cases to prompts, not alert; but React errors for now
        // TODO: what about validation?
        if (this.initialState == this.state) {
        alert("Cannot post empty form")
        } else {
            // TODO: should call an action 'SUBMIT_FORM' or something
            // which should take the event and contact info, and call the update contact
            // action from within
        this.createEvent();
        this.updateContact();
        const { match: { params } } = this.props;
        // TODO: 'form submitted successfully' or something dialog
        this.props.history.push(`/contact/${params.uid}/info`)
        }
    }

    // TODO: dispatch updated contact profile
    createEvent() {
        this.props.dispatch(createEvent(this.state.eventData))
    }

    updateContact() {
        // this.props.dispatch(getContact(contactData))
    }

    // helpers
    buildRadio(title, radioOptionsList, name, updateCallback) {
        let radioControls = radioOptionsList.map(option => (
            <RadioButton
                key={option.name}
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
                <RadioButtonGroup name={name} onChange={updateCallback} defaultSelected={this.props[name]}>
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
                onToggle={(event, isInputChecked) => {
                    updateCallback(stateName, isInputChecked)
                }}
            />
        )
    };

    buildSelectField(title, selectOptionsList, name, updateCallback, multiple=false) {
        let selectControls = selectOptionsList.map(ethnicity => (
            <MenuItem
                key={ethnicity.value}
                primaryText={ethnicity.primaryText}
                value={ethnicity.value}
                name={name}
            />
        ));

        let labelStyle = {
            color: this.props.palette.primary3Color,
            margin: '2rem 0 1rem 0'
        };

        return (
            <div>
                <div style={labelStyle}>{title}</div>
                <SelectField
                    multiple={multiple}
                    value={this.props[name]}
                    style={{color: this.props.palette.primary1Color}}
                    name={name}
                    onChange={(e, index, value) => {
                        updateCallback(name, value)
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
            step: overrides.step || 1,
            min: overrides.min || 0,
            max: overrides.max || 15,
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
                    onChange={(e, value) => updateCallback(sliderName, value)}
                />
            </div>
        )
    }

    handleSliderChange(name, value) {
        this.setState({
            [name]: value
        });
    };

    handleChildInputChange(event, value) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleChildSelectChange(name, value) {
        this.setState({
            [name]: value
        });
    };

    handleChildToggleChange(name, isInputChecked) {
        this.setState({
            [name]: isInputChecked
        })
    }

    render() {

        const palette = this.props.muiTheme.palette;

        const clearLabelStyle = {
        color: palette.errorColor
        }

        const fieldsStyle = {
            padding: '2rem',
        };

        // checkboxes to select which forms to show
        const checkBoxLabelStyle = { width: 'auto' };
        const checkboxOptionStyle = { width: 'auto' };
        const formCheckboxOptionsArray = [
            {
                labelStyle: checkBoxLabelStyle, style: checkboxOptionStyle, label: 'Standard Questions',
                defaultChecked: true, disabled: true
            },
            {
                labelStyle: checkBoxLabelStyle, style: checkboxOptionStyle, label: 'First Contact',
                defaultChecked: false, disabled: false, onCheckCallback: () => this.setState({showNewContactQuestions: !this.state.showNewContactQuestions})
            },
            {
                labelStyle: checkBoxLabelStyle, style: checkboxOptionStyle, label: 'Outreach',
                defaultChecked: false, disabled: false, onCheckCallback: () => this.setState({showOutreach: !this.state.showOutreach})
            },
            {
                labelStyle: checkBoxLabelStyle, style: checkboxOptionStyle, label: 'Every Six',
                defaultChecked: false, disabled: false, onCheckCallback: () => this.setState({showEverySix: !this.state.showEverySix})
            },
        ];

        return (
            <form className="form">

                <Card>
                    <CardTitle title='Form Questions' titleColor={palette.primary1Color}/>
                    <div style={fieldsStyle}>
                    {/* FIXME: */}
                    <DatePicker
                        hintText="Date"
                        floatingLabelText="Date"
                        value={this.state.eventDate}
                        onChange={(e, date) => this.setState({eventDate: date})}
                        autoOk={true}
                    />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            padding: '1rem 0',
                            justifyContent: 'space-around',
                        }}
                        >
                        {formCheckboxOptionsArray.map(option => (
                            <Checkbox
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


                <StandardQuestionsForm
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    buildSelectField={this.buildSelectField}
                    palette={palette}
                    // form data
                    referral={this.state.referral}
                />

                {this.state.showEverySix && <EverySixForm
                    // helpers
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    buildToggle={this.buildToggle}
                    buildSelectField={this.buildSelectField}
                    buildRadio={this.buildRadio}
                    palette={palette}
                    // form data
                    housingStatus={this.state.housingStatus}
                    hivStatus={this.state.hivStatus}
                    isInCareForHiv={this.state.isInCareForHiv}
                    hepCStatus={this.state.hepCStatus}
                    isInCareForHepC={this.state.isInCareForHepC}
                    hasHealthInsurance={this.state.hasHealthInsurance}
                    healthInsurer={this.state.healthInsurer}
                    primaryDrug={this.state.primaryDrug}
                    otherDrugs={this.state.otherDrugs}
                    odLastYear={this.state.didOdLastYear}
                    sawOdLastYear={this.state.didSeeOdLastYear}
                />}

                {this.state.showNewContactQuestions && <NewContactQuestionsForm
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
                    contactDateOfBirth={this.state.contactDateOfBirth}
                    contactGenderIdentity={this.state.contactGenderIdentity}
                    contactEthnicity={this.state.contactEthnicity}
                    contactIsHispanic={this.state.contactIsHispanic}
                    contactCountryOfBirth={this.state.contactCountryOfBirth}
                    contactAgeOfFirstInjection={this.state.contactAgeOfFirstInjection}
                />}

                {this.state.showOutreach && <OutreachQuestionsForm
                    // helpers
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    handleSliderChange={this.handleSliderChange.bind(this)}
                    buildToggle={this.buildToggle}
                    buildRadio={this.buildRadio}
                    buildSlider={this.buildSlider}
                    palette={palette}
                    // form data
                    syringesGiven={this.state.syringesGiven}
                    syringesTaken={this.state.syringesTaken}
                    narcanWasOffered={this.state.narcanWasOffered}
                    narcanWasTaken={this.state.narcanWasTaken}
                    enrollment={this.state.enrollment}
                    numberOfOthersHelping={this.state.numberOfOthersHelping}
                />}

                <Card>
                    <div className="textAreaContainer">
                    <TextField
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        id="eventNotes"
                        floatingLabelText="Event Notes"
                        onChange={(e, value) => this.setState({eventNotes: value})}
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
                        onChange={(e, value) => this.setState({profileNotes: value})}
                    />
                    </div>
                </Card>

                <Card>
                    <div className="submitButtons">
                    {/* TODO: handle this in a more elegant way than just reloading the page */}
                    <FlatButton label="Clear Form" labelStyle={clearLabelStyle} onClick={() => window.location.reload()} />
                    <FlatButton label="Save" primary={true} onClick={this.submitForm} />
                    </div>
                </Card>
            </form>
        )
    }
}

export default muiThemeable()(IntakeForm);
