import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Grid from 'material-ui/Grid';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }


  render() {
    const {userInfo} = this.props;

    const infoKeyStyle = {
      color: '#90A4AE',
      'padding-right': '.5rem'
    }

    return (
      <div>
        <Card initiallyExpanded={true} >
          <CardHeader
              title='Profile'
              titleColor={this.props.titleColor}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div className="row">
              <div className="col-xs-6">
                <span style={infoKeyStyle}>DOB</span> 
                {userInfo.dateOfBirth}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Race</span> 
                {userInfo.race}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Gender</span> 
                {userInfo.gender}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Ethnicity</span> 
                {userInfo.ethnicity}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Age of first injection</span> 
                {userInfo.firstInjectionAge}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Hispanic</span> 
                {userInfo.hispanic ? 'True' : 'False'}
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default ProfileCard;
