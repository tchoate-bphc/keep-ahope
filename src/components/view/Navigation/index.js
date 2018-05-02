import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import { blueGrey600, cyan600 } from 'material-ui/styles/colors'

import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ChromeReaderModeIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';
import PersonOutlineIcon from 'material-ui/svg-icons/social/person-outline';
import GroupIcon from 'material-ui/svg-icons/social/group';
import GroupAddIcon from 'material-ui/svg-icons/social/group-add';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import EventNoteIcon from 'material-ui/svg-icons/notification/event-note';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';

import Avatar from 'material-ui/Avatar';

import { getImageForEnv } from 'static/images/index'

import './styles.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToRoute = this.navigateToRoute.bind(this);
        this.themePalette = this.props.muiTheme.palette;
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    navigateToRoute (someArg, evt, tabEl) {
        // close any open event item
        // this.toggleEventDetail();
        // navigate
        this.props.history.push(tabEl.props['data-route']);
    };

    getMenuItemHandler (routeName)
    {
        var that = this;
        return function ()
        { 
            that.setState({open: false});
            that.props.history.push(routeName);
        };    
    }

    handleLogout = () => {this.setState({open: false}); this.props.logout()}

    render () {
        const { user, logout } = this.props;

        // TODO: restore this back in once google authentication issue is resolved for me.
        // if the user hasn't logged in, then render nothing.
        // if (!user.uid || 0 === user.uid.length) return (<div/>);

        return (
            <div>
                <IconButton onClick={this.handleToggle} style={{width: 60, height: 60, padding: 0}}>
                    <Avatar size={60} icon={<PersonOutlineIcon/>}/>
                </IconButton>
                {'Welcome, ' + user.displayName}
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onClick={this.getMenuItemHandler("/contact")} primaryText="Contact" leftIcon={<PersonIcon/>}/>
                    <MenuItem onClick={this.getMenuItemHandler("/reports")} primaryText="Report" leftIcon={<EventNoteIcon/>}/>
                    <MenuItem onClick={this.getMenuItemHandler("/users")} primaryText="Add Users" leftIcon={<GroupAddIcon/>}/>
                    <MenuItem onClick={this.handleLogout} primaryText="Logout" leftIcon={<ExitToAppIcon/>}/>
                </Drawer>
            </div>
        );  
    }
}

export default muiThemeable()(Navigation);
