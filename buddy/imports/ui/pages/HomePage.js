import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
  Visibility,
} from 'semantic-ui-react'
import BackgroundImage from '../components/BackgroundImage';
import AccountsUIWrapper from '../AccountsUIWrapper.js';
import EventsPage from './EventsPage';
import {ProfilePageLayout} from './ProfilePage';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container>
    <BackgroundImage>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
    </BackgroundImage>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const logoStyle = {
 marginLeft: "10"
}
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>

        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                 <Menu.Item as='a' active ><Link to="/">Home</Link></Menu.Item>
                 <Menu.Item as='a' active ><Link to="/events">Events</Link></Menu.Item>
                 <Menu.Item as='a' active ><Link to="/profile">My Profile</Link></Menu.Item>

                 <Route path="/events" component={EventsPage} />
                 <Route exact path="/profile" component={ProfilePageLayout} />

                 <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    <AccountsUIWrapper />
                  </Button>
                  <Image style={logoStyle} avatar margin-left= ".5em" size='mini' src='/images/Categories/ab.png' />
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
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
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Buddy Up: Enrich your life and improve your health
            </Header>

            <Header as='h3' style={{ fontSize: '2em' }}>
              Our Mission
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            To make a cooperative arrangement whereby individuals are teamed up and assume responsibility for one another’s welfare
            </p>
            <p style={{ fontSize: '1.11em' }}>
            <p>
             MATCH
             </p>
              Find a buddy at the same level of interest.
            </p>
            <p style={{ fontSize: '1.11em' }}>
            <p>
             AVAILABILITY
             </p>
              A time search bar shows preferred days for every event.
            </p>
            <p style={{ fontSize: '1.11em' }}>
            <p>
             COMPATIBILITY
             </p>
              Check a buddy's Bio for compatibility.
            </p>
            <p style={{ fontSize: '1.11em' }}>
            <p>
             PROXIMITY
             </p>
             Use the distance search to find a buddy just blocks away.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='big' src='images/Categories/Buddies.jpg' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'  href='http://nndc.org/facts/?gclid=CjwKCAjwyMfZBRAXEiwA-R3gM4MiNh6nYfq3284W1_b6WtLiLLiKSbkC7uXmjsy29PghzdhYfSnteBoCO_QQAvD_BwE'>Check Statistics </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
        Can't find a buddy who is available Wednesday evenings to attend an event in your local park? Want to run with a buddy willing to wake up early in the morning?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        Any Buddy Up is dedicated to making it easy for people to interact with each other, primarily through recreational activities. We want to help people get together to bike, golf, sail, hike and more is a cinch.
        </p>
        {/* <Button as='a' size='large'>
          Sign Up
        </Button> */}
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Testimonials</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '1.5em' }}>
        <p> "The big question was, is she a comic con or a gamer girl? When she went for the giant "Rolling Stone Poster", I knew we were going to be best buddies!  ~Sepideh"</p>

        </Header>
        <Header as='h3' style={{ fontSize: '1.5em' }}>
        <p>"I was looking for this app -- 5 years ago. So glad to see it.  ~Briana"</p>
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        </p>

      </Container>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3'  style={{ fontSize: '2em', Position: 'center' }}>
         About Us :  AWESOME ALLIES IN ACTION
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        We wanted to create our own awesome buddy system – Growth Socializing style. So, ‘Any Buddy Up?!’ was born!
        </p>
      </Container>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Creative Software Developer & Inspired Chemist"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/Categories/sepideh.jpg' />
              <a href='https://www.linkedin.com/in/sepideh-falah-33949854/'>Sepideh</a> Dev Ops - UI/UX
            </p>
            <p style={{ fontSize: '1.33em' }}>I enjoy challenging myself to write maintainable code & deploy cutting-edge technologies.
            I believe that continuous improvement is better than delayed perfection.</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Skilled Developer with a passion for automation."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/Categories/briana.png' />
              <a href='https://www.linkedin.com/in/briana-oursler/'>Briana</a> Project Manager
            </p>
            <p style={{ fontSize: '1.33em' }}>I strive to find the best solution in the chaos, balancing priority and possibility.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Engineer, Scientist, Adventurer, Explorer, Do-er, Problem Solver."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/Categories/me4.jpg' />
              <a href='https://www.linkedin.com/in/miriam-armada-blumer-1500b416/'>Miriam</a> Dev Ops - UI/UX
            </p>
            <p style={{ fontSize: '1.33em' }}>The rest is a work in process with assertions and errors. But never ceasing to learn. "Those who remain stagnant shall die, only those who are able to change and transform with transcend".</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Consult not your fears but your hopes and your dreams."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/images/Categories/Kyle.jpg' />
              <a href='https://www.linkedin.com/in/kabrittan/'>Kyle</a> Cloud Developer
            </p>
            <p style={{ fontSize: '1.33em' }}>The University of Arizona Coding Boot Camp has been challenging, exhausting and exhilarating! Ultimately, it will also be the best thing that I have ever done for myself</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>

              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Contributors' />
              <List link inverted>
                <List.Item as='a'>Kyle</List.Item>
                <List.Item as='a'>Miriam</List.Item>
                <List.Item as='a'>Briana</List.Item>
                <List.Item as='a'>Sepideh</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Buddy Up!
              </Header>
              <p>
                Finding friends in an urban world...    PRICELESS!  ;-)
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>


)
export default HomepageLayout
