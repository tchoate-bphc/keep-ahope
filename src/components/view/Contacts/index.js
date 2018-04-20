import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index'
import ProfileCard from 'components/view/Contacts/ProfileCard';
import NotesCard from 'components/view/Contacts/NotesCard';
// import EventsCard from '';
import { cyan600 } from 'material-ui/styles/colors'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class Contacts extends Component {
    constructor(props) {
        super(props);
        this.cardTitleColor = '#00bcd4';
        this.userInfo = {
            dateOfBirth: '3/21/87',
            race: 'White',
            gender: 'Female',
            ethnicity: 'German',
            firstInjectionAge: 19,
            hispanic: false
        }
    }

    buildCard = function(title) {
       return ( 
            <Card initiallyExpanded={true} >
                <CardHeader
                    title={title}
                    titleColor={this.cardTitleColor}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
       )
    }

    render() {
        const { user, contact, events } = this.props;

        return (
            <div className='page'>
                <ProfileCard titleColor={cyan600} userInfo={this.userInfo} />
                {this.buildCard('Events')}
                <NotesCard titleColor={cyan600} />
            </div>
        );
    }
}

export default Contacts;
