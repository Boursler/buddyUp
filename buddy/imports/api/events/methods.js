import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http'
import {Events} from './events.js';
import {check} from 'meteor/check';
import {SimpleSchema} from 'simpl-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
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

var apiCall = function (apiUrl, callback) {
    // try…catch allows you to handle errors
    try {
        var response = HTTP
            .get(apiUrl)
            .data;
        // A successful API call returns no error but the contents from the JSON
        // response
        callback(null, response);
    } catch (error) {
        // If the API responded with an error message and a payload
        if (error.response) {
            var errorCode = error.response.data.code;
            var errorMessage = error.response.data.message;
            // Otherwise use a generic error message
        } else {
            var errorCode = 500;
            var errorMessage = 'Cannot access the API';
        }
        // Create an Error object and return it via callback
        var myError = new Meteor.Error(errorCode, errorMessage);
        callback(myError, null);
    }
}

Meteor.methods({
    'eventfulAPI': function (query) {

        console.log(query + 'method called')
        // avoid blocking other method calls from the same client
        this.unblock();
        var apiUrl = 'http://api.eventful.com/json/events/search?...&ex_category=attractions,comedy,co' +
                'mmunity,family_fun_kids,movies_film,performing_arts,schools_alumni,support,techn' +
                'ology&app_key=Pn3g5RvNgRnxzTxp' + query;

        // asynchronous call to the dedicated API calling function
        var response = Meteor.wrapAsync(apiCall)(apiUrl);

        console.log(response);
        return response;
    }
});
