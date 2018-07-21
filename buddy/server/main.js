import { Meteor } from 'meteor/meteor';
//import server startup code
import '/imports/startup/server';
import '../imports/api/events/server/eventAPI'

Meteor.startup(() => {
  // code to run on server at startup
});
