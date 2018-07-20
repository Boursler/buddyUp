import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'
import {Events} from './events.js';
import {check} from 'meteor/check';
import {SimpleSchema} from 'simpl-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
//import { constants } from 'http2';
// methods check that there is a user context before making any changes to the
// database. This is one of Meteor's ways of doing security. They keys for
// validated method are: name, validate, run.
export const addEvent = new ValidatedMethod({
    // starting to suspect this should be an upsert: we want to insert once and then
    // update buddies after
    name: 'events.addEvent',
    validate(event) {
        console.log("Event: " + JSON.stringify(event));
        check(event, {
            eventfulID: Match.OneOf(String, undefined),
            postalCode: Match.Optional(Match.OneOf(SimpleSchema.Integer, undefined)),
            title: Match.Optional(Match.OneOf(String, undefined)),
            url: Match.Optional(Match.OneOf(Boolean, undefined)),
            date: Match.Optional(Match.OneOf(Date, undefined)),
            address: Match.Optional(Match.OneOf(String, undefined)),
            category: Match.Optional(Match.OneOf(String, undefined))
        });
    },
    applyOptions: {
        returnStubValue: true
    },
    run(event) {
        console.log("I am here with input " + JSON.stringify(event));
        // Make sure the user is logged in before inserting a profile
        if (!this.userId) {
            console.log("NOT AUTHORIZED!!! :(");
            throw new Meteor.Error('not-authorized');
        }

        Events.update({
            eventfulID: event.eventfulID
        }, {
            $set: event
        }, {
            upsert: true
        }, (error, result) => {
            if (error) {
                console.log("Failed to insert" + error);
                throw new Meteor.Error('insert-failed');
            } else {
                // success
                console.log("Success??");
                console.log("inserted" + result);
            }
        })
    }
});

export const newEvents = new ValidatedMethod({

	name: 'events.apicall',
	validate(queryUrl) {
		console.log("queryUrl: "  + queryUrl);
			check(queryUrl, String);
	},
	applyOptions: {
		returnStubValue: true,
	},
			
	run(queryUrl){
		console.log("I am here with queryURL " + queryUrl);

        
        const apiCall = (apiUrl, callback) => {

            console.log('we are here yay')
            // try…catch allows you to handle errors
            try {
                const response = HTTP
                    .get(apiUrl)
                    .data;
                // A successful API call returns no error but the contents from the JSON
                // response
                callback(null, response);
            } catch (error) {
                // If the API responded with an error message and a payload
                if (error.response) {
                    const errorCode = error.response.data.code;
                    const errorMessage = error.response.data.message;
                    // Otherwise use a generic error message
                } else {
                    const errorCode = 500;
                    const errorMessage = 'Cannot access the API';
                }
                // Create an Error object and return it via callback
                const myError = new Meteor.Error(errorCode, errorMessage);
                callback(myError, null);
            }
        };
        // avoid blocking other method calls from the same client
        this.unblock();
        const apiUrl = 'http://api.eventful.com/json/events/search?...&ex_category=attractions,comedy,co' +
                'mmunity,family_fun_kids,movies_film,performing_arts,schools_alumni,support,techn' +
                'ology&app_key=Pn3g5RvNgRnxzTxp' + queryUrl;

        console.log(apiUrl);
        // asynchronous call to the dedicated API calling function
        const response = Meteor.wrapAsync(apiCall,apiUrl);

        console.log(response);
        return response;

        
	
	}});





   


