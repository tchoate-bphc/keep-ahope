import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import { Card, CardTitle } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

import { createEvent } from 'actions';

import * as moment from 'moment';

import './styles.css';


class IntakeForm extends Component {

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.checkNarcanOffered = this.checkNarcanOffered.bind(this)
    this.checkNarcanGiven = this.checkNarcanGiven.bind(this)
    this.selectReferrals = this.selectReferrals.bind(this)
    this.selectRace = this.selectRace.bind(this)
    this.setEventDate = this.setEventDate.bind(this)
    this.setDateOfBirth = this.setDateOfBirth.bind(this)
    this.updateCheckNewContact = this.updateCheckNewContact.bind(this)
    this.updateCheckOutreach = this.updateCheckOutreach.bind(this)
    this.updateEnrollmentRefill = this.updateEnrollmentRefill.bind(this)
    this.updateGender = this.updateGender.bind(this)
    this.updateCountryOfBirth = this.updateCountryOfBirth.bind(this)
    this.updateSyringesGiven = this.updateSyringesGiven.bind(this)
    this.updateSyringesTaken = this.updateSyringesTaken.bind(this)
    this.updateNumPeople = this.updateNumPeople.bind(this)
    this.updateEventNotes = this.updateEventNotes.bind(this)
    this.updateProfileNotes = this.updateProfileNotes.bind(this)

    this.themePalette = this.props.muiTheme.palette

    const todayDate = new Date();
    todayDate.setFullYear(todayDate.getFullYear());
    todayDate.setHours(0, 0, 0, 0);

    this.initDateOfBirth = new Date(1980, 0, 1)

    // TODO: prepopulate with personal info
    this.state = {
      newContact: false,
      outreach: false,
      narcanOfferedLabel: "No",
      narcanGivenLabel: "No",

      eventData: {
        uid: this.props.user.uid,
        eventDate: todayDate,
        enrollmentRefill: "enrollment",
        syringesGiven: "N/A",
        syringesTaken: "N/A",
        referrals: "No Referrals",
        narcanOffered: false,
        narcanGiven: false,
        numPeople: 0,
        eventNotes: ""
      },

      // TODO: is this good enough for handling defaults?
      contactData: {
        uid: this.props.contact.uid,
        dateOfBirth: this.initDateOfBirth,
        gender: this.props.contact.genderIdentity || "Male",
        race: this.props.contact.ethnicity || "White",
        hispanic: this.props.contact.hispanic || false,
        countryOfBirth: this.props.contact.birthCountry || "US",
        ageOfFirstInjection: this.props.contact.firstInjectionAge || 18,
        profileNotes: "",
      }
    }

