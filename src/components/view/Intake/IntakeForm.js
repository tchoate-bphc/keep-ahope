import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import Paper from 'material-ui/Paper';

import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

import { createEvent, getContact } from 'actions';

import * as moment from 'moment';

import './styles.css';


class IntakeForm extends Component {

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this)
    this.toggleRefill = this.toggleRefill.bind(this)
    this.checkNarcanOffered = this.checkNarcanOffered.bind(this)
    this.checkNarcanGiven = this.checkNarcanGiven.bind(this)
    this.selectReferrals = this.selectReferrals.bind(this)
    this.selectRace = this.selectRace.bind(this)
    this.setEventDate = this.setEventDate.bind(this)
    this.setDateOfBirth = this.setDateOfBirth.bind(this)
    this.updateCheckNewContact = this.updateCheckNewContact.bind(this)
    this.updateCheckOutreach = this.updateCheckOutreach.bind(this)

    this.themePalette = this.props.muiTheme.palette

    const todayDate = new Date();
    todayDate.setFullYear(todayDate.getFullYear());
    todayDate.setHours(0, 0, 0, 0);

    const initDateOfBirth = new Date(1980, 0, 1)

    this.state = {
      newContact: false,
      outreach: false,
      toggleRefillLabel: "No Refill",
      narcanOfferedLabel: "No",
      narcanGivenLabel: "No",
      eventData: {
        eventDate: todayDate,
        refill: "no",
        syringesGiven: "N/A",
        syringesTaken: "N/A",
        referrals: "No Referrals",
        narcanOffered: "no",
        narcanGiven: "no",
        numPeople: "N/A",
        eventNotes: ""
      },
      contactData: {
        uid: "jnde123199abc",
        dateOfBirth: initDateOfBirth,
        countryOfBirth: "United States",
        profileNotes: "",
        race: "White",
        gender: "Male",
        ageOfFirstInjection: 0,
      }
    }
  }

  toggleRefill() {
    if (this.state.toggleRefillLabel == "Refill") {
      this.setState({toggleRefillLabel: "No Refill"})
    } else {
      this.setState({toggleRefillLabel: "Refill"})
    }
  }

  checkNarcanOffered() {
    var eventData = {...this.state.eventData}
    if (this.state.eventData.narcanOffered == "no") {
      this.setState({narcanOfferedLabel: "Yes"})
      eventData.narcanOffered = "yes";
      this.setState({eventData})
    } else {
      this.setState({narcanOfferedLabel: "No"})
      eventData.narcanOffered = "no";
      this.setState({eventData})
    }
  }

  checkNarcanGiven() {
    var eventData = {...this.state.eventData}
    if (this.state.eventData.narcanGiven == "no") {
      this.setState({givenLabel: "Yes"})
      eventData.narcanGiven = "yes";
      this.setState({eventData})
    } else {
      this.setState({givenLabel: "No"})
      eventData.narcanGiven = "no";
      this.setState({eventData})
    }
  }

  selectReferrals(event, index, value) {
    var eventData = {...this.state.eventData}
    eventData.referrals = value
    this.setState({eventData})
  }

  selectRace(event, index, value) {
    var contactData = {...this.state.contactData}
    contactData.race = value
    this.setState({contactData})
  }

  setEventDate(event, value) {
    var eventData = {...this.state.eventData}
    eventData.eventDate = value
    this.setState({eventData})
  }

  setDateOfBirth(event, value) {
    var contactData = {...this.state.contactData}
    contactData.dateOfBirth = value
    this.setState({contactData})
  }

  submitForm() {
    const { dispatch } = this.props;
    this.createEvent(dispatch)
    this.updateContact(dispatch)
  }

  createEvent(dispatch) {
    dispatch(createEvent(this.state.eventData))
  }

  updateContact(dispatch) {
    // dispatch(getContact(contactData))
  }

  updateCheckNewContact() {
    this.setState({newContact: !this.state.newContact})
  }

  updateCheckOutreach() {
    this.setState({outreach: !this.state.outreach})
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
      'color': '#999'
    }

    const labelStyle = {
      'color': this.themePalette.primary3Color,
      'padding': '1rem 0 .5rem'
    }

    const newContact = this.state.newContact ? (
      <Card className="card">
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
              Gender
            </div>
            <RadioButtonGroup
              name="gender"
              className="radio"
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

          <div id="ageOfFirstInjection">
            <div style={labelStyle}>Age of First Injection</div>
            <Slider name="ageOfFirstInjection" defaultValue={0} min={0} max={80} />
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

          <Toggle label="Hispanic" defaultToggled={false} labelPosition="right" />

          <div>
            <div style={labelStyle}>
              Country of Birth
            </div>
            <RadioButtonGroup
              name="countryOfBirth"
              className="radio"
              defaultSelected="US"
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
        </div>
      </Card>
    ) : (
      <div></div>
    )

    const outreach = this.state.outreach ? (
      <Card className="card">
        <div className="fields">
          <div id="syringesGiven">
            <div style={labelStyle}>Syringes Given</div>
            <Slider
              name="SyringesGiven"
              defaultValue={0}
              step={1}
              min={0}
              max={10}
            />
          </div>

          <div id="syringesTaken">
            <div style={labelStyle}>Syringes Taken</div>
            <Slider
              name="SyringesTaken"
              defaultValue={0}
              min={0}
              max={10}
            />
          </div>
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
            <CardTitle style={titleColorStyle}>
              Form Questions
            </CardTitle>
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
                label="Return Visit"
                onCheck={this.updateCheckOutreach.bind(this)}
              />
            </div>
          </Card>

          {newContact}

          {outreach}

          <Card className="card">
            <div className="fields">

              <Toggle
                label={this.state.toggleRefillLabel}
                defaultToggled={false}
                labelPosition="right"
                className="toggle"
                onClick={(e) => this.toggleRefill(e)}
              />

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

              <p>Number of People</p>
              <Slider
                name="NumPeople"
                defaultValue={0}
                min={0}
                max={10}
                id="numPeople"
              />
            </div>
          </Card>

          <Card className="card">
            <CardTitle style={titleColorStyle}>
              Event Notes
            </CardTitle>
            <div className="textAreaContainer">
              <TextField
                multiLine={true}
                rows={5}
                style={textareaStyles}
                id="eventNotes"
              />
            </div>
          </Card>

          <Card className="card">
            <CardTitle style={titleColorStyle}>
              Profile Notes
            </CardTitle>
            <div className="textAreaContainer">
              <TextField
                multiLine={true}
                rows={5}
                style={textareaStyles}
                id="profileNotes"
              />
            </div>
          </Card>

          <Card className="card">
            <div className="submitButtons">
              <FlatButton label="Clear Form" labelStyle={clearLabelStyle} />
              <FlatButton label="Save" primary={true} onClick={this.submitForm} />
            </div>
          </Card>
        </form>
      </div>
    )

  }

}

export default muiThemeable()(IntakeForm);
