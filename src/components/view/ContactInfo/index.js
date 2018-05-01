import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index';
import ContactProfileCard from 'components/view/Contact/ContactProfileCard';
import ContactNotesCard from 'components/view/Contact/ContactNotesCard';
// import EventsCard from '';
import { cyan600 } from 'material-ui/styles/colors'

class ContactInfo extends Component {

    render() {

        const { user, uid, contact } = this.props;

        return (
            <div>

                <h2>Contacts</h2>
                {contact.birthCountry}
                <pre>UID from URL: <span style={{color:'red'}}>{uid}</span></pre>

                <div>
                    <ContactProfileCard titleColor={cyan600} contact={contact} />
                    {/* <CamdenEventCard titleColor={cyan600} events={contact.events} /> */}
                    <ContactNotesCard titleColor={cyan600} />
                </div>

            </div>
        );
    }
}

export default ContactInfo;
