// top level layout: will include things like navbar, button placement, areas of text 
import PropTypes from 'prop-types'
import React, { Component } from 'react'
<<<<<<< HEAD
//import Container from '../components/Container'
=======
import Menu from '../components/Menu'
import VerticalMenu from '../components/VerticalMenu';
>>>>>>> 4d84344... update event api setup

import {
  Button,
  Divider,
  Grid,
  Container,
  Header,
  Icon,
  Image,
  List,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

class event extends React.Component {

    state = {
        result: {},
        search: []
    };

    constructor(props) {

        super(props);
        this.state.search = {
            search: '',
            animals: '',
            art: '',
            books: '',
            festivals_parades: '',
            food: '',
            fundraisers: '',
            holiday: '',
            music: '',
            outdoors_recreation: '',
            science: '',
            singles_social: '',
            sports: '',
            location: '',
            distance: ''
        };

        this.handleChange = this
            .handleChange
            .bind(this);

    };
}

handleChange(event) {
    this
        .search
        .setState({
            [event.target.name]: event.target.value
        });
};

searchEvents = query => {

    Meteor
        .call('geoJsonForIp', query, function (err, res) {
            // The method call sets the Session variable to the callback value
            if (err) {
                Session.set(this.state.result, {error: err});
            } else {
                Session.set(this.state.result, res);
                return res;
            }
        });
}

handleFormSubmit = event => {
    const queryURL = {
        search: {
            type: UrlQueryParamTypes.string,
            queryParam: this.state.search.search
        },
        'ex-category': {
            type: UrlQueryParamTypes.string,
            queryParam: 'attractions,comedy,community,family_fun_kids,movies_film,performing_arts,schools' +
                    '_alumni,support,technology'
        },
        location: {
            type: UrlQueryParamTypes.string,
            queryParam: this.state.search.location
        },
        distance: {
            type: UrlQueryParamTypes.string,
            queryParam: this.state.search.distance
        },
        category: {
            type: UrlQueryParamTypes.string,
            queryParam:join(Object.value(this.state.search))
    }
};

    event.preventDefault();
    this.searchEvents(queryURL);
};
export default event;