    this.initialState = this.state;
    this.submittedState = this.state;
  }

  // see https://reactjs.org/docs/react-component.html#constructor
  // the constructor is only ever called during mount so if the contact changes, like if we allow
  // firebase to update us whenever it changes, then we want to make sure that it's reflected in the
  // form, or else it may override contact data that was just set elsewhere
  getDerivedStateFromProps(newProps) {
      return {
          contactData: {
                uid: this.newProps.contact.uid,
                dateOfBirth: this.initDateOfBirth,
                gender: this.newProps.contact.genderIdentity || "Male",
                race: this.newProps.contact.ethnicity || "White",
                hispanic: this.newProps.contact.hispanic || false,
                countryOfBirth: this.newProps.contact.birthCountry || "US",
                ageOfFirstInjection: this.newProps.contact.firstInjectionAge || 18,
                profileNotes: "",
            }
        };
  }

  checkNarcanOffered() {
    var eventData = {...this.state.eventData}
    if (this.state.eventData.narcanOffered == false) {
      this.setState({eventData: {narcanOffered: true}, narcanOfferedLabel: "Yes"});
    } else {
      this.setState({eventData: {narcanOffered: false}, {narcanOfferedLabel: "No"});
    }
  }

  checkNarcanGiven() {
    var eventData = {...this.state.eventData}
    if (this.state.eventData.narcanGiven == false) {
      this.setState({eventData: {narcanGiven: true}, narcanGivenLabel: "Yes"});
    } else {
      this.setState({eventData: {narcanGiven: false}, narcanGivenLabel: "False"});
    }
  }

  selectReferrals(event, index, referrals) {
    this.setState({eventData: {referrals}});
  }

  selectRace(event, index, race) {
    this.setState({contactData: {race}})
  }

  setEventDate(event, eventDate) {
    this.setState({eventData: {eventDate}})
  }

  setDateOfBirth(event, dateOfBirth) {
    this.setState({contactData: {dateOfBirth}});
  }

  updateGender(event, gender) {
    this.setState({contactData: {gender}});
  }

  updateEnrollmentRefill(event, enrollmentRefill) {
    this.setState({eventData: {enrollmentRefill}})
  }

  updateCountryOfBirth(event, countryOfBirth) {
    this.setState({contactData: {countryOfBirth}})
  }

  updateSyringesGiven(event, syringesGiven) {
    this.setState({eventData: {syringesGiven}})
  }

  updateSyringesTaken(event, syringesTaken) {
    this.setState({eventData: {syringesTaken}})
  }

  updateNumPeople(event, numPeople) {
    this.setState({eventData: {numPeople}})
  }

  updateProfileNotes(event, contactData) {
    this.setState({contactData: {contactData}})
  }

  updateEventNotes(event, eventNotes) {
    this.setState({eventData: {eventNotes}})
  }

  updateCheckNewContact() {
    this.setState({newContact: !this.state.newContact})
  }

  updateCheckOutreach() {
    this.setState({outreach: !this.state.outreach})
  }

  submitForm() {
    // Ultimately should change these cases to prompts, not alert; but React errors for now
    if (this.initialState == this.state) {
      alert("Cannot post empty form")
    } else if (this.submittedState == this.state) {
      alert("Cannot post duplicate")
    } else {
      const { dispatch } = this.props;
      this.createEvent(dispatch)
      this.updateContact(dispatch)
      this.submittedState = this.state;
    }
  }

  clearForm() {
    // Ultimately should change this to a prompt, not alert; but React errors for now
    // TODO: update checkboxes
    alert("Are you sure you want to clear the form?")
    this.setState(this.initialState)
    this.setState({toggleRefillLabel: "No Refill"})
    this.setState({narcanOfferedLabel: "No"})
    this.setState({narcanGivenLabel: "No"})
    this.setState({narcanOffered: false})
    this.setState({narcanGiven: false})
  }

  // TODO: dispatch updated contact profile
  createEvent(dispatch) {
    dispatch(createEvent(this.state.eventData))
  }

  updateContact(dispatch) {
    // dispatch(getContact(contactData))
  }

  render() {

    const selectedMenuItemStyles = {
      color: this.themePalette.primary1Color
    }

    const textareaStyles = {
      width: '100%',
    }

    const clearLabelStyle = {
      color: this.themePalette.errorColor
    }

    const titleColorStyle = {
      color: this.themePalette.primary1Color
    }

    const labelStyle = {
      color: this.themePalette.primary3Color,
      margin: '2rem 0 0'
    }

    const toggleStyles = {
      margin: '2rem 0 1rem'
    }

    const newContact = this.state.newContact ? (
      <Card className="card">
        <CardTitle style={titleColorStyle}>First Contact</CardTitle>
        <div className="fields">

          <DatePicker
            hintText="Date of Birth"
            floatingLabelText="Date of Birth"
            value={this.state.contactData.dateOfBirth}
            onChange={this.setDateOfBirth}
            autoOk={true}
            openToYearSelection={true}
          />

          <div>
            <div style={labelStyle}>
              Gender Identit
            </div>
            <RadioButtonGroup
              name="gender"
              className="radio"
              onChange={(e, value) => this.updateGender(e, value)}
            >
              <RadioButton
                label="Male"
                value="male"
              />
              <RadioButton
                label="Female"
                value="female"
              />
              <RadioButton
                label="MtF"
                value="mtf"
              />
              <RadioButton
                label="FtM"
                value="ftm"
              />
              <RadioButton
                label="Refused"
                value="refused"
              />
            </RadioButtonGroup>
          </div>

          <div>
            <div style={labelStyle}>Race/Ethnicity</div>
            <SelectField
              value={this.state.contactData.race}
              onChange={this.selectRace}
              selectedMenuItemStyle={selectedMenuItemStyles}
              id="race"
            >
              <MenuItem primaryText="American Indian" value="AI" />
              <MenuItem primaryText="Asian" value="Asian" />
              <MenuItem primaryText="Black/African American" value="BAA" />
              <MenuItem primaryText="Hawaiian/Pacific Islander" value="HPI "/>
              <MenuItem primaryText="White" value="White" />
              <MenuItem primaryText="Other" value="Other" />
              <MenuItem primaryText="Prefer not to say" value="Refuse" />
            </SelectField>
          </div>

          <Toggle
            label="Hispanic"
            defaultToggled={false}
            labelPosition="right"
            style={toggleStyles}
          />

          <div>
            <div style={labelStyle}>
              Country of Birth
            </div>
            <RadioButtonGroup
              name="countryOfBirth"
              className="radio"
              defaultSelected="US"
              onChange={(e, value) => this.updateCountryOfBirth(e, value)}
            >
              <RadioButton
                label="US"
                value="US"
              />
              <RadioButton
                label="Puerto Rico"
                value="PR"
              />
              <RadioButton
                label="Other"
                value="Other"
              />
            </RadioButtonGroup>
          </div>

          <div id="ageOfFirstInjection">
            <div style={labelStyle}>Age of First Injection</div>
            <Slider name="ageOfFirstInjection" defaultValue={0} min={0} max={80} />
          </div>

        </div>
      </Card>
    ) : (
      <div></div>
    )

    const outreach = this.state.outreach ? (
      <Card className="card">
        <CardTitle style={titleColorStyle}>Outreach</CardTitle>
        <div className="fields">

          <div id="syringesGiven">
            <div style={labelStyle}>Syringes Given</div>
            <Slider
              name="SyringesGiven"
              defaultValue={0}
              step={1}
              min={0}
              max={10}
              onChange={(e, value) => this.updateSyringesGiven(e, value)}
            />
          </div>

          <div id="syringesTaken">
            <div style={labelStyle}>Syringes Taken</div>
            <Slider
              name="SyringesTaken"
              defaultValue={0}
              step={1}
              min={0}
              max={10}
              onChange={(e, value) => this.updateSyringesTaken(e, value)}
            />
          </div>

          <div className="checkbox narcanOfferedGiven">
            <div className="narcanOffered">
              <div style={labelStyle}>Narcan Offered</div>
              <Checkbox
                label={this.state.narcanOfferedLabel}
                defaultChecked={false}
                onClick={() => this.checkNarcanOffered()}
              />
            </div>

            <div className="narcanGiven">
              <div style={labelStyle}>Narcan Given</div>
              <Checkbox
                label={this.state.narcanGivenLabel}
                defaultChecked={false}
                onClick={() => this.checkNarcanGiven()}
              />
            </div>
          </div>

          <div style={labelStyle}>Enrollment or Refill</div>
          <RadioButtonGroup
            name="enrollmentRefill"
            className="radio"
            defaultSelected="Enrollment"
            onChange={(e, value) => this.updateEnrollmentRefill(e, value)}
          >
            <RadioButton
              label="Enrollment"
              value="Enrollment"
            />
            <RadioButton
              label="Refill"
              value="Refill"
            />
          </RadioButtonGroup>

          <div style={labelStyle}>Number of People</div>
          <Slider
            name="NumPeople"
            defaultValue={0}
            step={1}
            min={0}
            max={10}
            id="numPeople"
            onChange={(e, value) => this.updateNumPeople(e, value)}
          />

        </div>
      </Card>
    ) : (
      <div></div>
    )

    return (
      <div className="page">
        <form className="form">

          <Card className="card">
            <div className="fields">
              <DatePicker
                hintText="Date"
                floatingLabelText="Date"
                value={this.state.eventData.eventDate}
                onChange={this.setEventDate}
                autoOk={true}
              />
            </div>
          </Card>

          <Card className="card">
            <div className="checkbox">
              <Checkbox
                label="Standard Questions"
                defaultChecked={true}
                disabled={true}
              />
              <Checkbox
                label="First Contact"
                onCheck={this.updateCheckNewContact.bind(this)}
              />
              <Checkbox
                label="Outreach"
                onCheck={this.updateCheckOutreach.bind(this)}
              />
            </div>
          </Card>

          <Card className="card">
            <CardTitle style={titleColorStyle}>Standard Questions</CardTitle>
            <div className="fields">

              <SelectField
                value={this.state.eventData.referrals}
                onChange={this.selectReferrals}
                selectedMenuItemStyle={selectedMenuItemStyles}
                id="referrals"
                floatingLabelText="Any referrals?"
              >
                <MenuItem value="No Referrals" primaryText="No Referrals" />
                <MenuItem value="Referrals" primaryText="Referrals" />
              </SelectField>

            </div>
          </Card>

          {newContact}

          {outreach}

          <Card className="card">
            <div className="textAreaContainer">
              <TextField
                multiLine={true}
                rows={5}
                style={textareaStyles}
                id="eventNotes"
                floatingLabelText="Event Notes"
                onChange={(e, value) => this.updateEventNotes(e, value)}
              />
            </div>
          </Card>

          <Card className="card">
            <div className="textAreaContainer">
              <TextField
                multiLine={true}
                rows={5}
                style={textareaStyles}
                id="profileNotes"
                floatingLabelText="Profile Notes"
                onChange={(e, value) => this.updateProfileNotes(e, value)}
              />
            </div>
          </Card>

          <Card className="card">
            <div className="submitButtons">
              <FlatButton label="Clear Form" labelStyle={clearLabelStyle} onClick={this.clearForm} />
              <FlatButton label="Save" primary={true} onClick={this.submitForm} />
            </div>
          </Card>
        </form>
      </div>
    )

  }

}

export default muiThemeable()(IntakeForm);
