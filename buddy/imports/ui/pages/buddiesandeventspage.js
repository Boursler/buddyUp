/*// top-level page, will call layout inside of here and I'm thinking logic will
// happen here?
import PropTypes from 'prop-types'
<<<<<<< HEAD
import React, {Component} from 'react'
import events from '../layouts/EventsLayout'

// top-level page, will call layout inside of here and I'm thinking logic will
// happen here?
import PropTypes from 'prop-types'
import React, {Component} from 'react'
=======
import React, { Component } from 'react'
>>>>>>> 109a450... Refactor code to call out to layouts/events

import {
    Button,
    Divider,
    Grid,
    Container,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility
} from 'semantic-ui-react'
import EventsLayout from '../layouts/EventsLayout';


class buddiesandevents extends Component {

    render() {
        return(
          <EventsLayout/>
        );

    };
}

export default buddiesandevents;*/
