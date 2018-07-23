import PropTypes from "prop-types";
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Event} from "../components/Event";
import {EventList} from "../components/EventList"
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {
    Button,
    Card,
    Feed,
    Form,
    Divider,
    Grid,
    Container,
    Header,
    Icon,
    Image,
    Menu,
    Input,
    List,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Select,
    Label
} from "semantic-ui-react";
import {Meteor} from 'meteor/meteor'
import {Session} from 'meteor/session'
import {ProfilePageLayout} from './ProfilePage';
import HomePage from './HomePage';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

const HomepageHeading = ({mobile}) => (
    <Container text>
        <Header
            as='h1'
            content='Imagine-a-Company'
            inverted
            style={{
            fontSize: mobile
                ? '2em'
                : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile
                ? '1.5em'
                : '3em'
        }}/>
        <Header
            as='h2'
            content='Do whatever you want when you want to.'
            inverted
            style={{
            fontSize: mobile
                ? '1.5em'
                : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile
                ? '0.5em'
                : '1.5em'
        }}/>
        <Button primary size='huge'>
            Get Started
            <Icon name='right arrow'/>
        </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool
}

/* Heads up!
   * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
   * It can be more complicated, but you can create really flexible markup.
   */
class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({fixed: false})
    showFixedMenu = () => this.setState({fixed: true})

    render() {
        const {children} = this.props
        const {fixed} = this.state

        return (
            <Responsive {...Responsive.onlyComputer}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{
                        minHeight: 70,
                        padding: '1em 0em'
                    }}
                        vertical>
                        <Menu
                            fixed={fixed
                            ? 'top'
                            : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'>
                            <Container>

                            <Menu.Item as='a' active ><Link to="/home">Home</Link></Menu.Item>
                            <Menu.Item as='a' active ><Link to="/events">Events</Link></Menu.Item>
                            <Menu.Item as='a' active ><Link to="/profile">My Profile</Link></Menu.Item>

                            <Route path="/home" component={HomePage} />
                            <Route exact path="/profile" component={ProfilePageLayout} />

                            <Menu.Item position='right'>
                               <Image avatar size='mini' src='/images/Categories/ab.png' />
                            </Menu.Item>

                            </Container>
                        </Menu>
                        {/* <HomepageHeading /> */}
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node
}

class MobileContainer extends Component {
    state = {}

    handlePusherClick = () => {
        const {sidebarOpened} = this.state

        if (sidebarOpened)
            this.setState({sidebarOpened: false})
    }

    handleToggle = () => this.setState({
        sidebarOpened: !this.state.sidebarOpened
    })

    render() {
        const {children} = this.props
        const {sidebarOpened} = this.state

        return (
            <Responsive {...Responsive.onlyMobile}>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='uncover'
                        inverted
                        vertical
                        visible={sidebarOpened}>
                        <Menu.Item as='a' active>
                            Home
                        </Menu.Item>
                        <Menu.Item as='a'>Work</Menu.Item>
                        <Menu.Item as='a'>Company</Menu.Item>
                        <Menu.Item as='a'>Careers</Menu.Item>
                        <Menu.Item as='a'>Log in</Menu.Item>
                        <Menu.Item as='a'>Sign Up</Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher
                        dimmed={sidebarOpened}
                        onClick={this.handlePusherClick}
                        style={{
                        minHeight: '100vh'
                    }}>
                        <Segment
                            inverted
                            textAlign='center'
                            style={{
                            minHeight: 350,
                            padding: '1em 0em'
                        }}
                            vertical>
                            <Container>
                                <Menu inverted pointing secondary size='large'>
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name='sidebar'/>
                                    </Menu.Item>
                                </Menu>
                            </Container>
                            {/* <HomepageHeading mobile /> */}
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node
}

const ResponsiveContainer = ({children}) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node
}
// this is the code for the Event Page Render

const Events = new Mongo.Collection('eventfull');

export default class EventsPage extends TrackerReact(React.Component) {
    constructor() {
        super();

        this.state = {
            query: '',
            subscription: {
                events: Meteor.subscribe('apiCall')
            },
            results: [],
            search: '',
            categories: [],
            zipCode: '',
            distance: '',
            date: '',
            activeItem: ''
        };

        this.componentWillUnmount = this
            .componentWillUnmount
            .bind(this);
        this.toggleSubscription = this
            .toggleSubscription
            .bind(this);
        this.events = this
            .events
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleItemClick = this
            .handleItemClick
            .bind(this);
    }

    componentWillUnmount() {
        this
            .state
            .subscription
            .events
            .stop();
    };

    toggleSubscription = (publication, query) => {

        let subscription = Meteor
            .subscribe
            .bind(this);

        if (subscription.ready()) {
            subscription.stop()
        } else {
            this.setState({
                subscription: {
                    events: Meteor.subscribe('apiCall', queryURL)
                }
            });
        }
    };

    events() {
        return Events
            .find()
            .fetch()
            .reverse();
    }

    // this handles pulling the info from the side bar for API Call (input values)
    handleChange = event => {

        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    // this handles pulling the information from the Checkbox Group, requires
    // package npm i install package Checkbox and CheckboxGroup
    categoriesChanged = (value) => {
        this.setState({categories: value});
    };

    // this handles making an API call

    handleClick = event => {

        event.preventDefault();

        const tempC = this.state.categories;

        console.log(tempC);

        let categories = tempC.join();

        console.log('this are ' + categories);

        const queryURL = '&category=' + categories + '&q=' + this.state.search + '&location=' + this.state.zipCode + '&date=' + this.state.date + '&within=' + this.state.distance;

        console.log(queryURL);

        if (typeof queryURL === 'string') {

            this.toggleSubscription('apiCall', queryURL);
        } else {
            return
        }

    };

    // this handles the 2 tab render section for "All Events" and "My Events",
    // toggles between one tab and the other
    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {

        console.log(this.state);

        const {activeItem} = this.state.activeItem;
        return (
            <ResponsiveContainer>
                <Segment
                    style={{
                    padding: '3em 0em'
                }}
                    vertical>
                    <Grid container verticalAlign='middle'>
                        <Grid.Column width={4}>

                            <Form>

                                <Button
                                    attached='top'
                                    style={{
                                    padding: '.5em 3em',
                                    verticalAlign: 'center'
                                }}
                                    size='large'
                                    color='black'
                                    content='Search Events'
                                    onClick={this.handleClick}/>

                                <Form.Field
                                    placeholder='Search...'
                                    control='input'
                                    name='search'
                                    value={this.state.search}
                                    onChange={this.handleChange}/>
                                <Card>
                                    <Card.Content>

                                            <Card.Header>
                                                Categories</Card.Header>
                                            <Feed>
                                                <CheckboxGroup
                                                    style={{
                                                    margin: '.5em'
                                                }}
                                                    checkboxDepth={3}
                                                    name="categories"
                                                    value={this.state.categories}
                                                    onChange={this.categoriesChanged}>
                                                    <br/><span/>
                                                    <label><Checkbox value="animals"/>Pets</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="art"/>
                                                        Arts</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="books"/>Books & Literature</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="festivals_parades"/>Festivals</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="food"/>Food & Wine</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="fundraisers"/>Fundraising & Charity</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="holiday"/>Holidays</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="music"/>Concerts & Tour Dates</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="outdoors_recreation"/>Outdoors & Recreations</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="science"/>Science</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="single_social"/>Night life</label>
                                                    <br/><span/>
                                                    <label><Checkbox value="sports"/>Sports</label>
                                                </CheckboxGroup>
                                                </Feed>


                                    </Card.Content>
                                </Card>
                                <Form.Field
                                    placeholder='Zipcode...'
                                    control='input'
                                    name='zipCode'
                                    value={this.state.zipCode}
                                    onChange={this.handleChange}/>
                                <Form.Field>
                                    <select
                                        name='distance'
                                        placeholder='Distance'
                                        value={this.state.value}
                                        onChange={this.handleChange}>
                                        <option value=" ">Distance</option>
                                        <option value="5">5 Miles</option>
                                        <option value="10">10 Miles</option>
                                        <option value="25">25 Miles</option>
                                        <option value="50">50 Miles</option>
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <select
                                        name='date'
                                        placeholder='When'
                                        value={this.state.value}
                                        onChange={this.handleChange}>
                                        <option value="">When?</option>
                                        <option value="today">Today</option>
                                        <option value="this week">This Week</option>
                                        <option value="next week">Next Week</option>
                                        <option value="all">All</option>
                                    </select>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Menu pointing secondary>
                                <Menu.Item
                                    name='Events'
                                    active={activeItem === 'Events'}
                                    onClick={this.handleItemClick}/>
                                <EventList>
                                    {this
                                        .events()
                                        .map((event) => {
                                            return <Event key={event.eventfulID} title={event.title}/>
                                        })}
                                </EventList>
                                <Menu.Item
                                    name='My Saved Events'
                                    active={activeItem === 'My Saved Events'}
                                    onClick={this.handleItemClick}/>
                            </Menu>
                            <Segment></Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </ResponsiveContainer>
        );
    }
};
