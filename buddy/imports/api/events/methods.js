
import {Meteor} from 'meteor/meteor';
import {Events} from './events.js';
import {check} from 'meteor/check';
import {SimpleSchema} from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
//methods check that there is a user context before making any changes to the database. This is one of Meteor's ways of doing security. They keys for validated method are: name, validate, run.
export const addEvent = new ValidatedMethod({
	//starting to suspect this should be an upsert: we want to insert once and then update buddies after
	name: 'events.upsertEvent',
validate(event) {
	console.log("Event: "  + JSON.stringify(event));
		check(event, {
			eventfulID: Match.OneOf(String, undefined),
			postalCode: Match.Optional(Match.OneOf(SimpleSchema.Integer, undefined)),
			title: Match.Optional(Match.OneOf(String, undefined)),
			url: Match.Optional(Match.OneOf(Boolean, undefined)),
			date: Match.Optional(Match.OneOf(Date, undefined)),
			address: Match.Optional(Match.OneOf(String, undefined)),
			category: Match.Optional(Match.OneOf(String, undefined)),
		});
	},
applyOptions: {
		returnStubValue: true,
	},
run(event){
	console.log("I am here with input " + JSON.stringify(event));
	// Make sure the user is logged in before inserting a profile
if (!this.userId) {
	console.log("NOT AUTHORIZED!!! :(");
  throw new Meteor.Error('not-authorized');
}
let callback = this.callback;
	if (typeof(callback) !== 'function'){
		callback = (err, res) => {
			if(err){
				console.log("Failed to upsert" + err);
				throw new Meteor.Error('upsert-failed');
			}
			else {
				console.log("inserted" + res);
			}
		}
	}

Events.update({eventfulID: event.eventfulID}, {$set: event},{upsert: true}, callback);

const eventsLink = Events.getLink(eventfulID, 'profiles');
eventsLink.add({userID: this.userId});

	}
});





Meteor.methods({
    'geoJsonForIp': function (query) {
      // avoid blocking other method calls from the same client
      this.unblock();
      var apiUrl = 'http://api.eventful.com/json/events/search?...&app_key=Pn3g5RvNgRnxzTxp&include=categories' + query;
      // asynchronous call to the dedicated API calling function
      var response = Meteor.wrapAsync(apiCall)(apiUrl);
      return response;
    }
  });
