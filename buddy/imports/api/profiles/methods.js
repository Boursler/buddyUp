import {Meteor} from 'meteor/meteor';
import {Profiles} from './profiles.js';
import {Collection2} from 'meteor/aldeed:collection2'
import {check} from 'meteor/check';
import {SimpleSchema} from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
//methods check that there is a user context before making any changes to the database. This is one of Meteor's ways of doing security. They keys for validated method are: name, validate, run.
export const addProfile = new ValidatedMethod({
	name: 'profiles.addProfile',
	validate(profile) {
		console.log("Profile: "  + JSON.stringify(profile));
			check(profile, {
				firstName: Match.Optional(Match.OneOf(String, undefined)),
				lastName: Match.Optional(Match.OneOf(String, undefined)),
				bio: Match.Optional(Match.OneOf(String, undefined)),
				sports: Match.Optional(Match.OneOf(Boolean, undefined)),
				books: Match.Optional(Match.OneOf(Boolean, undefined)),
				food: Match.Optional(Match.OneOf(Boolean, undefined)),
				science: Match.Optional(Match.OneOf(Boolean, undefined)),
				music: Match.Optional(Match.OneOf(Boolean, undefined)),
				outdoors_recreation: Match.Optional(Match.OneOf(Boolean, undefined)),
				animals: Match.Optional(Match.OneOf(Boolean, undefined)),
				festivals_parades: Match.Optional(Match.OneOf(Boolean, undefined)),
				singles_social: Match.Optional(Match.OneOf(Boolean, undefined)),
				fundraisers: Match.Optional(Match.OneOf(Boolean, undefined)),
				holiday: Match.Optional(Match.OneOf(Boolean, undefined)),
				art: Match.Optional(Match.OneOf(Boolean, undefined)),
			});
		},
	applyOptions: {
			returnStubValue: true,
		},
	run(profile){
		console.log("I am here with input " + JSON.stringify(profile));
		console.log("User id is " + this.userId);
		// Make sure the user is logged in before inserting a profile
    if (!this.userId) {
		console.log("NOT AUTHORIZED!!! :(");
      throw new Meteor.Error('not-authorized');
	}

	profile["userId"] = this.userId;
	let callback = this.callback;
	if (typeof(callback) !== 'function'){
		callback = (err, res) => {
			if(err){
				console.log("Failed to insert" + err);
				throw new Meteor.Error('insert-failed');
			}
			else {
				console.log("inserted" + res);
			}
		}
	}
	Profiles.insert(profile, callback);

		}
	});

export const removeProfile = new ValidatedMethod({
	name: 'profiles.removeProfile',
	validate(_id){
		check(_id,{
			_id: String
		});
	},
	applyOptions: {
		returnStubValue: true
	},
	run(_id){
		if (!this.userId) {
      throw new Meteor.Error('not-authorized');
		}
		Profiles.remove(_id);
	}
 });

 export const updateProfile = new ValidatedMethod({
	name: 'profiles.updateProfile',
	validate(profile) {
		console.log("Profile: "  + JSON.stringify(profile));
			check(profile, {
				firstName: Match.Optional(Match.OneOf(String, undefined)),
				lastName: Match.Optional(Match.OneOf(String, undefined)),
				bio: Match.Optional(Match.OneOf(String, undefined)),
				sports: Match.Optional(Match.OneOf(Boolean, undefined)),
				books: Match.Optional(Match.OneOf(Boolean, undefined)),
				food: Match.Optional(Match.OneOf(Boolean, undefined)),
				science: Match.Optional(Match.OneOf(Boolean, undefined)),
				music: Match.Optional(Match.OneOf(Boolean, undefined)),
				outdoors_recreation: Match.Optional(Match.OneOf(Boolean, undefined)),
				animals: Match.Optional(Match.OneOf(Boolean, undefined)),
				festivals_parades: Match.Optional(Match.OneOf(Boolean, undefined)),
				singles_social: Match.Optional(Match.OneOf(Boolean, undefined)),
				fundraisers: Match.Optional(Match.OneOf(Boolean, undefined)),
				holiday: Match.Optional(Match.OneOf(Boolean, undefined)),
				art: Match.Optional(Match.OneOf(Boolean, undefined)),
			});
		},
	applyOptions: {
			returnStubValue: true,
		},
	run(profile){
	// Make sure the user is logged in before upserting a profile
    if (!this.userId) {
		console.log("NOT AUTHORIZED!!! :(");
      throw new Meteor.Error('not-authorized');
	}

	profile["userId"] = this.userId;
	let callback = this.callback;
	if (typeof(callback) !== 'function'){
		callback = (err, res) => {
			if(err){
				console.log("Failed to insert" + err);
				throw new Meteor.Error('insert-failed');
			}
			else {
				console.log("inserted" + res);
			}
		}
	}

	Profiles.update({userId: this.userId}, profile, {upsert: true}, callback);

		}
	});


