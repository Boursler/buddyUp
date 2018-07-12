// top level layout: will include things like navbar, button placement, areas of
// text
import PropTypes from "prop-types";
import React, {Component} from "react";
import Menu from "../components/Menu";
import {VerticalMenu} from "../components/VerticalMenu";
import {Event} from "../components/Event";
import {EventList} from "../components/EventList"
import {addUrlProps, UrlQueryParamTypes} from 'react-url-query';
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

export default class EventsLayout extends React.Component {

    state = {
        result: {},
        search: {}
    }
    constructor() {
        super();
        this.state.search = {
            search: '',
            arts: '',
            coffee: '',
            food: '',
            reading: '',
            sports: '',
            science: '',
            concert: '',
            pets: '',
            festivals: '',
            happyHour: '',
            volunteer: '',
            holiday: '',
            zipCode: '',
            distance: '' || 50,
            date: ''
        };

        this.handleChange = this
            .handleChange
            .bind(this);
    };

    handleChange = event => {
        this
            .search
            .setState({
                [event.target.name]: event.target.value
            });

        console.log(this.search);
    };

    loadEvents = () => {
        searchEvents()
            .then(res => this.setState({result: res.data.events.event}))
            .catch(err => console.log(err));
    };

    searchEvents = query => {

        Meteor
            .call('geoJsonForIp', query, function (err, res) {
                // The method call sets the Session variable to the callback value
                if (err) {
                    Session.set('result', {error: err});
                } else {
                    Session.set('result', res);
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
                queryParam: join(Object.value(this.state.search))
            }
        };

        console.log(queryURL);

        event.preventDefault();
        this.loadEvents(queryURL);
    };

    render() {
        return (
            <Segment >
                <Container>
                    <Menu/>
                </Container>
                < Container >
                    <div className="four wide column">
                        <VerticalMenu/>
                    </div>
                    {this.state.result.length
                        ? (
                            <div className="12 wide column">
                                <EventList>
                                    {this
                                        .state
                                        .result
                                        .map(events => (
                                            <Event>
                                                <div className="image">
                                                    <img src={events.image.medium.url}/>
                                                </div>
                                                <div className="content">
                                                    <h3 className="header">{events.title}</h3>
                                                    <div className="meta">
                                                        <span className="date">{events.start_date}</span>
                                                        <span className="location">{events.city_name}, {events.region_name}</span>
                                                    </div>
                                                    <div className="description">
                                                        <p>{events.description}</p>
                                                    </div>
                                                    <div className="extra">
                                                        <a href={events.url} target="_blank">Additional Details</a>
                                                        <div className="ui label category">Pending</div>
                                                    </div>
                                                </div>
                                            </Event>
                                        ))}
                                </EventList>
                            </div>
                        )
                        : (
                            <div className="ui red message">There is no Events Available with this Criteria</div>
                        )}
                </Container >

            </Segment>

        )
    }
}