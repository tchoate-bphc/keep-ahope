import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index';
import ContactProfileCard from 'components/view/Contact/ContactProfileCard';
import ContactNotesCard from 'components/view/Contact/ContactNotesCard';
// import EventsCard from '';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ContactInfo extends Component {

    render() {

        const { user, uid, contact } = this.props;
        const themePalette = this.props.muiTheme.palette;

        return (
            <div>

                <h2>Contacts</h2>
                {contact.birthCountry}
                <pre>UID from URL: <span style={{color:'red'}}>{uid}</span></pre>

                <div>
                    <ContactProfileCard titleColor={themePalette.primary1Color} contact={contact} />
                    <ContactNotesCard titleColor={themePalette.primary1Color} />
                </div>

            </div>
        );
    }
}

export default muiThemeable()(ContactInfo);
