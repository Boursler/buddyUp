import PropTypes from 'prop-types'
import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Component } from 'react';
import Toggle from 'react-toggle'
import {render} from 'react-dom';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { addProfile } from '../../api/profiles/methods';


class AboutMe extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      bio: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleEdit.bind(this);
  }

  handleClick(type) {
    // make request to server
    setTimeout(() => {
      this.setState({
        [type]: !this.state[type]
      })
    }, 1000)
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  }

  handleEdit(event){
    const data = {

      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bio: this.state.bio,
      sports: this.state.sports,
      books: this.state.books,
      food: this.state.food,
      art: this.state.art,
      outdoors_recreation: this.state.outdoors_recreation,
      science: this.state.science,
      animals: this.state.animals,
      music: this.state.music,
      holiday: this.state.holiday,
      fundraisers: this.state.fundraisers,
      festivals_parades: this.state.festivals_parades,
      singles_social: this.state.singles_social

    }
    console.log(JSON.stringify(data) + "just defined data");
    updateProfile.call(
      data, (err, res) => {
        if (err) {
          console.log("WHY!????!???!?!?!?!?");
          console.log(err);
        }
        console.log(res);
        browserHistory.push('/dashboard');
      }
    );
  }

  render(){
    return(
      <toggle>
        <div className="ui segment success">
          <form className="ui form" >
            <h4 className="ui dividing header">Personal Information</h4>

            <div className="field">
              <label>Name</label>
              <div className="two fields">
                <div className="field">
                  <h1>{this.state.firstName}</h1>
                </div>
                <div className="field">
                  <h2>{this.state.lastName}</h2>
                </div>
              </div>
            </div>

            <div className="field">
                  <label>Bio</label>
                  <h3>{}</h3>
            </div>

            <div className="ui button" tabIndex="0" onClick={this.handleEdit}>Edit</div>
          </form>

        </div>
      </toggle>
    )
  }
}

export default AboutMe;

