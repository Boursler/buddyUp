import { Meteor } from 'meteor/meteor';
//import server startup code
import '/imports/startup/server';
import '../imports/api/events/server/eventAPI'

import '../imports/api/profiles/server/publications.js'
Meteor.startup(() => {
  // code to run on server at startup
});
