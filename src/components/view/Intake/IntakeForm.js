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

import { createEvent, updateCurrentContact } from 'actions';

import './styles.css';


class IntakeForm extends Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.themePalette = this.props.muiTheme.palette;
  }

  state = {
    value: 1,
  }

  handleChange(event, index, value) {
    this.setState({value})
  }

  submitForm() {
    console.log("save form")
    const eventData = {}
    const contactData = {}
    // dispatch(createEvent(eventData))
    // dispatch(updateCurrentContact(contactData))
  }

  render() {

    const selectedMenuItemStyles = {
      color: this.themePalette.primary1Color
    }

    const textareaStyles = {
      width: '100%'
    }

    const clearLabelStyle = {
      color: this.themePalette.errorColor
    }

    return (
      <div className="page">
        <Card className="card">
          <CardTitle>
            Form Questions
          </CardTitle>
          <div className="checkbox">
            <Checkbox label="Intake" checked={true} />
            <Checkbox label="New" />
            <Checkbox label="Periodic" />
          </div>
        </Card>

        <Card className="card">
          <CardTitle>
            Form Questions
          </CardTitle>
          <Toggle label="No Refill" defaultToggled={false} labelPosition="right" />
          <TextField hintText="Date" />

          <p>Syringes Given</p>
          <Slider name="SyringesGiven" defaultValue={0} step={1} min={0} max={10} id="syringesGiven" />

          <p>Syringes Taken</p>
          <Slider name="SyringesTaken" defaultValue={0} min={0} max={10} id="syringesTaken" />

          <SelectField
            value={this.state.value}
            onChange={this.handleChange}
            selectedMenuItemStyle={selectedMenuItemStyles}
            id="referrals"
          >
            <MenuItem value={1} primaryText="No Referrals" />
            <MenuItem value={2} primaryText="Referrals" />
          </SelectField>

          <div className="checkbox">
            <div>
              <label>Used</label>
              <Checkbox label="No" id="ifUsed" checked={false} />
            </div>

            <div>
              <label>Given</label>
              <Checkbox label="No" id="ifGiven" checked={false} />
            </div>
          </div>

          <p>Number of People</p>
          <Slider name="NumPeople" defaultValue={0} min={0} max={10} id="numPeople" />
        </Card>

        <Card className="card">
          <CardTitle>
            Event Notes
          </CardTitle>
          <TextField
            multiLine={true}
            rows={5}
            style={textareaStyles}
            id="eventNotes"
          />
        </Card>

        <Card className="card">
          <CardTitle>
            Profile Notes
          </CardTitle>
          <TextField
            multiLine={true}
            rows={5}
            style={textareaStyles}
            id="profileNotes"
          />
        </Card>

        <Card className="card">
          <FlatButton label="Clear Form" labelStyle={clearLabelStyle} />
          <FlatButton label="Save" primary={true} onClick={this.submitForm} />
        </Card>

      </div>
    )

  }

}

export default muiThemeable()(IntakeForm);
