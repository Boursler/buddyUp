import { Mongo } from 'meteor/mongo';
 
import { Meteor } from 'meteor/meteor';

import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Profiles = new Mongo.Collection('profiles');

const Schemas = {};

Schemas.Profile = new SimpleSchema({
	firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    // birthday: {
    //     type: Date,
    //     optional: true
    // },
    // gender: {
    //     type: String,
    //     allowedValues: ['Male', 'Female'],
    //     optional: true
    // },
   
    bio: {
        type: String,
        optional: true
	} 
	// its own schema?
	// categories: {
	// 	type: Array,
	// 	optional: true
	// }
    
});

Profiles.attachSchema(Schemas.Profile);
// if (Meteor.isServer) {
//   // This code only runs on the server
//   // Only publish tasks that are public or belong to the current user
//   Meteor.publish('tasks', function tasksPublication() {
//     return Tasks.find({
//       $or: [
//         { private: { $ne: true } },
//         { owner: this.userId },
//       ],
//     });
//   });
// }

// Meteor.methods({
//   'tasks.insert'(text) {
//     check(text, String);

//     // Make sure the user is logged in before inserting a task
//     if (! this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }

//     Tasks.insert({
//       text,
//       createdAt: new Date(),
//       owner: this.userId,
//       username: Meteor.users.findOne(this.userId).username,
//     });
//   },
//   'tasks.remove'(taskId) {
//     check(taskId, String);

//     const task = Tasks.findOne(taskId);
//     if (task.private && task.owner !== this.userId) {
//       // If the task is private, make sure only the owner can delete it
//       throw new Meteor.Error('not-authorized');
//     }

//     Tasks.remove(taskId);
//   },
//   'tasks.setChecked'(taskId, setChecked) {
//     check(taskId, String);
//     check(setChecked, Boolean);

//     const task = Tasks.findOne(taskId);
//     if (task.private && task.owner !== this.userId) {
//       // If the task is private, make sure only the owner can check it off
//       throw new Meteor.Error('not-authorized');
//     }

//     Tasks.update(taskId, { $set: { checked: setChecked } });
//   },
//   'tasks.setPrivate'(taskId, setToPrivate) {
//     check(taskId, String);
//     check(setToPrivate, Boolean);

//     const task = Tasks.findOne(taskId);

//     // Make sure only the task owner can make a task private
//     if (task.owner !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }

//     Tasks.update(taskId, { $set: { private: setToPrivate } });
//   },
// });

