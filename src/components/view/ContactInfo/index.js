import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index';
import ContactProfileCard from './contactInfoProfileCard';
import ContactNotesCard from './contactInfoNotesCard';
// import EventsCard from '';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ContactInfo extends Component {

    render() {

        const { user, uid, contact, muiTheme: {palette} } = this.props;

        return (
            <div>

                <h2>Contacts</h2>
                {contact.birthCountry}
                <pre>UID from URL: <span style={{color:'red'}}>{uid}</span></pre>

                <div>
                    <ContactProfileCard titleColor={palette.primary1Color} contact={contact} />
                    <ContactNotesCard titleColor={palette.primary1Color} />
                </div>

            </div>
        );
    }
}

export default muiThemeable()(ContactInfo);
